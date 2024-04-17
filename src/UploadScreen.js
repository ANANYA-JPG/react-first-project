// UploadScreen.js
import React, { useState } from 'react';

const UploadScreen = ({ onPageChange }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = () => {
    if (!selectedFiles) {
        alert('Please select a file to upload.');
        return;
    }

    const file = selectedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/upload', { //points to flask backend
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to upload file');
        }
        return response.json();
    })
    .then(data => {
        console.log('Server response:', data);
        // Handle server response as needed
    })
    .catch(error => {
        console.error('Error uploading file:', error);
    });
};
  return (
    <div>
      <h1>Upload CSV File</h1>
      <input type="file" accept=".csv, .csv.zip" onChange={handleFileInputChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={() => onPageChange('dataExtraction')}>Back</button>
    </div>

  );
};

export default UploadScreen;