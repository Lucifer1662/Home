


export default (offset:number = 0) => (ref : HTMLDivElement | null)=>{
    if(ref != null){

        window.scrollTo({top: ref.getBoundingClientRect().top + window.scrollY - offset,})
    }
}