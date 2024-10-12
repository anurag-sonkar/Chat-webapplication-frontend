import React from 'react'
import { useSelector } from 'react-redux'
import ReactPlayer from "react-player";
// import { Document, Page } from '@react-pdf/renderer';

function Preview() {
    const { preview } = useSelector(state => state.preview)
    // console.log("preview" , preview)

    const renderPreview = (file) => {
        const { name, type, url } = file;

        // Image preview
        if (type.startsWith("image/")) {
            return <img src={url} alt={name} className="w-36 h-auto object-cover" />;
        }

        // Video preview
        if (type.startsWith("video/")) {
            return <ReactPlayer url={url} controls width="400px" />;
        }

        // Audio preview
        if (type.startsWith("audio/")) {
            return <audio controls src={url}></audio>;
        }

        // PDF preview
        // if (type === "application/pdf") {
        //     return (
        //         <Document file={url}>
        //             <Page pageNumber={1} />
        //         </Document>
        //     );
        // }

        // Default for other file types (DOCX, XML, etc.)
        return (
            <div className="flex items-center">
                <span className="mr-2">📄</span> {/* Icon for file */}
                <p>{name}</p>
            </div>
        );
    };
  return (
      <div className="flex gap-1 justify-center items-center">
          {preview?.map((file, index) => (
              <div key={index} className="file-preview">
                  {renderPreview(file)}
              </div>
          ))}
      </div>
  )
}

export default Preview