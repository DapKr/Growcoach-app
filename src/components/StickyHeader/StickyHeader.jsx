import React, { useEffect, useState } from 'react';
import './././stickyHeader.css';

export default function StickyHeader() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logoSrc = isMobile
    ? '/assets/logo_horizontal_small.png'
    : '/assets/logohorizontal.png';

  return (
    <header className="sticky-header">
      <div className="logo-container">
        <img className="logo" src={logoSrc} alt="GrowCoach logo" />
      </div>
      <nav className="nav-links">
        <a href="/coach" className="focused">
          מדריכים
        </a>
        <a href="/contact">צור קשר</a>
      </nav>
    </header>
  );
}
