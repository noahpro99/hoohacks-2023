import React from 'react';
import '../../App.css';
import FileUploader from '../FileUpload';
import { sortRequest } from '../../types';
import DropdownButton from '../DropDownMenu';

export default function Service() {
  const [image, setImage] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [bins, setBins] = React.useState<string[]>(['trash', 'recycle', 'compost']);
  const [binResultName, setBinResultName] = React.useState("");
  const [binResultProb, setBinResultProb] = React.useState(0);
  const [unSelectedBins, setUnSelectedBins] = React.useState<string[]>(['recycle plastic', 'recycle paper']);

  const addBin = () => {
    if (unSelectedBins.length > 0) {
      setBins([...bins, unSelectedBins[0]]);
      setUnSelectedBins(unSelectedBins.filter((bin) => bin !== unSelectedBins[0]));
    }
  }


  const onClickClick = () => {
    setLoading(true);
    console.log("clicked")

    // fetch to backend and get the response with post
    fetch(`${process.env.REACT_APP_BACKEND_URL}/best_bin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_base64: image.split(",")[1],
        bin_names: bins
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setBinResultName(data.bin_name);
        setBinResultProb(data.prob);
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      });

    setLoading(false);
  };

  const binDropdown = () => {
    return (
      <select>
        {bins.map((bin, index) => {
          return <option key={index}>{bin}</option>
        })}
      </select>
    )
  }


  return (
    <div className="bg-[#40496f] min-h-screen" >
      <h1 className="text-4xl text-center text-white"
      >Service</h1>
      <div className="flex flex-col justify-center sm:flex-row">
        <div className="flex flex-col items-center">
          <FileUploader setImage={setImage} image={image} />
          {image && <img className="h-96"
            src={image} alt="uploaded" />}
        </div>
        <div className="flex flex-col items-center">
          {bins.map((bin, index) => {
            return <button key={index} onClick={() => {
              setBins(bins.filter((b) => b !== bin));
              setUnSelectedBins([...unSelectedBins, bin]);
            }}>{bin}</button>
          })}
          <DropdownButton unSelectedBins={unSelectedBins} setBins={setBins} setUnSelectedBins={setUnSelectedBins} />

          <button onClick={onClickClick}>Submit</button>
          {binResultName && <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl text-center text-white"
              >Result</h1>
              <h1 className="text-4xl text-center text-white"
              >{binResultName}</h1>
              <h1 className="text-4xl text-center text-white"
              >{binResultProb}</h1>

            </div>
          </div>
          }
        </div>
      </div>
    </div >
  );
}

