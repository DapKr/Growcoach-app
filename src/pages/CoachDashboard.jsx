import React, { useState } from 'react';
import StickyHeader from '../components/StickyHeader/StickyHeader';
import TextButton from '../components/TextButton/TextButton';
import '../components/StickyHeader/stickyHeader.css';
import '../styles/dashboard.css';

export default function CoachDashboard() {
  // State for collapsible sections
  const [inboxOpen, setInboxOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(true);
  const [showAccount, setShowAccount] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Mock messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'הורה: אלה ר',
      subject: 'התייעצות שינה לילד בן שנתיים',
      date: '14/05/2025',
      content:
        'שלום, אשמח להתייעץ לגבי שינה לילד בן שנתיים. האם אפשר לקבוע שיחה?',
      read: false,
      flagged: false,
    },
    {
      id: 2,
      sender: 'הורה: דנה ל',
      subject: 'הדרכת הורים',
      date: '01/05/2025',
      content: 'היי, אשמח לשמוע על תהליך ההדרכה שלך. תודה!',
      read: true,
      flagged: false,
    },
  ]);

  // Mock profile data
  const profile = {
    verified: false,
    name: 'מיכל כביר',
    photo: '/assets/profile-michal.jpg',
    about:
      'אני אמא לשלושה, מלווה הורים לילדים בגיל הרך כבר מעל 7 שנים. הסגנון שלי רגוע, רגיש, ובננה סביב תקשורת מקרבת שמכבדת את הילד וההורה. אני מאמינה שהתהליך עובר דרך ההורה – לא רק דרך הילד – והתמדה עדינה עושה את ההבדל.',
    expertise: ['שינה', 'גבולות בגיל הרך', 'קשיים במעבר גיל הרך'],
    approach: ['גישה התפתחותית', 'גישה קוגניטיבית-התנהגותית (CBT)'],
    years_experience: 7,
    meeting_types: ['אונליין', 'סדנאות קבוצתיות'],
    recommendations: [
      {
        name: 'אלה ר',
        date: '14/05/2025',
        type: 'ליווי שינה',
        content:
          'מיכל נכנסה אלינו בגישה רגועה, ראתה אותנו והכילה בעדינות. הילדה נרדמת לבד ואנחנו סוף סוף נחים.',
      },
      {
        name: 'דנה ל',
        date: '01/03/2025',
        type: 'הדרכת הורים',
        content:
          'היה לנו חשוב שמישהו יוכל לדבר עם הילד וגם עם השפעת. היא שינתה לנו את האווירה.',
      },
    ],
    children_ages: 'גיל הרך – שנה עד 6 שנים',
    location: 'הרצליה',
    can_edit: true,
  };

  // Message actions
  const handleMarkRead = (id, read) => {
    setMessages((msgs) =>
      msgs.map((msg) => (msg.id === id ? { ...msg, read } : msg))
    );
  };
  const handleDelete = (id) => {
    setMessages((msgs) => msgs.filter((msg) => msg.id !== id));
    if (selectedMessage && selectedMessage.id === id) setSelectedMessage(null);
  };
  const handleFlag = (id) => {
    setMessages((msgs) =>
      msgs.map((msg) =>
        msg.id === id ? { ...msg, flagged: !msg.flagged } : msg
      )
    );
  };

  // Account settings modal (placeholder)
  const AccountModal = () => (
    <div
      className="account-modal-overlay"
      onClick={() => setShowAccount(false)}
    >
      <div className="account-modal" onClick={(e) => e.stopPropagation()}>
        <h2>הגדרות חשבון</h2>
        <p>כאן תוכל לערוך את פרטי החשבון שלך (מייל, סיסמה, תמונה וכו&apos;).</p>
        <TextButton color="primary" onClick={() => setShowAccount(false)}>
          סגור
        </TextButton>
      </div>
    </div>
  );

  return (
    <div>
      {/* StickyHeader with profile/account area */}
      <StickyHeader>
        <div className="profile-area" onClick={() => setShowAccount(true)}>
          <img src={profile.photo} alt="profile" className="profile-avatar" />
          <span className="profile-hello">היי, משתמש</span>
        </div>
      </StickyHeader>
      {showAccount && <AccountModal />}

      <div className="dashboard-container">
        {/* Inbox Section */}
        <section className="dashboard-section">
          <div
            className="dashboard-section-header"
            onClick={() => setInboxOpen((open) => !open)}
          >
            <span className="dashboard-section-title">הודעות</span>
            <span>{inboxOpen ? '▲' : '▼'}</span>
          </div>
          {inboxOpen && (
            <div className="dashboard-section-content">
              {messages.length === 0 ? (
                <div className="dashboard-empty">אין הודעות בתיבה.</div>
              ) : (
                <ul className="dashboard-message-list">
                  {messages.map((msg) => (
                    <li
                      key={msg.id}
                      className={`dashboard-message-item${selectedMessage && selectedMessage.id === msg.id ? ' selected' : ''}${msg.read ? ' read' : ' unread'}`}
                      onClick={() => setSelectedMessage(msg)}
                    >
                      <div className="dashboard-message-info">
                        <span className="dashboard-message-sender">
                          {msg.sender}
                        </span>
                        <span className="dashboard-message-subject">
                          {msg.subject}
                        </span>
                        <span className="dashboard-message-date">
                          {msg.date}
                        </span>
                        {msg.flagged && (
                          <span className="dashboard-message-flag">⚑</span>
                        )}
                      </div>
                      <div className="dashboard-message-actions">
                        <TextButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkRead(msg.id, !msg.read);
                          }}
                        >
                          {msg.read ? 'סמן כלא נקרא' : 'סמן כנקרא'}
                        </TextButton>
                        <TextButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFlag(msg.id);
                          }}
                        >
                          {msg.flagged ? 'בטל דגל' : 'סמן כדגל'}
                        </TextButton>
                        <TextButton
                          size="small"
                          color="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(msg.id);
                          }}
                        >
                          מחק
                        </TextButton>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {selectedMessage && (
                <div className="dashboard-message-detail">
                  <div className="dashboard-message-detail-sender">
                    {selectedMessage.sender}
                  </div>
                  <div className="dashboard-message-detail-meta">
                    {selectedMessage.subject} | {selectedMessage.date}
                  </div>
                  <div className="dashboard-message-detail-content">
                    {selectedMessage.content}
                  </div>
                  <div className="dashboard-message-detail-close">
                    <TextButton onClick={() => setSelectedMessage(null)}>
                      סגור
                    </TextButton>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Profile Preview Section */}
        <section className="dashboard-section">
          <div
            className="dashboard-section-header"
            onClick={() => setProfileOpen((open) => !open)}
          >
            <span className="dashboard-section-title">פרטי פרופיל</span>
            <span>{profileOpen ? '▲' : '▼'}</span>
          </div>
          {profileOpen && (
            <div className="dashboard-section-content">
              <div className="profile-header">
                <img
                  className="profile-photo"
                  src={profile.photo}
                  alt={profile.name}
                />
                <div className="profile-header-info">
                  <h2 className="profile-name">{profile.name}</h2>
                  <div className="profile-meta-row">
                    <span className="profile-meta-label">תחומי התמחות:</span>{' '}
                    {profile.expertise.join(', ')}
                  </div>
                  <div className="profile-meta-row">
                    <span className="profile-meta-label">שנות נסיון:</span>{' '}
                    {profile.years_experience} שנים
                  </div>
                  <div className="profile-meta-row">
                    <span className="profile-meta-label">גישה טיפולית:</span>{' '}
                    {profile.approach.join(', ')}
                  </div>
                  <div className="profile-meta-row">
                    <span className="profile-meta-label">סוגי מפגש:</span>{' '}
                    {profile.meeting_types.join(', ')}
                  </div>
                  <div className="profile-meta-row">
                    <span className="profile-meta-label">גילאי ילדים:</span>{' '}
                    {profile.children_ages}
                  </div>
                  <div className="profile-meta-row">
                    <span className="profile-meta-label">אזור:</span>{' '}
                    {profile.location}
                  </div>
                </div>
              </div>
              <div className="profile-about-section">
                <h3 className="profile-section-title">על עצמי</h3>
                <div className="profile-about-text">{profile.about}</div>
              </div>
              <div className="profile-recommendations-section">
                <h3 className="profile-section-title">
                  המלצות ({profile.recommendations.length})
                </h3>
                {profile.recommendations.map((rec, idx) => (
                  <div className="profile-recommendation" key={idx}>
                    <div className="profile-recommendation-header">
                      <span className="profile-recommendation-name">
                        {rec.name}
                      </span>
                      <span className="profile-recommendation-date">
                        {rec.date}
                      </span>
                      <span className="profile-recommendation-type">
                        {rec.type}
                      </span>
                    </div>
                    <div className="profile-recommendation-content">
                      {rec.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="profile-edit-actions">
                <TextButton color="primary">עריכת פרופיל</TextButton>
                <TextButton color="danger">הסתר פרופיל</TextButton>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
