import React, { useEffect, useState, useRef } from 'react';
import './././stickyHeader.css';
import avatarPlaceholder from '../../icons/avatar-placeholder.svg';

export default function StickyHeader({ profile, onProfileClick }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [imgSrc, setImgSrc] = useState(
    profile && profile.photo ? profile.photo : avatarPlaceholder
  );
  const prevProfilePhoto = useRef(profile ? profile.photo : null);

  useEffect(() => {
    // Update image source if profile or photo changes
    if (profile && profile.photo !== prevProfilePhoto.current) {
      setImgSrc(profile.photo ? profile.photo : avatarPlaceholder);
      prevProfilePhoto.current = profile.photo;
    }
  }, [profile]);

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
      {!profile && (
        <nav className="nav-links">
          <a href="/coach" className="focused">
            מדריכים
          </a>
          <a href="/contact">צור קשר</a>
        </nav>
      )}
      {profile && (
        <div className="profile-area" onClick={onProfileClick}>
          <img
            src={imgSrc}
            alt="profile"
            className="profile-avatar"
            onError={() => setImgSrc(avatarPlaceholder)}
          />
          <span className="profile-hello">
            היי, <br /> {profile.name}
          </span>
        </div>
      )}
    </header>
  );
}
