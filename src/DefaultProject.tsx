import React, { useEffect, useRef } from 'react';
import ProjectData from './interfaces/ProjectData';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';

import ProjectImage from './ProjectImage';

interface Props {
    project: ProjectData
}


export default function DefaultProject({ project }: Props) {
    var { name, description, images, page } = project || {};

    


    return <div style={{ width: "100%", height: "100%", display:"flex", alignItems:'center', flexDirection:'column' }} >
        <div style={{ width: "80%", height: "100%", flex:1 }} >
            <Card>
                {name && <CardHeader title={name} />}
                <CardContent>
                    {description && <Typography variant="body1">{description}</Typography>}
                    <div  style={{ width: "100%", height: "100%", display:"flex", alignItems:'center', flexDirection:'row', flexWrap:"wrap"}}>
                        {images && images.map(img => <ProjectImage image={img} />)}
                    </div>
                </CardContent>
                
            </Card>
            {page && <iframe allow="camera; microphone" src={page} style={{width:"100%", height: "90vh", border:0}}/> }
        </div>
    </div>
}