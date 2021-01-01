import { Collapse, CollapseProps } from '@material-ui/core';
import React, { useEffect, useState } from 'react';



export default function CollapseOnEnter(props : CollapseProps){
    let [open, setOpen] = useState(false);
    useEffect(()=>{
        setOpen(true);
    },[])
    
    return <Collapse {...props} in={open} unmountOnExit>
        
    </Collapse>
}