import React, { useState } from "react";

interface DropdownButtonProps {
  unSelectedBins: string[];
  setBins: React.Dispatch<React.SetStateAction<string[]>>;
  setUnSelectedBins: React.Dispatch<React.SetStateAction<string[]>>;
  setBinResultName: React.Dispatch<React.SetStateAction<string>>;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ unSelectedBins, setBins, setUnSelectedBins, setBinResultName: setBinResult }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (bin: string) => {
    setBins((prev) => [...prev, bin]);
    setUnSelectedBins((prev) => prev.filter((b) => b !== bin));
    setBinResult("");
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left my-2 hover:shadow-2xl">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          Add Bin
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {unSelectedBins.map((bin, index) => {
              return (
                <button

                  key={index}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleOptionClick(bin)}
                >
                  {bin}
                </button>
              );
            })}

          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
