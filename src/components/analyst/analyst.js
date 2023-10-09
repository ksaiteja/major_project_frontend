import React, { useState, useEffect } from "react";
import Header from "../Header/header";
// Import Font Awesome CSS
import "font-awesome/css/font-awesome.min.css";
import CreateModel from "./CreateModel";

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [createModelOverlay, setCreateModelOverlay] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/analyst/files") // Make sure this matches your server route
      .then((response) => response.json())
      .then((data) => {
        setFiles(data.files);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, []);

  const handleFileClick = (file) => {
    setSelectedFile(file);

    // Make an API POST request to /files/getNames with the selected file as the JSON body
    fetch("http://localhost:4000/api/analyst/files/getNames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: file }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data and set it in the state
        console.log(JSON.parse(data).names);
        if (data) {
          setFileNames(JSON.parse(data).names);
        } else {
          setFileNames([]); // Set to an empty array if keys are not present
        }
      })
      .catch((error) => {
        console.error("Error fetching file names:", error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col mt-24 p-3">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold mb-4">Analyst Dashboard</h1>
          <button
            className="bg-blue-500 text-white px-2 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={() => setCreateModelOverlay(true)}
          >
            Create a new model
          </button>
        </div>
        <br></br>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr
                key={index}
                className={`${selectedFile === file ? "bg-blue-200" : ""}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {file
                    .slice(0, -4)
                    .replace(/_/g, " ")
                    .charAt(0)
                    .toUpperCase() +
                    file.slice(0, -4).replace(/_/g, " ").slice(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition duration-300">
                    Append Student
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-300">
                    Delete Student
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={() => handleFileClick(file)}
                  >
                    View Students
                  </button>
                  <button className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 transition duration-300">
                    Remove Model
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        {selectedFile && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">
              Students available in the{" "}
              <span className="text-blue-500">{selectedFile}</span> model are :
            </h2>
            {fileNames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {fileNames.map((name, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">
                      <i className="fa fa-check-circle"></i>
                    </span>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-gray-600">No keys found.</p>
            )}
          </div>
        )}
      </div>
      <CreateModel
        showOverlay={createModelOverlay}
        hideOverlay={() => setCreateModelOverlay(false)}
      ></CreateModel>
    </div>
  );
}

export default App;
