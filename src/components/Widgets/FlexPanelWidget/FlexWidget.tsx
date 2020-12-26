import React from 'react';
import FlexPanelWidgetData from '../../../interfaces/Widgets/FlexPanelWidget';
import Widget from '../Widget';

interface Props {
    data: FlexPanelWidgetData
}

export default function FlexWidget({data}: Props) {
    var { children } = data;

    return <div style={{ ...styleMedia, display:'flex'}}>
        {children.map((child,index)=><Widget key={index} widget={child}/>)}
    </div>
}