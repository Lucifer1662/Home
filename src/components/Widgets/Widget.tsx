import React from 'react'
import { Widget as WidgetData, WidgetType } from '../../interfaces/ProjectData';
import TextWidget from './TextWidget/TextWidget';
import TextWidgetData from '../../interfaces/Widgets/TextWidget';
import FlexPanelWidget from './FlexPanelWidget/FlexWidget';
import FlexPanelWidgetData from '../../interfaces/Widgets/FlexPanelWidget';
import ImageWidget from './ImageWidget/ImageWidget';
import ImageWidgetData from '../../interfaces/Widgets/ImageWidget';



interface Props {
    widget: WidgetData,
    onClick?: any,
}

export default function Widget({ widget, onClick }: Props) {


    if (!widget)
        return null;

    switch (widget.type) {
        case WidgetType.TextWidget:
            {
                let data = widget.data as TextWidgetData;
                return <TextWidget data={data} />
            }
        case WidgetType.FlexPanel:
            {
                let data = widget.data as FlexPanelWidgetData;
                return <FlexPanelWidget data={data} />
            }
        case WidgetType.Image:
            {
                let data = widget.data as ImageWidgetData;
                return <ImageWidget data={data} />
            }
    }
    return null;
}


