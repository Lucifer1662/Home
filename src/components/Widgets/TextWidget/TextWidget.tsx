import React from 'react';
import TextWidgetData from '../../../interfaces/Widgets/TextWidget';
import {Typography} from '@material-ui/core';

interface Props {
    data: TextWidgetData
}

export default function TextWidget({data}: Props) {
    var { text, variant } = data;

    return <div style={{display:'flex', justifyContent:'center'}}>
        
        <Typography 
        //@ts-ignore
        variant={variant}>
            {text}
        </Typography>
    </div>
}