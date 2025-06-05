import React from 'react';
import './Chips.css';

export default function DismissibleChip({ label, onDismiss }) {
  return (
    <div className="dismissible-chip">
      <span className="chip-label">{label}</span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        className="chip-dismiss-button"
        aria-label={`Remove ${label}`}
      >
        <img
          src="/assets/X Small.svg"
          alt="Remove"
          className="chip-dismiss-icon"
        />
      </button>
    </div>
  );
}
