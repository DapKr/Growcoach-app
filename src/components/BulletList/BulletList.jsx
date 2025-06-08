import React from 'react';
import './././bulletList.css';
import { ReactComponent as ListBulletIcon } from '../../icons/list-bullet.svg';
export const BulletList = ({ title, items, className = '' }) => {
  return (
    <section className={`bullet-list-section rtl ${className}`}>
      {title && <h3 className="bullet-list-title">{title}</h3>}
      <ul className="bullet-list">
        {items.map((item, i) => (
          <li key={i}>
            <ListBulletIcon className="list-bullet-icon" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
