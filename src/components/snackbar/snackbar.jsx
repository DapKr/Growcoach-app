import React, { useEffect } from 'react';
import './snackbar.css';

export default function Snackbar({
  open,
  message,
  actionLabel,
  onAction,
  onClose,
  duration = 5000,
}) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="snackbar-root">
      <span className="snackbar-message">{message}</span>
      {actionLabel && (
        <button className="snackbar-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
