import { Card, CardContent, CardHeader, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import ProjectData from './interfaces/ProjectData'

interface Props {
    project: ProjectData,
    hovering?: boolean
}


export default function ProjectTitleBar({ project, hovering = true }: Props) {
    var { name, description, } = project;



    return <Card>
        <CardHeader title={name} subheader={hovering && <Typography variant="body1" >{description}</Typography>} />
    </Card>
}



