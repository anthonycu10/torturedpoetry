// src/TypewriterEffect.js
import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ text, speed = 100 }) => {
  const [typedText, setTypedText] = useState(''); // to track typed text
  const [index, setIndex] = useState(0); // to track the currect char index 

  useEffect(() => {
    if (!text) return;

    const interval = setInterval(() => {
        if (index < text.length) {
            setTypedText((prev) => prev + text[index]); // Add one character at a time
            setIndex((prevIndex) => prevIndex + 1); // increment index
        } else {
            clearInterval(interval); // stop when text is complete
        }
      }, speed); // Typing speed can be adjusted by passing `speed` as a prop

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [text, speed, index]); // Re-run effect if `text` or `speed` change

  return <span className="typed-text">{typedText}</span>; // Display typed text with class for styling
};

export default TypewriterEffect;