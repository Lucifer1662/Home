import React from 'react';
import { FilterButtons } from './FilterButtons';
import { ProjectsContextProvider } from './ProjectsContext';
import ProjectGrid from './ProjectGrid';
import { UpdateProjectsFromServer } from './UpdateProjectsFromServer';


export default function ProjectPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width:'100%' }} >
            <ProjectsContextProvider>
                <UpdateProjectsFromServer/>
                <FilterButtons />
                <br />
                 <ProjectGrid/>
            </ProjectsContextProvider>
        </div>
    );
}




