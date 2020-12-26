import FlexPanelWidget from "./Widgets/FlexPanelWidget";
import TextWidget from "./Widgets/TextWidget";
import ImageWidget from "./Widgets/ImageWidget";
import RootWidget from "./Widgets/RootWidget";



export interface ImageData{
    path: string,
    title?: string,
    description?: string,

}

export enum WidgetType {
    TextWidget = "Text",
    Image = "Image",
    FlexPanel = "FlexPanel",
    Title = "Title",
    Description = "Description",
    Root = "Root"

}

export type WidgetData = TextWidget | ImageWidget | FlexPanelWidget | RootWidget;

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