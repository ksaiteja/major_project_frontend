import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import Header from "../Header/header";

const AdminPage = () => {
  const [file, setFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [namesIdentified, setNamesIdentified] = useState([]);
  const [models, setModels] = useState([]);
  const [model, setModel] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/api/analyst/files") // Make sure this matches your server route
      .then((response) => response.json())
      .then((data) => {
        setModels(data.files);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, []);
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Update selected file state
    setFile(file);

    // Create a FileReader to read the selected image
    const reader = new FileReader();

    reader.onload = (event) => {
      // Update image preview state with the data URL of the image
      setImagePreview(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const clearImagePreview = () => {
    // Clear the selected file and image preview
    setFile(null);
    setImagePreview(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        setOriginalImage(event.target.result);
        setProcessedImage(null);
        setNamesIdentified([]);

        try {
          // Send the image to the backend API
          const response = await fetch(
            "http://localhost:4000/api/admin/validate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                image: "C:/Users/saite/Pictures/" + file.name,
                model: model,
              }),
            }
          );
          // console.log(response);
          if (response.ok) {
            try {
              // Parse the JSON response
              const responseData = await response.json();
              console.log(responseData.names);

              // Assuming responseData contains an 'image' property with base64-encoded image data
              const image = responseData.image;
              const names = responseData.names;

              const imageUrl = `data:image/png;base64,${image}`;
              setProcessedImage(imageUrl);
              setNamesIdentified(atob(names));
            } catch (error) {
              console.error("Error parsing JSON response:", error);
            }
          } else {
            console.error("Failed to fetch processed image");
          }
        } catch (error) {
          console.error("Error sending image to the server:", error);
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading the file:", error);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col mt-24 items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-3 items-center"
        >
          <div>
            <label>Select the model : </label>
            <select onChange={(e) => setModel(e.target.value)}>
              {models.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
          <div className="w-64 h-64 border-dashed border-2 border-gray-300 rounded-lg p-4 text-center relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
            />
            {imagePreview ? (
              <div>
                <div className="absolute top-2 p-0 left-2 z-10 bg-red-500 text-white rounded-full cursor-pointer h-4 w-4 flex items-center justify-center">
                  <button onClick={clearImagePreview}>
                    <p className="text-xs">x</p>
                  </button>
                </div>

                <img
                  src={imagePreview}
                  alt="Selected Preview"
                  className="relative w-20 h-20 object-cover rounded-md"
                />
              </div>
            ) : (
              <p className="text-gray-400 flex flex-col items-center justify-center h-full">
                Drag & Drop or Click to Upload
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            process
          </button>{" "}
        </form>
        <div className="processedData flex flex-col">
          <div className="processedImages flex flex-row space-x-3">
            <div
              className={`originalImageDiv ${originalImage ? "" : "hidden"}`}
            >
              <h3 className="text-xl font-semibold">Original Image:</h3>
              <img
                src={originalImage}
                className="max-w-xs max-h-xs mx-auto rounded-lg"
                alt="Original"
              />
            </div>
            <div
              className={`processedImageDiv ${originalImage ? "" : "hidden"}`}
            >
              <h3 className="text-xl font-semibold">Processed Image:</h3>
              <img
                src={processedImage}
                className={`max-w-xs max-h-xs mx-auto rounded-lg ${
                  processedImage ? "" : "hidden"
                }`}
                alt="Processed"
              />
              <ReactLoading
                type="spinningBubbles"
                color="purple"
                className={`${processedImage === null ? "" : "hidden"}`}
              />
            </div>
          </div>
          {processedImage && (
            <div className={`namesIdentified flex flex-col items-center`}>
              <h2 className="text-xl font-semibold">Persons Identified:</h2>
              <ul className="list-disc pl-4">
                {namesIdentified
                  .split("\r")
                  .slice(0, -1)
                  .map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
