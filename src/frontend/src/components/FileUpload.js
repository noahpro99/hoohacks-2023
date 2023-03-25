import "./FileUpload";
import React, { useState } from "react";

export default function App() {
  // const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newFile = e.dataTransfer.files[0];
    console.log(newFile);
  };
  // Do something with the dropped file (e.g. upload it to a server)

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        console.log(event.target.result);
        console.log(image);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="drag-drop-container">
      <div
        className={`dropzone${dragging ? " dragging" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #aaa",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center"
        }}
      >
        <p>Drag and drop a video file here</p>
        <p> or </p>
        <div className="add-file-container">
          <input
            type="file"
            id="image-file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <label htmlFor="image-file" className="add-file-button">
            Add Image
          </label>
        </div>
      </div>
      <div className="image-preview-container">
        {image ? (
          <img src={image} alt="Preview" className="image-preview" />
        ) : (
          <p>No image selected</p>
        )}
      </div>
    </div>
  );
}