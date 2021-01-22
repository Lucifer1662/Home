import React from 'react';
import { CardHeader, IconButton, Typography } from '@material-ui/core';
import fileDownload from 'js-file-download';
import GetAppIcon from '@material-ui/icons/GetApp';

interface Props {
    parents?: any[]
}

export function ResumeDownload({ parents = [] }: Props) {

    const download = async () => {
        const response = await fetch("/resume/resume20-1-2019.pdf");
        const data = await response.arrayBuffer();
        fileDownload(data, "Luke-Hawkins-Resume.pdf");

    }

    return <div>
        <CardHeader 
        title={<Typography variant="h4" color="textPrimary">Luke Hawkins Resume</Typography>}
        action={<IconButton title="Download" onClick={download}><GetAppIcon  /></IconButton>}
        />
    </div>
}