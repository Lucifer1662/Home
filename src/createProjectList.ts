import * as fs from 'fs';


function createProjectList(folderName: string) {
    const getDirectories = (source:string) =>
        fs.readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)

    var folders = getDirectories(folderName);

    return folders;
}

var oldProjects = createProjectList("src/projects");
var newProjects = createProjectList("src/projectData");

newProjects = newProjects.filter( project=>!oldProjects.includes(project) );

var projectList : {path:string, old?:boolean}[]= [];

projectList = projectList.concat(oldProjects.map(project => ({path: "./projects/"+project, old:true })));

projectList = projectList.concat(
    newProjects.map(project => ({path: "./projectData/"+project }))
   );

console.log(projectList)

fs.writeFile("./src/projectList.json", JSON.stringify(projectList), () => { })