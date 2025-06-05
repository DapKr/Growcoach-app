import React from 'react';
import './TextButton.css';

export default function TextButton({
  children,
  onClick,
  type = 'button',
  color = 'primary',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`text-button text-button-${color} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
