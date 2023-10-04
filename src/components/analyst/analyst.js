import React, { useState, useEffect } from 'react';

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedFile, setExpandedFile] = useState(null);
  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/analyst/files') // Make sure this matches your server route
      .then((response) => response.json())
      .then((data) => {
        setFiles(data.files);
      })
      .catch((error) => {
        console.error('Error fetching files:', error);
      });
  }, []);

  const handleFileClick = (file) => {
    setSelectedFile(file);

    // Make an API POST request to /files/getNames with the selected file as the JSON body
    fetch('http://localhost:4000/api/analyst/files/getNames', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: file }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data and set it in the state
        console.log(JSON.parse(data).names)
        if (data) {
            
          setFileNames(JSON.parse(data).names);
        } else {
          setFileNames([]); // Set to an empty array if keys are not present
        }
        setExpandedFile(file);
      })
      .catch((error) => {
        console.error('Error fetching file names:', error);
      });
  };

  const collapseFile = () => {
    setExpandedFile(null);
    setFileNames([]);
  };

  return (
    <div>
      <h1>List of Files in Directory</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => handleFileClick(file)}>
            {file}
          </li>
        ))}
      </ul>
      {selectedFile && (
        <div>
          <h2>Selected File: {selectedFile}</h2>
          {expandedFile === selectedFile ? (
            <div>
              <button onClick={collapseFile}>Collapse</button>
              {fileNames.length > 0 ? (
                <ul>
                  {fileNames.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              ) : (
                <p>No keys found.</p>
              )}
            </div>
          ) : (
            <p>Click the file to expand and view names.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
