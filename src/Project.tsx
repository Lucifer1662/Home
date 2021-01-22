import React, { useState } from 'react';
import ProjectData, { Widget as WidgetType } from './interfaces/ProjectData';
import { Card, CardActions, CardContent, CardHeader, Collapse, IconButton, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProjectImage from './ProjectImage';
import { GridList, GridListTile, GridListTileBar, ListSubheader } from '@material-ui/core';
import ProjectTitleBar from './ProjectTitleBar'
interface Props {
    data: ProjectData,
    onClick: ()=>void
}


export default function Project({ data, onClick }: Props) {
    var { name, description, images } = data;

    let [hovering, setHovering] = useState(false);

    const handleMouseEnter = ()=>{
        setHovering(true)
        
    }

    const handleMouseLeave = ()=>{
        setHovering(false)
    }


    return <div style={{ cursor: "pointer", width: "100%", height: "100%", position:'relative'}} onClick={onClick} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
        {images?.length > 0 && <img style={{ objectFit: "cover", width: "100%", height: "100%" }} src={images[0].path} />}
        <div style={{position:'absolute', bottom:0, width:"100%"}}> 
            <ProjectTitleBar project={data} hovering={hovering} />
        </div>
    </div>
}