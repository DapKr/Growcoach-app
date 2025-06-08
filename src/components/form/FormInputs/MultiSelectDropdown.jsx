import React, { useState, useEffect, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import CTAButton from '../../CTAButton/CTAButton';
import DismissibleChip from '../../Chips/DismissibleChip';
import TextButton from '../../TextButton/TextButton';
import './formInputs.css';
import ReactDOM from 'react-dom';
import { ReactComponent as ArrowDownSmallIcon } from '../../../icons/arrow-down-small.svg';
// Simple checkbox component for the menu options
const MenuCheckbox = ({ label, checked, onChange }) => (
  <div className="checkbox-line">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="menu-checkbox custom-checkbox"
    />
    <label className="form-checkbox-label">{label}</label>
  </div>
);

const MenuOption = ({ option, isSelected, onClick }) => (
  <div
    className={`menu-option ${isSelected ? 'selected' : ''}`}
    onClick={onClick}
  >
    <MenuCheckbox
      label={option.label}
      checked={isSelected}
      onChange={onClick}
    />
  </div>
);

const CustomDropdownMenu = ({
  options,
  tempSelection,
  setTempSelection,
  onClose,
  onCancel,
  searchText,
}) => {
  const menuRef = useRef(null);

  const handleOptionClick = (value) => {
    if (tempSelection.includes(value)) {
      setTempSelection(tempSelection.filter((v) => v !== value));
    } else {
      setTempSelection([...tempSelection, value]);
    }
  };

  const filteredOptions = options
    .map((group) => ({
      ...group,
      options: group.options.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      ),
    }))
    .filter((group) => group.options.length > 0);

  return (
    <div className="custom-dropdown-menu">
      <div className="menu-list" ref={menuRef}>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((group) => (
            <div key={group.label} className="option-group">
              <div className="group-header">{group.label}</div>
              <div className="group-options">
                {group.options.map((option) => (
                  <MenuOption
                    key={option.value}
                    option={option}
                    isSelected={tempSelection.includes(option.value)}
                    onClick={() => handleOptionClick(option.value)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results-wrapper">
            <div className="no-results-header">לא נמצאו תוצאות</div>
            <div className="no-results-message">
              שווה לבדוק אם יש טעות כתיב או לנסות ניסוח אחר.
            </div>
          </div>
        )}
      </div>
      <div className="menu-actions">
        <CTAButton onClick={onClose} size="small">
          הוספה
        </CTAButton>
        <TextButton onClick={onCancel}>ביטול</TextButton>
      </div>
    </div>
  );
};

export default function MultiSelectDropdown({
  name,
  label,
  options,
  required = false,
  filterOption,
}) {
  const { control } = useFormContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const tagsContainerRef = useRef(null);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const controlRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [searchText, setSearchText] = useState('');

  const transformedOptions = options.map((group) => ({
    label: group.label,
    options: group.options.map((opt) => ({
      value: opt.value,
      label: opt.label,
    })),
  }));

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [],
    rules: {
      validate: (val) =>
        required && (!val || val.length === 0)
          ? 'יש לבחור לפחות אפשרות אחת'
          : true,
    },
  });

  const [tempSelection, setTempSelection] = useState(value || []);

  const updateMenuPosition = () => {
    if (controlRef.current) {
      const rect = controlRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  // Update position when menu opens and on scroll/resize
  useEffect(() => {
    if (menuIsOpen) {
      updateMenuPosition();

      // Use both window scroll and document scroll events
      const handleScroll = () => {
        requestAnimationFrame(updateMenuPosition);
      };

      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);
      document.addEventListener('scroll', handleScroll, true);

      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleScroll);
        document.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [menuIsOpen]);

  useEffect(() => {
    if (!menuIsOpen) {
      setTempSelection(value || []);
    }
  }, [value, menuIsOpen]);

  useEffect(() => {
    if (tagsContainerRef.current) {
      const container = tagsContainerRef.current;
      const hasOverflow = container.scrollHeight > 32;
      setShowExpandButton(hasOverflow);
    }
  }, [value, isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuIsOpen &&
        controlRef.current &&
        !controlRef.current.contains(event.target) &&
        !event.target.closest('.custom-dropdown-menu')
      ) {
        onChange(tempSelection);
        setMenuIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuIsOpen, tempSelection, onChange]);

  useEffect(() => {
    if (!menuIsOpen) {
      setSearchText('');
    }
  }, [menuIsOpen]);

  const handleClearAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onChange([]);
    setTempSelection([]);
    setMenuIsOpen(false);
  };

  const handleRemoveValue = (valueToRemove) => {
    const newValue = value.filter((val) => val !== valueToRemove);
    onChange(newValue);
    setTempSelection(newValue);
  };

  const handleMenuClose = () => {
    onChange(tempSelection);
    setMenuIsOpen(false);
  };

  const handleMenuCancel = () => {
    setTempSelection(value || []);
    setMenuIsOpen(false);
  };

  const handleInputChange = (e) => {
    e.stopPropagation();
    setSearchText(e.target.value);
  };

  // Build a value-to-label map for all options
  const valueToLabel = React.useMemo(() => {
    const map = {};
    options.forEach((group) => {
      group.options.forEach((opt) => {
        map[opt.value] = opt.label;
      });
    });
    return map;
  }, [options]);

  // Portal rendering for dropdown menu
  const menuPortal =
    menuIsOpen &&
    ReactDOM.createPortal(
      <div
        className="menu-portal"
        style={{
          position: 'fixed',
          top: `${menuPosition.top}px`,
          left: `${menuPosition.left}px`,
          width: `${menuPosition.width}px`,
          zIndex: 9999,
        }}
      >
        <CustomDropdownMenu
          options={transformedOptions}
          tempSelection={tempSelection}
          setTempSelection={setTempSelection}
          onClose={handleMenuClose}
          onCancel={handleMenuCancel}
          searchText={searchText}
        />
      </div>,
      document.body
    );

  return (
    <div
      className={`form-input-wrapper ${error ? 'has-error' : ''}`}
      dir="rtl"
      style={{ position: 'relative' }}
    >
      {label && (
        <label className="form-field-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}

      <div
        ref={controlRef}
        className={`select-control ${menuIsOpen ? 'menu-open' : ''}`}
        onClick={() => !menuIsOpen && setMenuIsOpen(true)}
      >
        <input
          type="text"
          className="select-input"
          placeholder={
            value?.length > 0 ? `${value.length} נבחרו` : 'בחר/י מהרשימה...'
          }
          value={menuIsOpen ? searchText : ''}
          onChange={handleInputChange}
          onFocus={() => !menuIsOpen && setMenuIsOpen(true)}
          readOnly={!menuIsOpen}
        />
        <div className="select-indicators">
          {value?.length > 0 && (
            <TextButton onClick={handleClearAll} tabIndex={-1}>
              נקה בחירה
            </TextButton>
          )}
          <ArrowDownSmallIcon className="dropdown-indicator" />
        </div>
      </div>

      {menuPortal}

      {value?.length > 0 && (
        <div
          className={`tags-container ${isExpanded ? 'expanded' : ''}`}
          ref={tagsContainerRef}
        >
          <div className="tags-wrapper">
            {value.map((val) => (
              <DismissibleChip
                key={val}
                label={valueToLabel[val] || val}
                onDismiss={() => handleRemoveValue(val)}
              />
            ))}
          </div>
          {showExpandButton && (
            <TextButton
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? 'פחות' : 'עוד'}
            </TextButton>
          )}
        </div>
      )}

      {error && <div className="form-error-text">{error.message}</div>}
    </div>
  );
}
