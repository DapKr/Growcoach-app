import React from 'react';
import './CTAButton.css';

export default function CTAButton({
  children,
  size,
  variant = 'primary',
  ...props
}) {
  return (
    <button
      className={`cta-button${size === 'small' ? ' small' : ''} ${variant}`}
      {...props}
    >
      <span className="cta-button-text">{children}</span>
    </button>
  );
}
