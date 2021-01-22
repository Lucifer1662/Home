import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import {Skeleton} from '@material-ui/lab'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props{
    file: string
}

interface PageProps{
    pageNumber:number,
    pageWidth?:number,
}

function PDFPage({ pageNumber, pageWidth} : PageProps){
    const [loaded, setLoaded] = useState(false);
    const skeletonWidth = pageWidth || 600;
    const skeletonHeight = skeletonWidth * 2;
    return <div>
             {!loaded && <Skeleton variant="rect" width={skeletonWidth} height={skeletonHeight} /> }
                
            <Page renderAnnotationLayer={false} onLoadSuccess={()=> setLoaded(true) }  renderMode={loaded?undefined:'none'} pageNumber={pageNumber} width={pageWidth} />
    </div>
}

export function PDFViewer({file}:Props) {
    const [numPages, setNumPages] = useState(0);
   
    const [pageNumber, setPageNumber] = useState(1);
    const pageRef = useRef<HTMLDivElement | null>(null);
    const [pageWidth, setPageWidth] = useState<number|undefined>(undefined);

    

    useEffect(() => {
        if (pageRef != null && pageRef.current != null) {
            const width = pageRef.current.getBoundingClientRect().width;
            setPageWidth(width*0.6)
        }

    }, [pageRef])

    function onDocumentLoadSuccess({ numPages, }: pdfjs.PDFDocumentProxy) {
        setNumPages(numPages);
       
    }

    var pages = [];

    for(let i = 0; i < numPages; i ++){
        pages.push(<PDFPage key={i} pageNumber={i+1} pageWidth={pageWidth}/>) 
    }
    

    return (
        <div ref={pageRef} 
         style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY:'auto' }}>
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                renderMode={"svg"}
                
            >
               {pages}
            </Document>
        </div>
    );
}
