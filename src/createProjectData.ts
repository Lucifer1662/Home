import { Octokit } from '@octokit/rest'
import ProjectData, { Widget, WidgetData, WidgetType } from './interfaces/ProjectData';
import { ReposGetContentResponseData } from '@octokit/types';
import TextWidget from './interfaces/Widgets/TitleWidget';
import ImageWidget from './interfaces/Widgets/ImageWidget';
import StackPanelWidget from './interfaces/Widgets/StackPanelWidget';
import RootWidget from './interfaces/Widgets/RootWidget';
import {gitHubToken} from '../githubtoken.json'

const fs = require('fs');
const fetch = require("node-fetch");

interface GitHubRepo {
    name: string,
    description: string,
    html_url: string,
    created_at: string,
    updated_at: string,

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

function extractStackPanel(data: any, keys?: string[]) {
    var children = keys && keys.includes("children") ? data.children : data;
    var childrenKeys = Object.keys(children);


    return {
        //@ts-ignore
        children: childrenKeys.map(key => (convertToWidget(key, children[key])))
    }
}

function extractRoot(data: any, keys?: string[]) {
    console.log({ data, keys })
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
    "StackPanel": extractStackPanel,
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
    console.log(widget)
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
    console.log(fileName);
    var slashIndex = fileName.lastIndexOf('/');
    if (slashIndex !== -1) {
        var pathName = fileName.slice(0, slashIndex);
        console.log(pathName)
        await fs.mkdir(pathName, { recursive: true }, (err: any) => {
            if (err) throw err;
        });
    }
    await fs.writeFile(fileName, buffer, () =>
        console.log('finished downloading!'));
}

async function downloadImages(images: string[], octokit: Octokit, owner: string, repo: string) {
    var promises = images.map(async image => {
        var response = await octokit.repos.getContent({
            owner,
            path: image,
            repo
        });

        await download(response.data.download_url, "./projectData/" + repo + "/" + image);
    })

    await Promise.all(promises);
}

async function createProjectData({ username }: any) {
    const octokit = new Octokit({ auth:gitHubToken  });




    try {
        var responseRepos = await octokit.repos.listForUser({
            username: username,

        });


    } catch (e) {
        console.log(e)
        return []
    }

    let repos: GitHubRepo[] = responseRepos.data;

    let progressBool = repos.map(() => false);


    let projects: ProjectData[] = repos.map(repo => ({
        name: repo.name,
        description: repo.description,
        images: [],
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

                if (projectView && projectView.template) {

                    projectView.template = convertToWidget(WidgetType.Root, projectView.template);
                    var images = resolveNames(projectView.name, projectView.template);
                    console.log({ images })
                    await downloadImages(images, octokit, username, project.name);

                }
            }

        } catch (e) {
            console.log(e)
        }
    })

    await Promise.all(promises);


    return projects;
}


async function run() {
    var projects = await createProjectData({ username: "Lucifer1662" });
    //console.log({ projects })
}

run();
// let template = {
//     "StackPanel": {
//         "Title": "Mandel Brot Fractal",
//         "Description": "Renders the Mandelbrot Fractal",
//         "Image": "img1.png"
//     }
// }


// var d = convertToWidget(WidgetType.Root, template);

// console.log(d)
