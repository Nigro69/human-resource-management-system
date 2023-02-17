import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import resume from '../data/YASH-BARMAN-RESUME.pdf'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import '@react-pdf-viewer/core/lib/styles/index.css'

const PdfViewer = () => {
  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
              <Viewer 
              fileUrl={resume}/>
            </Worker>
    </div>
  )
}

export default PdfViewer
