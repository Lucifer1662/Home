import StackPanelWidget from "./Widgets/StackPanelWidget";
import TextWidget from "./Widgets/TitleWidget";
import ImageWidget from "./Widgets/ImageWidget";
import RootWidget from "./Widgets/RootWidget";



interface ImageData{
    path: string,
    title: string,
    descripition: string,

}

export enum WidgetType {
    TextWidget = "Text",
    ImageData = "Image",
    StackPanel = "StackPanel",
    Title = "Title",
    Description = "Description",
    Root = "Root"

}

export type WidgetData = TextWidget | ImageWidget | StackPanelWidget | RootWidget;

export interface Widget{
    type: WidgetType,
    data: WidgetData,
}

export default interface ProjectData{
    name: string,
    description: string, 
    images: ImageData[],
    template?: Widget
}