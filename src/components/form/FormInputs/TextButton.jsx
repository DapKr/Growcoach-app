import React from 'react';
import './TextButton.css';

export default function TextButton({ children, onClick, color = 'primary' }) {
  const buttonClass = `text-button ${color}`;
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}
