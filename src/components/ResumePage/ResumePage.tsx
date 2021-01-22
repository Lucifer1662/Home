import React from 'react';
import {ResumeViewer} from './ResumeViewer';
import {ResumeDownload} from './ResumeDownload';

export default function ResumePage(){
    return <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems: 'center'}}>
        <ResumeDownload/>
        <ResumeViewer/>
        </div>
}


