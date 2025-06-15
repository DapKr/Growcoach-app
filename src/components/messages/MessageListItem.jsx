import React from 'react';
import PropTypes from 'prop-types';
import './messages.css';
import { ReactComponent as EmailReadIcon } from '../../icons/mark-email-read.svg';
import { ReactComponent as EmailUnreadIcon } from '../../icons/mark-email-unread.svg';
import { ReactComponent as FlagAction } from '../../icons/flag.svg';
import { ReactComponent as FlagMark } from '../../icons/flag-two-tone.svg';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import { ReactComponent as RestoreIcon } from '../../icons/restore.svg';

function formatTimestamp(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  if (isToday) {
    // 24h format
    return date.toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
  // e.g. 2 Jun, 30 Dec
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default function MessageListItem({
  message,
  isActive = false,
  isHovered = false,
  isSelected = false,
  onSelect,
  onClick,
  onAction,
  showDivider = true,
  touchMode = false,
  mode = 'inbox',
  onRestore,
  ...props
}) {
  // Sender name logic
  let sender = message.sender;
  if (message.system) sender = 'GrowCoach';
  else if (sender && sender.includes(' ')) {
    const [first, last] = sender.split(' ');
    sender = `${first} ${last ? last[0] : ''}`;
  }

  // Actions
  const actions =
    mode === 'trash'
      ? [
          {
            key: 'restore',
            icon: <RestoreIcon className="action-icon" />,
            label: 'שחזר',
            onClick: () => onRestore && onRestore([message.id]),
          },
          {
            key: 'delete',
            icon: <DeleteIcon className="action-icon" />,
            label: 'מחק לצמיתות',
            onClick: () => onAction && onAction('delete', message),
          },
        ]
      : [
          {
            key: 'read',
            icon: message.read ? (
              <EmailUnreadIcon className="action-icon" />
            ) : (
              <EmailReadIcon className="action-icon" />
            ),
            label: message.read ? 'סמן כלא נקרא' : 'סמן כנקרא',
            onClick: () => onAction && onAction('read', message),
          },
          {
            key: 'flag',
            icon: <FlagAction className="action-icon" />,
            label: message.flagged ? 'בטל דגל' : 'סמן כדגל',
            onClick: () => onAction && onAction('flag', message),
          },
          {
            key: 'delete',
            icon: <DeleteIcon className="action-icon" />,
            label: 'מחק',
            onClick: () => onAction && onAction('delete', message),
          },
        ];

  // States
  const rootClass = [
    'message-list-item',
    message.read ? 'read' : 'unread',
    isActive ? 'active' : '',
    isHovered ? 'hover' : '',
    isSelected ? 'selected' : '',
  ].join(' ');

  return (
    <div
      className={rootClass}
      onClick={() => onClick && onClick(message)}
      tabIndex={0}
      {...props}
    >
      {/* Checkbox for multi-select */}
      <div className="message-list-item-checkbox checkbox-line">
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isSelected}
          onChange={(e) => onSelect && onSelect(message, e.target.checked)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {/* Sender */}
      <div className="message-list-item-sender">{sender}</div>
      {/* Title (truncated) */}
      <div className="message-list-item-title" title={message.subject}>
        {message.subject}
      </div>
      {/* Flag icon (hidden on hover) */}
      {message.flagged && !isHovered && mode !== 'trash' && (
        <div className="message-list-item-flag">
          <FlagMark className="flagged-icon" />
        </div>
      )}
      {/* Timestamp (hidden on hover) */}
      {!isHovered && (
        <div className="message-list-item-timestamp">
          {formatTimestamp(message.date)}
        </div>
      )}

      {/* Actions menu (on hover or always on touch) */}
      {(isHovered || touchMode) && (
        <div className="message-list-item-actions">
          {actions.map((action) => (
            <button
              key={action.key}
              className="message-list-item-action-btn"
              title={action.label}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
            >
              {action.icon}
            </button>
          ))}
        </div>
      )}
      {/* Divider */}
      {showDivider && <div className="message-list-item-divider" />}
    </div>
  );
}

MessageListItem.propTypes = {
  message: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  isHovered: PropTypes.bool,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  onAction: PropTypes.func,
  showDivider: PropTypes.bool,
  touchMode: PropTypes.bool,
  mode: PropTypes.oneOf(['inbox', 'trash']),
  onRestore: PropTypes.func,
};
