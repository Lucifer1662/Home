import React, { useEffect, useRef, useState } from 'react';
import ProjectData from '../../interfaces/ProjectData';
import Project from '../../Project';
import { GridList, GridListTile } from '@material-ui/core';
import DefaultProject from '../../DefaultProject'
import CollapseOnEnter from '../../CollapseOnEnter';
import { useProjects } from '../../ProjectData';
import useWindowSize from './../../useWindowSize';
import { FilterButtons } from './FilterButtons';


function AddProjectPage({ project }: { project: ProjectData }) {
    const myRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => { myRef?.current?.scrollIntoView() }, [myRef]);
    return <div
        ref={myRef}
        style={{ marginTop: 10, marginBottom: 10 }}> <CollapseOnEnter> <DefaultProject project={project} /> </CollapseOnEnter>
    </div>
}


function AddProjectPageBelow(project: ProjectData[], index: number, cols: number, selected: number) {
    if (index % cols == 0 && index <= selected && selected < index + cols) {
        return <div style={{ height: undefined, width: "100%" }}><AddProjectPage project={project[selected]} /></div>;
    }
    return [];
}







export default function ProjectPage() {

    const [selectedProject, setSelectedProject] = useState<undefined | number>(undefined);
    const projects = useProjects();
    const size = useWindowSize();

    const aspect = size ? size.width / size.height : 1;

    const cols = Math.max(1, Math.floor(3 * aspect));

    const cellHeight = size ? size.width / cols : 300;

    var tiles: any[] = []
    {
        projects.forEach((project, index) => {

            if (selectedProject != undefined) {
                const projectPages = AddProjectPageBelow(projects, index, cols, selectedProject);
                tiles.push(projectPages);
            }
            // if(index != selectedProject)
            tiles.push(<GridListTile key={project.name + "grid"} cols={1}>
                <Project key={project.name + "project"} data={project} onClick={() => {
                    if (selectedProject == index)
                        setSelectedProject(undefined);
                    else
                        setSelectedProject(index);
                }} />
            </GridListTile>)

        })
    }

    return (
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center' }} >
            <FilterButtons/>
            <br/>
            <GridList

                cellHeight={cellHeight} cols={cols}
                style={{ justifyContent: 'center', width: "90%", overflow: 'unset' }}
            >
                {tiles}
            </GridList>
        </div>
    );
}




