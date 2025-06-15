import React, { useState } from 'react';
import StickyHeader from '../components/StickyHeader/StickyHeader';
import TextButton from '../components/TextButton/TextButton';
import MessageList from '../components/messages/MessageList';
import ExpandableSectionBox from '../components/ExpandableSectionBox/ExpandableSectionBox';
import { ReactComponent as ArrowLeftSmallIcon } from '../icons/arrow-left-small.svg';
import { ReactComponent as ArrowDownSmallIcon } from '../icons/arrow-down-small.svg';
import '../components/StickyHeader/stickyHeader.css';
import '../styles/dashboard.css';
import Snackbar from '../components/snackbar/snackbar';
import '../components/snackbar/snackbar.css';
import CTAButton from '../components/CTAButton/CTAButton';

export default function CoachDashboard() {
  // State for collapsible sections
  const [inboxOpen, setInboxOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(true);
  const [showAccount, setShowAccount] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trash, setTrash] = useState([]);
  const [showTrash, setShowTrash] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    actionLabel: '',
    onAction: null,
  });
  const [pendingDelete, setPendingDelete] = useState([]); // for undo
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

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
    {
      id: 4,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 5,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 6,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 7,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 8,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 9,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 10,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 11,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 12,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 13,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 14,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 15,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 16,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 17,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 18,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 19,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 20,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    {
      id: 21,
      sender: 'דנה ג',
      subject: 'יועץ על גמילה',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
      flagged: false,
    },
    // ...add more mock messages as needed
  ]);

  // Calculate unread messages count
  const unreadCount = messages.filter((msg) => !msg.read).length;

  // Message actions
  const handleSelect = (msgOrAll, checked, pageIds = []) => {
    if (msgOrAll === 'all') {
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
    if (action === 'delete') {
      handleDelete(ids);
      return;
    }
    setMessages((msgs) => {
      if (action === 'read') {
        const anyUnread = msgs.some((msg) => ids.includes(msg.id) && !msg.read);
        return msgs.map((msg) =>
          ids.includes(msg.id)
            ? { ...msg, read: anyUnread ? true : false }
            : msg
        );
      } else if (action === 'flag') {
        const anyUnflagged = msgs.some(
          (msg) => ids.includes(msg.id) && !msg.flagged
        );
        return msgs.map((msg) =>
          ids.includes(msg.id)
            ? { ...msg, flagged: anyUnflagged ? true : false }
            : msg
        );
      }
      return msgs;
    });
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

  // Trash logic
  const handleDelete = (ids) => {
    const toTrash = messages.filter((msg) => ids.includes(msg.id));
    setTrash((prev) => [...prev, ...toTrash]);
    setMessages((msgs) => msgs.filter((msg) => !ids.includes(msg.id)));
    setPendingDelete(toTrash);
    setSnackbar({
      open: true,
      message: 'ההודעה נמחקה',
      actionLabel: 'בטל',
      onAction: handleUndoDelete,
    });
  };

  const handleUndoDelete = () => {
    setMessages((msgs) => [...msgs, ...pendingDelete]);
    setTrash((prev) =>
      prev.filter((msg) => !pendingDelete.some((d) => d.id === msg.id))
    );
    setPendingDelete([]);
    setSnackbar({ open: false });
  };

  const handlePermanentDelete = (ids) => {
    setTrash((prev) => prev.filter((msg) => !ids.includes(msg.id)));
    setSnackbar({
      open: true,
      message: 'ההודעה נמחקה לצמיתות',
      actionLabel: '',
      onAction: null,
    });
  };

  const handleEmptyTrash = () => {
    setTrash([]);
    setSnackbar({
      open: true,
      message: 'כל ההודעות באשפה נמחקו לצמיתות',
      actionLabel: '',
      onAction: null,
    });
  };

  // Confirmation dialog logic
  const openConfirm = (action) => {
    setConfirmAction(() => action);
    setShowConfirm(true);
  };
  const closeConfirm = () => {
    setShowConfirm(false);
    setConfirmAction(null);
  };
  const confirm = () => {
    if (confirmAction) confirmAction();
    closeConfirm();
  };

  // Restore logic: insert messages in chronological order
  const handleRestore = (ids) => {
    const toRestore = trash.filter((msg) => ids.includes(msg.id));
    setTrash((prev) => prev.filter((msg) => !ids.includes(msg.id)));
    setMessages((msgs) => {
      const combined = [...msgs, ...toRestore];
      // Sort by date descending (newest first)
      return combined.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    setSnackbar({
      open: true,
      message: 'ההודעה שוחזרה',
      actionLabel: '',
      onAction: null,
    });
  };

  // When switching between inbox/trash, always expand the section and reset page
  const handleToggleTrash = () => {
    setInboxOpen(true);
    setPage(1);
    setShowTrash((v) => !v);
  };

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

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        actionLabel={snackbar.actionLabel}
        onAction={snackbar.onAction}
        onClose={() => setSnackbar({ open: false })}
      />
      {showConfirm && (
        <div className="confirm-dialog-overlay">
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-title">בטוח?</div>
            <div className="dialog-message">ההודעות יימחקו לצמיתות</div>
            <div className="dialog-actions">
              <CTAButton size="small" variant="danger" onClick={confirm}>
                מחק
              </CTAButton>
              <TextButton color="primary" onClick={closeConfirm}>
                ביטול
              </TextButton>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-container">
        {/* Inbox Section */}
        <ExpandableSectionBox
          title={
            showTrash
              ? `הודעות- אשפה (${trash.length})`
              : unreadCount > 0
                ? `הודעות (${unreadCount})`
                : 'הודעות'
          }
          isOpen={inboxOpen}
          onToggle={() => setInboxOpen(true)}
          iconOpen={<ArrowDownSmallIcon />}
          iconClosed={<ArrowLeftSmallIcon />}
        >
          <MessageList
            messages={
              showTrash
                ? [...trash].sort((a, b) => new Date(b.date) - new Date(a.date))
                : [...messages].sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                  )
            }
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onBatchAction={
              showTrash
                ? (action, ids) => {
                    if (action === 'delete')
                      openConfirm(() => handlePermanentDelete(ids));
                    if (action === 'restore') handleRestore(ids);
                  }
                : handleBatchAction
            }
            onRefresh={handleRefresh}
            onMessageClick={handleMessageClick}
            onMessageAction={
              showTrash
                ? undefined
                : (action, msg) => {
                    if (action === 'delete') handleDelete([msg.id]);
                    else handleMessageAction(action, msg);
                  }
            }
            page={page}
            setPage={setPage}
            loading={loading}
            pageSize={pageSize}
            mode={showTrash ? 'trash' : 'inbox'}
            onRestore={showTrash ? handleRestore : undefined}
            onEmptyTrash={
              showTrash
                ? () => openConfirm(() => handleEmptyTrash())
                : undefined
            }
            onToggleTrash={handleToggleTrash}
            trashCount={trash.length}
          />
        </ExpandableSectionBox>

        {/* Profile Preview Section */}
        <ExpandableSectionBox
          title="פרטי פרופיל"
          isOpen={profileOpen}
          onToggle={() => setProfileOpen((open) => !open)}
          iconOpen={<ArrowDownSmallIcon />}
          iconClosed={<ArrowLeftSmallIcon />}
        >
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
        </ExpandableSectionBox>
      </div>
    </div>
  );
}
