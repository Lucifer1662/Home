import React from 'react';
import { FilterButton } from './FilterButton';
import { useProjectsContext } from './ProjectsContext';

interface Props {
    children?: React.ReactNode,
    frameworks: string[]
}

export function FilterButtonProjectFramework({ children, frameworks }: Props) {
    const projectsState = useProjectsContext();

    return <FilterButton
        onActive={() => projectsState.setFrameworkFilter(frameworks)}
        onDeactive={() => projectsState.removeFrameworkFilter(frameworks)} >
        {children}
        {" "}
        {projectsState.projectsThatMatchFrameworks(frameworks).length}
    </FilterButton>

}