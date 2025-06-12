import React from 'react';

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
      className: 'dashboard-section-icon',
    });
  };

  return (
    <section className={`dashboard-section ${className}`}>
      <div className="dashboard-section-header" onClick={onToggle}>
        {isOpen ? renderIcon(iconOpen) : renderIcon(iconClosed)}
        <span className="dashboard-section-title">{title}</span>
      </div>
      {isOpen && <div className="dashboard-section-content">{children}</div>}
    </section>
  );
}
