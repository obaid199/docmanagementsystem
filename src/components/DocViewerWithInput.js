import React, { useState } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';
import PdfViewerWithAnnotations from './PdfViewerWithAnnotations';
import CanvasImageAnnotator from './CanvasImageAnnotator'; // Custom Image Annotator Component

const DocViewerWithInput = () => {
    const [selectedDocs, setSelectedDocs] = useState([]);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setSelectedDocs(Array.from(e.target.files));
        }
    };

    const renderDocument = (doc) => {
        if (doc.fileName.endsWith('.pdf')) {
            return <PdfViewerWithAnnotations key={doc.uri} url={doc.uri} />;
        }

        if (doc.fileName.endsWith('.jpg') ||doc.fileName.endsWith('.JPG') || doc.fileName.endsWith('.png')) {
            return <CanvasImageAnnotator key={doc.uri} src={doc.uri} />;
        }

        return (
            <DocViewer
                key={doc.uri}
                documents={[doc]}
                pluginRenderers={DocViewerRenderers}
            />
        );
    };

    return (
        <div>
            <input
                type="file"
                accept=".pdf,.png,.csv,.doc,.docx,.txt,.jpg"
                multiple
                onChange={handleFileChange}
            />
            {selectedDocs.map((file) => {
                const doc = {
                    uri: window.URL.createObjectURL(file),
                    fileName: file.name,
                };
                return renderDocument(doc);
            })}
        </div>
    );
};

export default DocViewerWithInput;
