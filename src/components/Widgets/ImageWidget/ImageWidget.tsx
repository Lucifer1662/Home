import React from 'react';
import ImageWidgetData from '../../../interfaces/Widgets/ImageWidget';
import {Typography} from '@material-ui/core';

interface Props {
    data: ImageWidgetData
}

export default function TextWidget({data}: Props) {
    var { path } = data;

    return <div style={{display:'flex', justifyContent:'center'}}>
        
        <img src={path}/>
    </div>
}