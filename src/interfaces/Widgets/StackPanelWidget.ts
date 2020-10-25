import { Widget } from "../ProjectData";


export default interface StackPanelWidget {
    children: Widget[]
}
export const props = [
    "children",
]

export const defaultProp = "children";