import React from 'react';
import './Chips.css';
import { ReactComponent as XSmallIcon } from '../../icons/x-small.svg';

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
        <XSmallIcon className="chip-dismiss-icon" />
      </button>
    </div>
  );
}
