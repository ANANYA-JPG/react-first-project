// DataExtraction.js (React component)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataExtraction = ({onPageChange}) => {
  const [tables, setTables] = useState([]); // List of available tables
  const [selectedTable, setSelectedTable] = useState(''); // Currently selected table
  const [tableData, setTableData] = useState([]); // Data fetched from the selected table
  const [sqlStatement, setSqlStatement] = useState('');
  const [response, setResponse] = useState(null);

  const executeSQL = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql_statement: sqlStatement })
      };

      const res = await fetch('http://localhost:5000/execute', requestOptions); // Changed the endpoint to '/execute'
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error executing SQL:', error);
      setResponse({ success: false, error: 'An error occurred while executing SQL.' });
    }
  };


  useEffect(() => {
    // Fetch available tables from your backend (Flask or Django)
    axios.get('/api/tables') // Example: '/api/tables' should point to your backend route
      .then((response) => {
        setTables(response.data.tables);
        setSelectedTable(response.data.tables[0]); // Set the first table as default
      })
      .catch((error) => {
        console.error('Error fetching tables:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the selected table
    if (selectedTable) {
      axios.get(`/api/data/${selectedTable}`) // Example: `/api/data/${selectedTable}`
        .then((response) => {
          setTableData(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [selectedTable]);

  return (
    <div>
      <textarea
        value={sqlStatement}
        onChange={(e) => setSqlStatement(e.target.value)}
        placeholder="Enter your SQL statement here..."
        rows={5}
        cols={50}
      />
      <h1>Data Extraction</h1>
      <button onClick={() => onPageChange('upload')}>Upload</button>
      <button onClick={() => onPageChange('analytics')}>Analytics</button>
      <button onClick={executeSQL}>Execute SQL</button>
      {response && (
        <div>
          <p>{response.message}</p>
          {response.results && (
            <table>
              <thead>
                <tr>
                  {Object.keys(response.results[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {response.results.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {response.error && <p>Error: {response.error}</p>}
          </div>
      )}
      <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
        {tables.map((table) => (
          <option key={table} value={table}>
            {table}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            {Object.keys(tableData[0] || {}).map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataExtraction;
