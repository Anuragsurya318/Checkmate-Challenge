import React from "react";

const Tile = ({ isWhite, image, highlight, onClick }) => {
  return (
    <div
      className={`tile w-[12.5vw] h-[12.5vw] sm:w-[68.75px] sm:h-[68.75px] ${
        isWhite ? "bg-light_tile" : "bg-dark_tile"
      } flex items-center justify-center bg-cover bg-center bg-no-repeat ${
        highlight ? "border-4 border-yellow-500" : ""
      }`}
      onClick={onClick}
    >
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="chess-piece w-full h-full bg-cover"
        ></div>
      )}
    </div>
  );
};

export default Tile;

// import React from "react";

// const Tile = ({ isWhite, image, highlight, onClick }) => {
//   return (
//     <div
//       className={`tile w-[68.75px] h-[68.75px] transform rotate-180 ${
//         isWhite ? "bg-light_tile" : "bg-dark_tile"
//       } flex items-center justify-center bg-cover bg-center bg-no-repeat ${
//         highlight ? "border-4 border-yellow-500" : ""
//       }`}
//       onClick={onClick} // Add onClick handler
//     >
//       {image && (
//         <div
//           style={{ backgroundImage: `url(${image})` }}
//           className="chess-piece w-full h-full bg-cover"
//         ></div>
//       )}
//     </div>
//   );
// };

// export default Tile;
