import React, { useEffect } from 'react';
import Portal from './Portal';
import usePopoverPosition from '../hooks/usePopoverPosition';
import '../styles/filterDropdown.css';

/**
 * FilterDropdown component - Glassmorphic dropdown for filtering content
 *
 * @param {Object} props
 * @param {Array} props.options - Array of filter option objects: { id, label, type: 'radio'|'checkbox' }
 * @param {string|Array} props.selected - Currently selected option(s)
 * @param {Function} props.onChange - Callback when selection changes
 * @param {boolean} props.isOpen - Whether dropdown is open
 * @param {Function} props.onClose - Callback to close dropdown
 * @param {React.RefObject} props.buttonRef - Ref to the filter button (to exclude from outside clicks)
 */
function FilterDropdown({ options = [], selected = null, onChange, isOpen, onClose, buttonRef }) {
  const { panelRef, style } = usePopoverPosition({
    anchorRef: buttonRef,
    open: isOpen,
    placement: 'bottom-end',
    offset: 8,
    viewportMargin: 8,
    minWidth: 'anchor',
  });

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOptionClick = (optionId) => {
    onChange(optionId);
  };

  return (
    <Portal>
      <div
        className="ffl-overlay"
        onMouseDown={onClose}
      >
        <div
          className="filter-dropdown filter-dropdown-popover"
          ref={panelRef}
          onMouseDown={(e) => e.stopPropagation()}
          style={{ top: style.top, left: style.left, minWidth: style.minWidth }}
        >
          <div className="filter-dropdown-content">
            {options.map((option) => (
              <button
                key={option.id}
                className={`filter-option ${selected === option.id ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option.id)}
              >
                <span className="filter-option-label">{option.label}</span>
                {selected === option.id && (
                  <span className="material-symbols-outlined filter-check">check</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default FilterDropdown;
