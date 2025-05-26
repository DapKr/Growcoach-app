import React from 'react';
import './CTAButton.css';

export function CTAButton({ children, ...props }) {
  return (
    <button className="cta-button" {...props}>
      <span className="cta-button-text">{children}</span>
    </button>
  );
}
