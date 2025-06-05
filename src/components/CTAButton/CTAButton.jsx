import React from 'react';
import './CTAButton.css';

export default function CTAButton({ children, size, ...props }) {
  return (
    <button
      className={`cta-button${size === 'small' ? ' small' : ''}`}
      {...props}
    >
      <span className="cta-button-text">{children}</span>
    </button>
  );
}
