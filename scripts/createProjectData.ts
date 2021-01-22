import { Octokit } from '@octokit/rest'
import ProjectData, { Widget, WidgetData, WidgetType } from '../src/interfaces/ProjectData';
import { ReposGetContentResponseData } from '@octokit/types';
import TextWidget from '../src/interfaces/Widgets/TextWidget';
import ImageWidget from '../src/interfaces/Widgets/ImageWidget';
import FlexPanelWidget from '../src/interfaces/Widgets/FlexPanelWidget';
import RootWidget from '../src/interfaces/Widgets/RootWidget';
import { gitHubToken } from '../githubtoken.json'
import excludeList from './excludeList'

const fs = require('fs');
const fetch = require("node-fetch");

interface GitHubRepo {
    name: string,
    description: string,
    html_url: string,
    created_at: string,
    updated_at: string,
    has_pages: boolean

}

function extractTitle(data: any, keys?: string[]) {
    return {
        text: keys && keys.includes("text") ? data.text : data,
        variants: "h1",
    }
}

function extractDescripition(data: any, keys?: string[]) {
    return {
        text: keys && keys.includes("text") ? data.text : data,
        variants: "p",
    }
}

function extractImage(data: any, keys?: string[]) {
    return {
        path: keys && keys.includes("path") ? data.path : data,
    }
}

function extractFlexPanel(data: any, keys?: string[]) {
    var children = keys && keys.includes("children") ? data.children : data;
    var childrenKeys = Object.keys(children);


    return {
        //@ts-ignore
        children: childrenKeys.map(key => (convertToWidget(key, children[key])))
    }
}

function extractRoot(data: any, keys?: string[]) {
    var children = keys && keys.includes("children") ? data.children : data;
    var childrenKeys = Object.keys(children);

    if (keys && keys.length > 0)
        return {
            //@ts-ignore
            children: childrenKeys.map(key => (convertToWidget(key, children[key])))
        }
    else
        return { children: [] } as RootWidget
}


let converters: { [characterName: string]: (data: any, keys?: string[]) => WidgetData } = {
    "Title": extractTitle,
    "Description": extractDescripition,
    "Image": extractImage,
    "FlexPanel": extractFlexPanel,
    "StackPanel": extractFlexPanel,
    "Root": extractRoot

}

function convertToWidget(type: WidgetType, data: any): Widget {
    var keys;
    if (typeof data === "object") {
        keys = Object.keys(data);
    }

    var widgetData = converters[type](data, keys);
    return { type, data: widgetData };
}

function resolveNames(projectName: string, widget?: Widget): string[] {
    if (widget === undefined)
        return [] as string[]

    var images: string[] = []
    if (widget.type === "Image") {
        var data = widget.data as ImageWidget
        images.push(data.path);
        data.path = projectName + '/' + data.path;

    }

    var newImages: string[] = []
    //@ts-ignore
    if (widget && widget.data && widget.data.children) {
        var dataChild = widget.data as { children: Widget[] };
        dataChild.children.forEach((child: Widget) => {
            newImages = newImages.concat(resolveNames(projectName, child));
        });
    }


    return images.concat(newImages);
}

async function download(url: string, fileName: string) {
    const response = await fetch(url);
    const buffer = await response.buffer();
    var slashIndex = fileName.lastIndexOf('/');
    if (slashIndex !== -1) {
        var pathName = fileName.slice(0, slashIndex);
        await fs.mkdir(pathName, { recursive: true }, (err: any) => {
            if (err) throw err;
            fs.writeFile(fileName, buffer, () =>
                console.log('finished downloading!'));
        });
    } else {
        fs.writeFile(fileName, buffer, () =>
            console.log('finished downloading!'));
    }

}

async function downloadFile(file: string, octokit: Octokit, owner: string, repo: string, name: string) {
        var response = await octokit.repos.getContent({
            owner,
            path: file,
            repo
        });

        await download(response.data.download_url, "./public/projectData/" + name + "/" + file);
}

async function downloadImages(images: string[], octokit: Octokit, owner: string, repo: string, name: string) {
    var promises = images.map(async image => {
        var response = await octokit.repos.getContent({
            owner,
            path: image,
            repo
        });

        await download(response.data.download_url, "./public/projectData/" + name + "/" + image);
    })

    await Promise.all(promises);
}

async function createProjectData({ username }: any) {
    const octokit = new Octokit({ auth: gitHubToken });




    try {
        var repos: GitHubRepo[] = [];
        for(var i = 0; ;i++){
            var responseRepos = await octokit.repos.listForUser({
                username: username,
                page: i

            });
            console.log()
            //@ts-ignore
            console.log(responseRepos.data.map(r=>r.name))
            repos = repos.concat(responseRepos.data);
            
            if(responseRepos.data.length == 0)
                break;
        }

    } catch (e) {
        console.log(e)
        return []
    }


    repos = repos.filter((repo)=>excludeList.find((r)=>r==repo.name) === undefined)

    

    let projects: ProjectData[] = repos.map(repo => ({
        name: repo.name,
        description: repo.description,
        images: [],
        page: repo.has_pages?"https://lucifer1662.github.io/"+repo.name:undefined
    } as ProjectData));

    let promises = projects.map(async (project, index: number) => {
        try {
            let filesResponse = await octokit.repos.getContent({
                owner: username,
                repo: project.name,
                path: ''
            });

            //@ts-ignore
            let files: ReposGetContentResponseData[] = filesResponse.data;
            var projectViewFileProperties = files.find((file) => (file.name === "projectView.json"));

            if (projectViewFileProperties) {

                var response = await fetch(projectViewFileProperties.download_url);
                var projectView: ProjectData = await response.json();

                if(projectView.pdf !== undefined){
                    await downloadFile(projectView.pdf, octokit, username, project.name, projectView.name);
                    projectView.pdf = "/projectData/" + projectView.name + "/" + projectView.pdf;
                }

                
                if(projectView.images !== undefined){
                    await downloadImages(projectView.images.map(image=>image.path), octokit, username, project.name, projectView.name);
                    projectView.images = projectView.images.map((image)=>({...image, path: "/projectData/" + projectView.name + "/" + image.path}))
                }
                
                projects[index] = { ...projects[index], ...projectView }

                if (projectView && projectView.template) {

                    project.template = convertToWidget(WidgetType.Root, projectView.template);
                    var images = resolveNames(projectView.name, projectView.template);
                   
                    await downloadImages(images, octokit, username, project.name, projectView.name);

                }
            }

        } catch (e) {
            console.log(e)
        }
    })

    await Promise.all(promises);

    await Promise.all(projects.map(async (project) => {
        var fileName = "./public/projectData/" + project.name + "/projectView.json";
        console.log( project.name)
        var slashIndex = fileName.lastIndexOf('/');
        if (slashIndex !== -1) {
            var pathName = fileName.slice(0, slashIndex);
            fs.mkdir(pathName, { recursive: true }, () => {
                fs.writeFile(fileName, JSON.stringify(project), () => { })
            });
        } else {
            fs.writeFile(fileName, project, () => { })
        }

    }))



    return projects;
}


async function run() {
    var projects = await createProjectData({ username: "Lucifer1662" });
    //console.log({ projects })
}

run();
// let template = {
//     "FlexPanel": {
//         "Title": "Mandel Brot Fractal",
//         "Description": "Renders the Mandelbrot Fractal",
//         "Image": "img1.png"
//     }
// }


// var d = convertToWidget(WidgetType.Root, template);

// console.log(d)
