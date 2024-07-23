import React from "react";
import { getCharacter } from "../../../helper";

const Files = ({ files }) => {
  return (
    <div className="file border-red-600 border-2 flex gap-2">
      {files.map((file) => {
        return <span key={file}>{getCharacter(file)}</span>;
      })}
    </div>
  );
};

export default Files;
