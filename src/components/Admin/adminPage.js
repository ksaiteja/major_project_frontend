import React, { useState } from "react";
import ReactLoading from "react-loading";
import Header from "../Header/header";

const AdminPage = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [namesIdentified, setNamesIdentified] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
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
              const image=responseData.image
              const names=responseData.names

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
      <Header/>
      <div className="flex flex-col mt-24 items-center justify-center h-screen">
        <div className="w-64 h-64 border-dashed border-2 border-gray-300 rounded-lg p-4 text-center relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
      />
      <p className="text-gray-400 flex flex-col items-center justify-center h-full">
        Drag & Drop or Click to Upload
      </p>
        </div>
        {originalImage && (
      <div className="flex flex-row">
        <div className="flex mt-4">
          <h3 className="text-xl font-semibold">Original Image:</h3>
          <img
            src={originalImage}
            className="max-w-xs max-h-xs mx-auto rounded-lg"
            alt="Original"
          />
          {processedImage == null ? (
            <div className="flex">
            <h3 className="text-xl font-semibold">Processed Image:</h3>
            <ReactLoading type="spinningBubbles" color="purple" />
            </div>
          ) : (
            <div className="flex mt-4">
              <h3 className="text-xl font-semibold">Processed Image:</h3>
              <img
                src={processedImage}
                className="max-w-xs max-h-xs mx-auto rounded-lg"
                alt="Processed"
              />
              {namesIdentified && (
                <div className=" flex mt-4">
                  <h2>Persons Identified:</h2>
                  <ul className="list-disc pl-4">
                    {namesIdentified.split('\r').map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
        )}
      </div>
    </div>

  );
};

export default AdminPage;
