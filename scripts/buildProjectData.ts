import ProjectData from '../src/interfaces/ProjectData';
const fetch = require("node-fetch");

import { promises as fs } from 'fs'
import fsExtra from 'fs-extra'
import { getDirectories } from './getDirectories';





function createProjectData(origin: string, destination: string) {
    fsExtra.mkdirSync(destination, { recursive: true })
    fsExtra.copySync(origin, destination, { recursive: true })
}


async function changePaths(path: string, changePath: (path: string, folderName: string) => string) {
    const directories = getDirectories(path);

    await Promise.all(directories.map(async (projectDirectory) => {
        const file = await fs.open(path + projectDirectory + "/projectView.json", "r+");
        const jsonStr = await file.readFile();

        const json = JSON.parse(jsonStr.toString()) as ProjectData;
        json.images = json.images.map(image => ({ ...image, path: changePath(image.path, projectDirectory) }));
        if (json.pdf)
            json.pdf = changePath(json.pdf, projectDirectory);
        await file.truncate();
        await file.write(JSON.stringify(json), 0);
    }))
}

async function makePathsAbsolute(path: string, prefix: string) {
    changePaths(path, (s,name) => prefix +name+"/"+ s);
}

async function makePathsRelative(path: string) {
    const getFileName = (s: string) => {
        const end = s.lastIndexOf("/");
        return s.substring(end + 1);
    }
    changePaths(path, getFileName);
}


async function buildProjectData({ username }: any) {

    const destination = "./public/projectData/";
    await fs.rmdir(destination, {recursive: true});
    await createProjectData("./projectData/", destination);
    //await makePathsRelative("./projectDataNew/");
    await makePathsAbsolute(destination, "/projectData/");
}


async function run() {
    var projects = await buildProjectData({ username: "Lucifer1662" });
    require("./createProjectList")
}

run();
