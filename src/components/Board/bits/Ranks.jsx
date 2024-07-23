import React from "react";

const Ranks = ({ ranks }) => {
  return (
    <div className="ranks flex flex-col">
      {ranks.map((rank) => {
        return <span key={rank}>{rank}</span>;
      })}
    </div>
  );
};

export default Ranks;
