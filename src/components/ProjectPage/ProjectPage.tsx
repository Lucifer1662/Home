import React, { useState } from 'react';
import ProjectData from '../../interfaces/ProjectData';
import Project from '../../Project';
import { GridList, GridListTile } from '@material-ui/core';
import DefaultProject from '../../DefaultProject'

import scrollToComponent from '../../scrollToComponentTop';
import CollapseOnEnter from '../../CollapseOnEnter';
import projects from '../../ProjectData';


function AddProjectPageBelow(project: ProjectData[], index: number, cols: number, selected: number) {
    console.log(index)
    if (index % cols == 0 && index <= selected && selected < index + cols) {
        console.log({ index })
        return <div style={{ height: undefined, width: "100%" }}>{addProjectPage(project[selected])}</div>;
    }
    return [];
}


function addProjectPage(project: ProjectData) {

    return <div
        ref={scrollToComponent(10)}
        style={{ marginTop: 10, marginBottom: 10 }}> <CollapseOnEnter> <DefaultProject project={project} /> </CollapseOnEnter></div>
}




export default function ProjectPage() {

    const [selectedProject, setSelectedProject] = useState<undefined | number>(undefined);



    const cols = 3;

    var tiles: any[] = []
    {
        projects.forEach((project, index) => {

            if (selectedProject != undefined) {
                const projectPages = AddProjectPageBelow(projects, index, cols, selectedProject);
                tiles.push(projectPages);
            }
            // if(index != selectedProject)
            tiles.push(<GridListTile cols={1}>
                <Project data={project} onClick={() => {
                    if (selectedProject == index)
                        setSelectedProject(undefined);
                    else
                        setSelectedProject(index);
                }} />
            </GridListTile>)

        })
    }

    return (<div style={{
        marginLeft: "30%", marginRight: "30%",
        width: "90%"
    }}>
        <GridList cellHeight={300} cols={cols} >
            {tiles}
        </GridList>
    </div>
    );
}




