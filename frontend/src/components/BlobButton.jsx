import React from 'react';
import { useNavigate } from "react-router-dom"
function BlobButton({label, _id, action, style}) {
  const navigate = useNavigate();
  function handleClick()
  {
    if(action==="edit")
    {
      navigate(`/editnote/${_id}`)
    }
    else if(action==="view"){
      navigate(`/viewnote/${_id}`)
    }
    else
    {
      const deleteNotes = async () => {
        const requestOptions = {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      };
        try {
            const response = await fetch(`http://localhost:8001/note/delete/${_id}`, requestOptions);

            if (response.ok) {
                const result = await response.json();
                setNotes([{}])
                navigate(`/notepage`)
            } else {
                console.error('Failed to delete notes:', response.status);
            }
        } catch (error) {
            console.error('Error deleting notes:', error);
        }
    };

    deleteNotes();
    }
  }
  return (
    <div className="buttons">
      <button className="blob-btn" onClick={handleClick} style={style?style:null}>
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
