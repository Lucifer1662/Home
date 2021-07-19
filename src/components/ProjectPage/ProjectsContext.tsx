
import { createSingle, Action } from "context-class";
import ProjectData from './../../interfaces/ProjectData';

export class ProjectsState extends Action<ProjectsState> {
    public projects: ProjectData[] = [];
    public filterLanguages: string[] = [];
    public filterFrameworks: string[] = [];
    public selectedProject?: number;


    public get filteredProjects(): ProjectData[] {
        const filter = (p: ProjectData) =>
            this.filterFuncLanguages(this.filterLanguages)(p) || this.filterFuncFrameworks(this.filterFrameworks)(p)


        return (this.filterLanguages.length > 0 || this.filterFrameworks.length > 0) ? this.projects.filter(filter) : this.projects;
    }

    public projectsThatMatchLanguages(languages: string[]) {
        return this.projects.filter(this.filterFuncLanguages(languages));
    }

    public projectsThatMatchFrameworks(frameworks: string[]) {
        return this.projects.filter(this.filterFuncFrameworks(frameworks));
    }

    private filterFuncLanguages = (languages: string[]) => (p: ProjectData) => p.languages?.some(language => languages.includes(language))

    private filterFuncFrameworks = (frameworks: string[]) => (p: ProjectData) => p.frameworks?.some(framework => frameworks.includes(framework))


    addProjects(projects: ProjectData[]) { this.setState(ProjectsActionsReducer.addProjects(projects)); }

    setLanguageFilter(languages: string[]) { this.setState(ProjectsActionsReducer.setLanguageFilter(languages)); }

    removeLanguageFilter(languages: string[]) { this.setState(ProjectsActionsReducer.removeLanguageFilter(languages)); }

    setFrameworkFilter(frameworks: string[]) { this.setState(ProjectsActionsReducer.setFrameworkFilter(frameworks)); }

    removeFrameworkFilter(frameworks: string[]) { this.setState(ProjectsActionsReducer.removeFrameworkFilter(frameworks)); }

    setSelectedProject(selectedProject?: number) { this.setState(ProjectsActionsReducer.setSelectedProject(selectedProject)); }
}


export class ProjectsActionsReducer {
    static addProjects = (projects: ProjectData[]) => (prev: ProjectsState): ProjectsState => {
        return { ...prev, projects: [...prev.projects, ...projects] } as ProjectsState
    }

    static setLanguageFilter = (languages: string[]) => (prev: ProjectsState): ProjectsState => {
        return { ...prev, filterLanguages: [...prev.filterLanguages, ...languages] } as ProjectsState
    }

    static removeLanguageFilter = (languages: string[]) => (prev: ProjectsState): ProjectsState => {
        const filterLanguages = prev.filterLanguages.filter((language) => !languages.includes(language));

        return { ...prev, filterLanguages } as ProjectsState
    }


    static setFrameworkFilter = (frameworks: string[]) => (prev: ProjectsState): ProjectsState => {
        return { ...prev, filterFrameworks: [...prev.filterFrameworks, ...frameworks] } as ProjectsState
    }

    static removeFrameworkFilter = (frameworks: string[]) => (prev: ProjectsState): ProjectsState => {
        const filterFrameworks = prev.filterFrameworks.filter((framework) => !frameworks.includes(framework));

        return { ...prev, filterFrameworks } as ProjectsState
    }

    static setSelectedProject = (selectedProject?: number) => (prev: ProjectsState): ProjectsState => {
        return { ...prev, selectedProject } as ProjectsState
    }

}


export const [ProjectsContextProvider, useProjectsContext] = createSingle(new ProjectsState());





