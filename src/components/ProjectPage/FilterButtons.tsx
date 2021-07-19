import React from 'react';
import { FilterButton } from './FilterButton';
import { useProjectsContext } from './ProjectsContext';
import { FilterButtonProjectLanguage } from './FilterButtonProjectLanguage';
import {FilterButtonProjectFramework} from './FilterButtonProjectFramework';
import { Typography } from '@material-ui/core';

interface Props {
    children?: any[],
    userId?: string
}

export function FilterButtons({ children, userId }: Props) {

    return <div style={{width:"100%"}}>
        <div style={{ marginLeft: '10%', marginRight:"10%", textAlign: 'left' }} >
            <Typography variant="h4" color="textPrimary" style={{display:"inline-block"}} >Filters</Typography>
            <FilterButtonProjectLanguage languages={["C++", "c++"]} >C++</FilterButtonProjectLanguage>
            <FilterButtonProjectLanguage languages={["C#", "c#"]} >C#</FilterButtonProjectLanguage>
            <FilterButtonProjectLanguage languages={["python","Python"]} >Python</FilterButtonProjectLanguage>
            <FilterButtonProjectLanguage languages={["js","Js","JS","javascript","Javascript"]} >Javascript</FilterButtonProjectLanguage>
            <FilterButtonProjectLanguage languages={["ts","Ts","TS","typescript","Typescript"]} >Typescript</FilterButtonProjectLanguage>
            <FilterButtonProjectFramework frameworks={["react","React"]} >React</FilterButtonProjectFramework>
            <FilterButtonProjectFramework frameworks={["opengl","OpenGL"]} >OpenGL</FilterButtonProjectFramework>
            <FilterButtonProjectFramework frameworks={["SFML","sfml"]} >SFML</FilterButtonProjectFramework>
            <FilterButtonProjectFramework frameworks={["unity","Unity", "Unity3D", "Unity3d", "unity3D", "unity3d"]} >Unity3D</FilterButtonProjectFramework>
        </div>
    </div>
}