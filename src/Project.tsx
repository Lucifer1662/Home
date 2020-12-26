import React from 'react';
import ProjectData from './interfaces/ProjectData';
import {Card, CardContent, CardHeader, Typography} from '@material-ui/core';

interface Props {
    data: ProjectData
}

export default function Project({ data }: Props) {
    var { name, description, images } = data;
    console.log(images)
    var imageCompoents = images.map(image=><div style={{flex:1}}><img style={{height:'30vh'}} src={image.path} /></div>)
    return <Card>
        <CardHeader title={name} />
        <CardContent>
            <Typography variant="body1" >{description}</Typography>
            <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around'}}>
                {imageCompoents}
            </div>
        </CardContent>
    </Card>
}