import {History} from 'history'

export const toProjects = (history : History)=>()=>{
    history.push("/Projects/")
}

export const toResume = (history : History)=>()=>{
    history.push("/Resume/")
}

export const toAboutMe = (history : History)=>()=>{
    history.push("/AboutMe/")
}

export const toContact = (history : History)=>()=>{
    history.push("/Contact/")
}
