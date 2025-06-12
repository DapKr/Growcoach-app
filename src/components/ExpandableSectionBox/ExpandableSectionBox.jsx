import React from 'react';
import './././expandableSectionBox.css';

export default function SectionBox({
  title,
  isOpen,
  onToggle,
  iconOpen,
  iconClosed,
  children,
  className = '',
}) {
  // Clone icon and add default className
  const renderIcon = (icon) => {
    if (!icon) return null;
    return React.cloneElement(icon, {
      className: 'expandable-section-icon',
    });
  };

  return (
    <section className={`expandable-section-container ${className}`}>
      <div className="expandable-section-header" onClick={onToggle}>
        {isOpen ? renderIcon(iconOpen) : renderIcon(iconClosed)}
        <span className="expandable-section-title">{title}</span>
      </div>
      {isOpen && <div className="expandable-section-content">{children}</div>}
    </section>
  );
}
