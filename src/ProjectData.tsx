import ProjectData, {ImageData} from "./interfaces/ProjectData";

const projectList = require('./projectList.json');

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
        images: contents.map(({ header, description, src }) => ({ title: header, description, path: "/"+path + "/" + src } as ImageData))
    }
}

console.log(projectList)

var projects: ProjectData[] = projectList.map(({ path, old }: any) => old
    ? convertToNew(require(path + "/content.json"), path)
    : require(path + "/projectView.json"));

console.log(projects)

export default projects;