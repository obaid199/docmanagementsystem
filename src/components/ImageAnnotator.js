import React from 'react';
import ReactImageAnnotate from 'react-image-annotate';

const ImageAnnotator = ({ src }) => {
    const [annotations, setAnnotations] = React.useState([]);

    const handleAnnotationsChange = (newAnnotations) => {
        setAnnotations(newAnnotations);
    };

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <ReactImageAnnotate
                images={[{ src }]}
                annotations={annotations}
                onChange={handleAnnotationsChange}
            />
        </div>
    );
};

export default ImageAnnotator;
