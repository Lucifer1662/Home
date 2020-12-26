import { Widget } from "../ProjectData";


export default interface FlexPanelWidget {
    children: Widget[],
    style?:any
}
export const props = [
    "children",
]

export const defaultProp = "children";