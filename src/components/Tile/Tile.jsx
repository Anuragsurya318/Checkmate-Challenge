import React, { useState } from "react";

const Tile = ({ isWhite, image, highlight }) => {
  const [isGrabbing, setIsGrabbing] = useState(false);

  return (
    <div
      className={`tile w-[68.75px] h-[68.75px] ${
        isWhite ? "bg-light_tile" : "bg-dark_tile"
      } flex items-center justify-center bg-cover bg-center bg-no-repeat ${
        highlight ? "border-4 border-yellow-500" : ""
      }`}
      onMouseDown={() => setIsGrabbing(true)}
      onMouseUp={() => setIsGrabbing(false)}
      onMouseLeave={() => setIsGrabbing(false)}
    >
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={`chess-piece w-full h-full bg-cover ${
            isGrabbing ? "cursor-grabbing" : "cursor-grab"
          }`}
        ></div>
      )}
    </div>
  );
};

export default Tile;
