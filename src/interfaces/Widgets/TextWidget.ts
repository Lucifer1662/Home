

export default interface TextWidget{
    text: string
    variant?: string 
}

export const props = [
    "text",
    "variant"
]

export const defaultProp = "text";