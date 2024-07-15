import React, { useState } from 'react';

const FileReaderComponent = () => {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [fileType, setFileType] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type);
      readFileContent(selectedFile);
    }
  };

  const readFileContent = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target.result);
    };

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file); // For image preview
    } else if (file.type === 'application/pdf') {
      reader.readAsDataURL(file); // For PDF preview
    } else {
      reader.readAsText(file); // For text file preview
    }
  };

  const renderPreview = () => {
    if (fileType.startsWith('image/')) {
      return <img src={fileContent} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />;
    } else if (fileType === 'application/pdf') {
      return <embed src={fileContent} type="application/pdf" width="100%" height="600px" />;
    } else {
      return <pre>{fileContent}</pre>;
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {file && (
        <div>
          <h3>Preview:</h3>
          {renderPreview()}
        </div>
      )}
    </div>
  );
};

export default FileReaderComponent;
