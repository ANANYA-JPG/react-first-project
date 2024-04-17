// App.js (Main Component)
import React, { useState } from 'react';
import './App.css';
import DataExtractionScreen from './DataExtractionScreen';
import AnalyticsScreen from './AnalyticsScreen';
import UploadScreen from './UploadScreen'; // Import the new UploadScreen component

function App() {
  const [currentPage, setCurrentPage] = useState('dataExtraction');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'dataExtraction' ? (
        <DataExtractionScreen onPageChange={handlePageChange} />
      ) : currentPage === 'analytics' ? (
        <AnalyticsScreen onPageChange={handlePageChange} />
      ) : (
        <UploadScreen onPageChange={handlePageChange} /> // Render the UploadScreen component
      )}
    </div>
  );
}

export default App;

