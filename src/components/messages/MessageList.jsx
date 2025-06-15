import React, { useMemo, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MessageListItem from './MessageListItem';
import { ReactComponent as EmailReadIcon } from '../../icons/mark-email-read.svg';
import { ReactComponent as EmailUnreadIcon } from '../../icons/mark-email-unread.svg';
import { ReactComponent as FlagAction } from '../../icons/flag.svg';
import { ReactComponent as Delete } from '../../icons/delete.svg';
import { ReactComponent as Refresh } from '../../icons/refresh.svg';
import { ReactComponent as ArrowLeftIcon } from '../../icons/arrow-left-large.svg';
import { ReactComponent as ArrowRightIcon } from '../../icons/arrow-right-large.svg';
import { ReactComponent as RestoreIcon } from '../../icons/restore.svg';
import TextButton from '../TextButton/TextButton';
import './messages.css';

// Icons (replace with your SVGs or icon components as needed)
const RefreshIcon = () => (
  <Refresh className="header-action-icon" title="רענן" />
);
const ReadIcon = () => (
  <EmailReadIcon className="header-action-icon" title="סמן כנקרא" />
);
const UnreadIcon = () => (
  <EmailUnreadIcon className="header-action-icon" title="סמן כלא נקרא" />
);
const FlagIcon = () => (
  <FlagAction className="header-action-icon" title="סמן כדגל" />
);
const DeleteIcon = () => <Delete className="header-action-icon" title="מחק" />;
const Restore = () => (
  <RestoreIcon className="header-action-icon" title="שחזר" />
);
const ArrowLeft = () => (
  <ArrowLeftIcon className="header-action-icon" title="הבא" />
);
const ArrowRight = () => (
  <ArrowRightIcon className="header-action-icon" title="הקודם" />
);

export default function MessageList({
  messages = [],
  selectedIds = [],
  onSelect,
  onBatchAction,
  onRefresh,
  onMessageClick,
  onMessageAction,
  page = 1,
  setPage,
  loading = false,
  pageSize = 20,
  mode = 'inbox', // 'inbox' or 'trash'
  onRestore,
  onEmptyTrash,
  onToggleTrash,
  trashCount = 0,
  ...props
}) {
  // Track hovered message
  const [hoveredId, setHoveredId] = useState(null);

  // Pagination logic
  const total = messages.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, total);
  const pageMessages = useMemo(
    () => messages.slice(startIdx, endIdx),
    [messages, startIdx, endIdx]
  );

  // Selection
  const allSelected =
    pageMessages.length > 0 &&
    pageMessages.every((m) => selectedIds.includes(m.id));
  const anySelected = selectedIds.length > 0;
  const allRead = pageMessages.every((m) => m.read);

  // Indeterminate checkbox handling
  const selectAllRef = useRef(null);
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = anySelected && !allSelected;
    }
  }, [anySelected, allSelected]);

  // When select all is clicked, only select IDs from the current page
  const handleSelectAll = (checked) => {
    const pageIds = pageMessages.map((m) => m.id);
    if (onSelect) onSelect('all', checked, pageIds);
  };

  // Batch actions
  const handleBatch = (action) => {
    if (onBatchAction) onBatchAction(action, selectedIds);
  };

  // Batch restore for trash
  const handleBatchRestore = () => {
    if (onRestore) onRestore(selectedIds);
  };

  // Header
  return (
    <div className="message-list">
      <div
        className="message-list-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="message-list-header-left">
          <input
            type="checkbox"
            className="custom-checkbox"
            ref={selectAllRef}
            checked={allSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          {anySelected ? (
            mode === 'trash' ? (
              <>
                <button
                  className="message-list-header-action"
                  onClick={handleBatchRestore}
                >
                  <Restore />
                </button>
                <button
                  className="message-list-header-action"
                  onClick={() => handleBatch('delete')}
                >
                  <DeleteIcon />
                </button>
              </>
            ) : (
              <>
                <button
                  className="message-list-header-action"
                  onClick={() => handleBatch('read')}
                >
                  {allRead ? <UnreadIcon /> : <ReadIcon />}
                </button>
                <button
                  className="message-list-header-action"
                  onClick={() => handleBatch('flag')}
                >
                  <FlagIcon />
                </button>
                <button
                  className="message-list-header-action"
                  onClick={() => handleBatch('delete')}
                >
                  <DeleteIcon />
                </button>
              </>
            )
          ) : (
            <button
              className="message-list-header-action"
              onClick={onRefresh}
              disabled={loading}
            >
              <RefreshIcon />
            </button>
          )}
        </div>
        <div
          className="message-list-header-pagination-group"
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          {mode === 'trash' ? (
            <>
              <TextButton
                color="primary"
                onClick={onToggleTrash}
                style={{ marginLeft: 12 }}
              >
                חזור להודעות
              </TextButton>
              {onEmptyTrash && (
                <TextButton
                  color="error"
                  onClick={onEmptyTrash}
                  style={{ marginLeft: 12 }}
                >
                  רוקן אשפה
                </TextButton>
              )}
            </>
          ) : (
            <TextButton
              color="primary"
              onClick={onToggleTrash}
              style={{ marginLeft: 12 }}
            >
              מעבר לאשפה{trashCount ? ` (${trashCount})` : ''}
            </TextButton>
          )}
          <span className="message-list-header-pagination">
            {total === 0 ? '0' : `${startIdx + 1}-${endIdx}`} מתוך {total}
          </span>
          <button
            className="message-list-header-pagebtn"
            onClick={() => setPage && setPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowRight />
          </button>
          <button
            className="message-list-header-pagebtn"
            onClick={() => setPage && setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowLeft />
          </button>
        </div>
      </div>
      <div className="message-list-items">
        {pageMessages.map((msg, idx) => (
          <MessageListItem
            key={msg.id}
            message={msg}
            isActive={false}
            isHovered={hoveredId === msg.id}
            isSelected={selectedIds.includes(msg.id)}
            onSelect={(m, checked) => onSelect && onSelect(m, checked)}
            onClick={() => onMessageClick && onMessageClick(msg)}
            onAction={(action, m) =>
              onMessageAction && onMessageAction(action, m)
            }
            showDivider={idx !== pageMessages.length - 1}
            onMouseEnter={() => setHoveredId(msg.id)}
            onMouseLeave={() => setHoveredId(null)}
            mode={mode}
            onRestore={onRestore}
          />
        ))}
        {pageMessages.length === 0 && (
          <div className="message-list-empty">אין הודעות </div>
        )}
      </div>
    </div>
  );
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  selectedIds: PropTypes.array,
  onSelect: PropTypes.func,
  onBatchAction: PropTypes.func,
  onRefresh: PropTypes.func,
  onMessageClick: PropTypes.func,
  onMessageAction: PropTypes.func,
  page: PropTypes.number,
  setPage: PropTypes.func,
  loading: PropTypes.bool,
  pageSize: PropTypes.number,
  mode: PropTypes.oneOf(['inbox', 'trash']),
  onRestore: PropTypes.func,
  onEmptyTrash: PropTypes.func,
  onToggleTrash: PropTypes.func,
  trashCount: PropTypes.number,
};
