import React, {useState} from 'react';
import '../../App.css';
import Modifiers from '../Modifiers';
import FileUploader from '../FileUpload';

export default function Service() {
  const [modifs, setModif] = useState(["Modifier 1", "Modifier 2"])
  return (
    <div className="bg-gray-200 min-h-screen">
      <h1>Service</h1>
      <Modifiers modifs={modifs}/>
      <input type="text" />
      <button>Add Modifier</button>
      <button>Clear selected Modifiers</button>
      <div>Search for: </div>
      <FileUploader />
    </div>
  );
}

