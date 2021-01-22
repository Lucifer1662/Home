import * as fs from 'fs';
import excludeList from './excludeList';
import {getDirectories} from './getDirectories';


function createProjectList(folderName: string) {
    var folders = getDirectories(folderName);

    return removeExcludedProjects(folders);
}



var oldProjects = [] as string[];// createProjectList("public/projects");
var newProjects = createProjectList("public/projectData");

newProjects = newProjects.filter( project=>!oldProjects.includes(project) );

var projectList : {path:string, old?:boolean}[]= [];

projectList = projectList.concat(oldProjects.map(project => ({path: "./projects/"+project, old:true })));

projectList = projectList.concat(
    newProjects.map(project => ({path: "./projectData/"+project }))
   );



console.log(projectList)

fs.writeFile("./src/projectList.json", JSON.stringify(projectList), () => { })

function removeExcludedProjects(projects: string[]){
    return projects.filter((project)=>(excludeList.find((p)=>p===project) === undefined))
}