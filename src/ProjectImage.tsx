import { Typography } from '@material-ui/core'
import React from 'react'
import {ImageData} from './interfaces/ProjectData'

interface Props{
    image: ImageData
}


export default function ProjectImage({image} : Props){
    
    return <div style={{ flex: 1 }}>
        <Typography variant="h6" >{image.title}</Typography>
        <Typography variant="body2" >{image.description}</Typography>
        <img style={{ height: '30vh' }} src={image.path} />
        </div>
}



