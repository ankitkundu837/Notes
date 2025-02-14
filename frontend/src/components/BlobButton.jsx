import React from 'react';
import { useNavigate } from "react-router-dom"
function BlobButton({label, _id, edit}) {
  const navigate = useNavigate();
  function handleClick()
  {
    if(edit)
    {
      navigate(`/editnote/${_id}`)
    }
    else{
      navigate(`/viewnote/${_id}`)
    }
  }
  return (
    <div className="buttons">
      <button className="blob-btn" onClick={handleClick}>
        {label}
        <span className="blob-btn__inner">
          <span className="blob-btn__blobs">
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
          </span>
        </span>
      </button>
      <br />

      {/* SVG Filter for Gooey Effect */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            ></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default BlobButton;
