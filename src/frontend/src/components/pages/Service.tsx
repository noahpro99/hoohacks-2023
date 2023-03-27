import React from 'react';
import '../../App.css';
import FileUploader from '../FileUpload';
import { sortRequest } from '../../types';
import { motion } from 'framer-motion';
import DropdownButton from '../DropDownMenu';
import { useSearchParams } from 'react-router-dom';

export default function Service() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [image, setImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [bins, setBins] = React.useState<string[]>(['trash', 'recycle - plastic, glass, metal', 'compost - paper, food']);
  const [binResultName, setBinResultName] = React.useState("");
  const [binResultProb, setBinResultProb] = React.useState(0);
  const [unSelectedBins, setUnSelectedBins] = React.useState<string[]>(['batteries', 'e-waste']);
  const [targetCoords, setTargetCoords] = React.useState({ x: 0, y: 0 });

  const map: { [id: string]: string; } = {};
  map['trash'] = 'images/trash.png';
  map['recycle - plastic, glass, metal'] = 'images/recycle.png';
  map['compost - paper, food'] = 'images/compost.png';
  map['batteries'] = 'images/batteries.png';
  map['e-waste'] = 'images/e-waste.png';
  React.useEffect(() => {
    if (searchParams.get('image')) {
      fetch(`images/${searchParams.get('image')}.txt`)
        .then(response => response.text())
        .then(data => {
          setImage(data);
        }
        )
        .catch((error) => {
          console.error('Error:', error);
        }
        );
    }
    else {
      setImage("");
    }
  }, [searchParams]);

  const onClickClick = () => {
    setLoading(true);
    console.log("clicked")

    // fetch to backend and get the response with post
    fetch(`${process.env.REACT_APP_API_URL}/best_bin`, {
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


        const target = document.getElementById(`bin_${data.idx.toString()}`);
        const targetCoords = target?.getBoundingClientRect();
        setTargetCoords({ x: targetCoords?.x || 0, y: targetCoords?.y || 0 });
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      });

    setLoading(false);
  };

  const MovingAnimation = () => {
    console.log(targetCoords);
    return (
      <motion.img
        className='rounded-2xl shadow-2xl '
        src={image}
        alt="My Image"
        style={{
          width: '200px',
          position: 'absolute',
        }}
        animate={{
          x: [targetCoords.x, targetCoords.x],
          y: [targetCoords.y - 75, targetCoords.y],

          opacity: [1, 0],
          scale: [1, 0.5],
          transition: { duration: 3, ease: 'easeInOut' },

        }}
      />
    );
  };
  return (
    <div className="bg-[#242e52] min-h-screen text-white" >
      {binResultName &&
        <MovingAnimation />}
      <h1 className="text-4xl text-center pt-6 text-white"
      >Service</h1>
      <div className="grid grid-cols-2 m-10">
        <div className="flex flex-col items-center mx-4">
          <FileUploader setImage={setImage} image={image} setBinResultName={setBinResultName} />
          {
            (binResultName && image) ?
              (<motion.img
                className='h-96 mt-5 rounded-2xl shadow-2xl '
                src={image}
                alt="My Image"
                animate={{
                  opacity: [1, 0],
                  scale: [1, 0.9],
                  transition: { duration: 1, ease: 'easeInOut' },
                }}
              />)
              :
              <img
                className='h-96 mt-5 rounded-2xl shadow-2xl '
                src={image}
                alt=""
              />

          }

        </div>
        <div className="flex flex-col items-center justify-start mx-10">
          <div className="flex flex-wrap mx-4 mt-6">
            {bins.map((bin, index) => {
              return <button
                className="text-white border-white rounded-md m-2 p-2 hover:bg-[#E0DBD1] hover:border-[#E0DBD1] hover:scale-110 hover:text-[#3c4150] hover:shadow-2xl"
                type="button"
                id={`bin_${(index).toString()}`}
                key={index} onClick={() => {
                  setBinResultName("");
                  setBins(bins.filter((b) => b !== bin));
                  setUnSelectedBins([...unSelectedBins, bin]);
                }}>
                <img
                  className='h-48'
                  alt={bin}
                  src={`${map[bin]}`}>
                </img>
              </button>
            })}
          </div>
          <DropdownButton unSelectedBins={unSelectedBins} setBins={setBins} setUnSelectedBins={setUnSelectedBins} setBinResultName={setBinResultName} />
          <button className="bg-[#3c4150] text-white border-2 border-white rounded-md m-2 p-2 hover:bg-white hover:scale-110 hover:text-[#3c4150] hover:shadow-2xl"
            onClick={onClickClick}>Sort</button>
        </div>
      </div>
    </div >
  );
}

