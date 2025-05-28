import React from 'react';
import './././bulletList.css';

export const BulletList = ({ title, items, className = '' }) => {
  return (
    <section className={`bullet-list-section rtl ${className}`}>
      {title && <h3 className="bullet-list-title">{title}</h3>}
      <ul className="bullet-list">
        {items.map((item, i) => (
          <li key={i}>
            <img
              src="/assets/list-bullet.svg"
              alt="list bullet"
              className="bullet-icon"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
