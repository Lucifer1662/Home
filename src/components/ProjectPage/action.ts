import { Dispatch } from "./dispatch";

export class Action<T>{
    protected setState: Dispatch<T> = ()=>{};
    
    public toData(): T {
        const obj = {}
        for (let key in this) {
            if(key !== "setState"){
                //@ts-ignore
                obj[key] = this[key];
            }
        }
        return obj as T;
    }
}
