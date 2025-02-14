import { motion } from 'framer-motion';
import React, { useState } from 'react';
import BlobButton from './BlobButton';
// const Card = () => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleClick = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className={`card ${isExpanded ? 'expanded' : ''}`} onClick={handleClick}>
//       <div className="card-content">
//         <h2>Card Title</h2>
//         <p>This is some content inside the card.</p>
//       </div>
//     </div>
//   );
// };

export default function Card({title,_id}) {
  
    return (
      <div className="App">
        <motion.div
          
          transition={{ layout: { duration: 1, type: "spring" } }}
          layout
          onClick={() => setIsOpen(!isOpen)}
          className="card"
        >
          <motion.h2 layout="position">
            <div className='card-layout'><span>{title}</span>
            <div className='buttons-pair'>
            <BlobButton label="✎ Edit" _id={_id} edit={true}/>
            <BlobButton label="👀 View" _id={_id} edit={false}/>
            </div>
            </div>
            
            </motion.h2>
  
         
        </motion.div>
      </div>
    );
  }