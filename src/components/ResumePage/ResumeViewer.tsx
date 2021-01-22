
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import {Skeleton} from '@material-ui/lab'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export function ResumeViewer() {
    const [numPages, setNumPages] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const pageRef = useRef<HTMLDivElement | null>(null);
    const [pageWidth, setPageWidth] = useState<number|undefined>(undefined);

    const skeletonWidth = pageWidth || 600;
    const skeletonHeight = skeletonWidth * 2;

    useEffect(() => {
        if (pageRef != null && pageRef.current != null) {
            const width = pageRef.current.getBoundingClientRect().width;
            setPageWidth(width*0.6)
        }

    }, [pageRef])

    function onDocumentLoadSuccess({ numPages }: any) {
        setNumPages(numPages);
       
    }

    return (
        <div ref={pageRef} 
         style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Document
                file="/resume/resume20-1-2019.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                renderMode={"svg"}
            >
                {!loaded && <Skeleton variant="rect" width={skeletonWidth} height={skeletonHeight} /> }
                <Page onLoadSuccess={()=> setLoaded(true) }  renderMode={loaded?undefined:'none'} pageNumber={pageNumber} width={pageWidth} />
            </Document>
        </div>
    );
}