import React, { useState } from 'react';

const DropZone = () => {
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

    const file = e.dataTransfer.files[0];
    console.log(file);
    // Do something with the dropped file (e.g. upload it to a server)
  };

  return (
    <div
      className={`dropzone${dragging ? ' dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border: '2px dashed #aaa',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <p>Drag and drop a video file here</p>
    </div>
  );
};

export default DropZone;
