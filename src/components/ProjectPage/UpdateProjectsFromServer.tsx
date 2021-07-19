import React, { useEffect } from 'react';
import {  useProjectsContext } from './ProjectsContext';
import projectListJson  from  '../../projectList.json';
import ProjectData from '../../interfaces/ProjectData';

const projectList = projectListJson as { path: string, old?: boolean }[];

export function UpdateProjectsFromServer() {
    const projectContext = useProjectsContext();

    useEffect(() => {
        projectList.filter(p => !p.old).map(
            async ({ path, old }: any) => {
                var response = await fetch("/" +path + "/projectView.json");
                var json = await response.json() as ProjectData;
                if(!projectContext.projects.some(p=>p.name == json.name))
                    projectContext.addProjects([json]);
            }
        );
    }, []);


   return null;

    
}




