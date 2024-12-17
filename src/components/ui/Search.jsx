import React from "react";

const  SearchBar = () => {
  return (
    <>
    <div className="flex items-center ">

      <div className="flex items-center justify-between border border-gray-300 rounded-full h-[44px] w-[379px] px-4 shadow-sm">
        {/* Input Text */}
        <input      
          type="text"
          placeholder="Graha Kadin Kota Bandung"
          className="w-full text-black outline-none placeholder:text-black"
          />

        {/* Close Button */}
        <button className="text-black hover:text-gray-700 cursor-pointer font-bold">
          ✕
        </button>

        {/* Profile Image */}

       
      </div>
      <img
          src="https://via.placeholder.com/40"
          alt="profile"
          className="w-[40px] h-[40px] rounded-full object-cover border-2 ml-2 border-blue-300"
          />
          </div>
    </>
  );
};

export default SearchBar;
