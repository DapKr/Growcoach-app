import React, { useState } from 'react';
import StickyHeader from '../components/StickyHeader/StickyHeader';
import TextButton from '../components/TextButton/TextButton';
import MessageList from '../components/messages/MessageList';
import { ReactComponent as ArrowLeftSmallIcon } from '../icons/arrow-left-small.svg';
import { ReactComponent as ArrowDownSmallIcon } from '../icons/arrow-down-small.svg';
import '../components/StickyHeader/stickyHeader.css';
import '../styles/dashboard.css';

export default function CoachDashboard() {
  // State for collapsible sections
  const [inboxOpen, setInboxOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(true);
  const [showAccount, setShowAccount] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'מאיה א',
      subject: 'יועצת לשינה לתינוקת בת שנה וחצי',
      date: new Date().toISOString(),
      read: false,
      flagged: false,
    },
    {
      id: 2,
      sender: 'תמר ב',
      subject: 'שאלות על שינה של ילדה בת שנתיים',
      date: new Date(Date.now() - 86400000).toISOString(), // yesterday
      read: false,
      flagged: true,
    },
    {
      id: 3,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    // ...add more mock messages as needed
  ]);

  // Message actions
  const handleSelect = (msgOrAll, checked) => {
    if (msgOrAll === 'all') {
      // Select all on current page
      const pageIds = pagedMessages().map((m) => m.id);
      setSelectedIds(
        checked
          ? Array.from(new Set([...selectedIds, ...pageIds]))
          : selectedIds.filter((id) => !pageIds.includes(id))
      );
    } else {
      setSelectedIds((ids) =>
        checked ? [...ids, msgOrAll.id] : ids.filter((id) => id !== msgOrAll.id)
      );
    }
  };

  const handleBatchAction = (action, ids) => {
    setMessages((msgs) =>
      msgs
        .map((msg) =>
          ids.includes(msg.id)
            ? action === 'read'
              ? { ...msg, read: !msg.read }
              : action === 'flag'
                ? { ...msg, flagged: !msg.flagged }
                : action === 'delete'
                  ? null
                  : msg
            : msg
        )
        .filter(Boolean)
    );
    setSelectedIds([]);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800); // Simulate refresh
  };

  const handleMessageClick = (msg) => {
    setSelectedMessage(msg);
    // You can show a modal or navigate to a message view here
  };

  const handleMessageAction = (action, msg) => {
    setMessages((msgs) =>
      msgs
        .map((m) =>
          m.id === msg.id
            ? action === 'read'
              ? { ...m, read: !m.read }
              : action === 'flag'
                ? { ...m, flagged: !m.flagged }
                : action === 'delete'
                  ? null
                  : m
            : m
        )
        .filter(Boolean)
    );
    if (
      action === 'delete' &&
      selectedMessage &&
      selectedMessage.id === msg.id
    ) {
      setSelectedMessage(null);
    }
  };

  // Helper to get paged messages for selection
  const pagedMessages = () => {
    const PAGE_SIZE = 20;
    const startIdx = (page - 1) * PAGE_SIZE;
    const endIdx = Math.min(startIdx + PAGE_SIZE, messages.length);
    return messages.slice(startIdx, endIdx);
  };

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
        <div className="dashboard-section">
          <div
            className="dashboard-section-header"
            onClick={() => setInboxOpen((open) => !open)}
          >
            {inboxOpen ? <ArrowDownSmallIcon /> : <ArrowLeftSmallIcon />}
            <span className="dashboard-section-title">הודעות</span>
          </div>
          {inboxOpen && (
            <div className="dashboard-section-content">
              <MessageList
                messages={messages}
                selectedIds={selectedIds}
                onSelect={handleSelect}
                onBatchAction={handleBatchAction}
                onRefresh={handleRefresh}
                onMessageClick={handleMessageClick}
                onMessageAction={handleMessageAction}
                page={page}
                setPage={setPage}
                loading={loading}
              />
            </div>
          )}
        </div>

        {/* Profile Preview Section */}
        <div className="dashboard-section">
          <div
            className="dashboard-section-header"
            onClick={() => setProfileOpen((open) => !open)}
          >
            {profileOpen ? <ArrowDownSmallIcon /> : <ArrowLeftSmallIcon />}
            <span className="dashboard-section-title">פרטי פרופיל</span>
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
        </div>
      </div>
    </div>
  );
}
