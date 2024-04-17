// AnalyticsScreen.js
import React from 'react';

const AnalyticsScreen = ({ onPageChange }) => {
  return (
    <div>
      <h1>Analytics</h1>
      <button onClick={() => onPageChange('dataExtraction')}>Back</button>
    </div>
  );
};

export default AnalyticsScreen;
