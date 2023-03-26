import "./FileUpload";
import React, { useState } from "react";

export default function App(props) {

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
    console.log(e);
    console.log(e.target);
    console.log(e.dataTransfer.files);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        props.setImage(event.target.result);
        console.log(event.target.result);
        console.log(props.image);
      };
      reader.readAsDataURL(file);
    }

    // const newFile = e.dataTransfer.files[0];
    // console.log(newFile);
  };
  // Do something with the dropped file (e.g. upload it to a server)

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        props.setImage(event.target.result);
        props.setBinResultName(null);
        console.log(event.target.result);
        console.log(props.image);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="drag-drop-container mt-6">
      <div
        className={`dropzone${dragging ? " dragging" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #aaa",
          borderRadius: "10px",
          paddingTop: "40px",
          paddingBottom : "20px",
          textAlign: "center"
        }}
      >
        <p>Drag and drop a video file here</p>
        <p> or </p>
        <div className="add-file-container left " >
          <input
            type="file"
            id="image-file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </div>
  );
}
