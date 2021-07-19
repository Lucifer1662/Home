import React from 'react';
import { FilterButton } from './FilterButton';
import { useProjectsContext } from './ProjectsContext';

interface Props {
    children?: React.ReactNode,
    languages: string[]
}

export function FilterButtonProjectLanguage({ children, languages }: Props) {
    const projectsState = useProjectsContext();


    return <FilterButton
        onActive={() => projectsState.setLanguageFilter(languages)}
        onDeactive={() => projectsState.removeLanguageFilter(languages)} >
        {children} 
        {" "}
        {projectsState.projectsThatMatchLanguages(languages).length}
    </FilterButton>

}