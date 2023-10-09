import React, { useState } from "react";

const CreateModel = ({ showOverlay, hideOverlay }) => {
  const [modelName, setModelName] = useState("");
  const [folderName, setFolderName] = useState("");

  const handleModelNameChange = (e) => {
    setModelName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the data for the POST request
      const data = {
        modelName: modelName,
        folderPath: folderName, // Get the selected folder path
      };

      // Make a POST request using fetch
      const response = await fetch(
        "http://localhost:4000/api/analyst/createModel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Request was successful
        const responseData = await response.json();
        console.log("Model creation successful:", responseData);

        // Hide the overlay after successful submission
        hideOverlay();
      } else {
        // Handle the case where the response status is not OK (e.g., 400 or 500 errors)
        console.error("Model creation failed:", response.statusText);
      }
    } catch (error) {
      // Handle errors (you can add more error handling logic here)
      console.error("Error creating model:", error);
    }
    
    hideOverlay();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        showOverlay ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-md p-4 w-96">
        <h2 className="text-lg font-semibold mb-4">Create Model</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="modelName"
              className="block text-sm font-medium text-gray-700"
            >
              Model Name
            </label>
            <input
              type="text"
              id="modelName"
              name="modelName"
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-400 focus:outline-none"
              value={modelName}
              onChange={handleModelNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="folder"
              className="block text-sm font-medium text-gray-700"
            >
              Choose Folder
            </label>
            <input
              type="text"
              id="folderName"
              name="folderName"
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-400 focus:outline-none"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
            />
          </div>
          <div className="bg-gray-100 p-1 rounded-lg">
            <p className="font-semibold text-lg">Note:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Use _ instead of space while entering Model name</li>
              <li>
                Place the folder with images in the datasets folder and enter
                folder name
              </li>
            </ul>
          </div>
          <br></br>
          <div className="flex justify-evenly">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={hideOverlay}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModel;
