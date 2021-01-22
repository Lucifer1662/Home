import { useEffect, useState } from "react";
import ProjectData, { ImageData } from "./interfaces/ProjectData";

const projectList = require('./projectList.json') as { path: string, old?: boolean }[];


const pathSuffix = "./"

interface oldContent {
    src?: string,
    header?: string,
    description?: string,
}

interface oldProject {
    name: string,
    description: string,
    contents: oldContent[],
    languages?: string[],
    gitHubLink?: string
}

function convertToNew({ name, description, gitHubLink, contents, languages }: oldProject, path: string): ProjectData {
    return {
        name, description,
        images: contents.map(({ header, description, src }) => ({ title: header, description, path: "/" + path + "/" + src } as ImageData))
    }
}



export function useProjects() {
    const [projects, setProjects] = useState<ProjectData[]>([]);

    useEffect(() => {

        
       

        projectList.filter(p => p.old).map(
            async ({ path, old }: any) => {
                var response = await fetch("/" +path + "/content.json");
                var json = convertToNew(await response.json(), path);
                setProjects((prev) => [...prev, json])
            }
        );

        projectList.filter(p => !p.old).map(
            async ({ path, old }: any) => {
                var response = await fetch("/" +path + "/projectView.json");
                var json = await response.json();
                setProjects((prev) => [...prev, json])
            }
        );


    }, []);

    return projects;

}