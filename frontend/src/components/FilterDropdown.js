import React, { useEffect } from 'react';
import Portal from './Portal';
import usePopoverPosition from '../hooks/usePopoverPosition';
import '../styles/filterDropdown.css';

/**
 * FilterDropdown component - Glassmorphic dropdown for filtering and sorting
 *
 * @param {Object} props
 * @param {Array} props.showOptions - Radio button options for "Show" section
 * @param {string} props.selectedShow - Currently selected show option
 * @param {Function} props.onShowChange - Callback when show selection changes
 * @param {Array} props.sortOptions - Sort field options
 * @param {string} props.selectedSort - Currently selected sort field
 * @param {string} props.sortDirection - Current sort direction ('asc' or 'desc')
 * @param {Function} props.onSortChange - Callback when sort field changes
 * @param {Function} props.onDirectionToggle - Callback to toggle sort direction
 * @param {boolean} props.isOpen - Whether dropdown is open
 * @param {Function} props.onClose - Callback to close dropdown
 * @param {React.RefObject} props.buttonRef - Ref to the filter button
 */
function FilterDropdown({
  showOptions = [],
  selectedShow = null,
  onShowChange,
  sortOptions = [],
  selectedSort = null,
  sortDirection = 'desc',
  onSortChange,
  onDirectionToggle,
  isOpen,
  onClose,
  buttonRef
}) {
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
            {/* Show Section - only if showOptions provided */}
            {showOptions.length > 0 && (
              <>
                <div className="filter-group-header">Show</div>
                {showOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`filter-option ${selectedShow === option.id ? 'selected' : ''}`}
                    onClick={() => onShowChange(option.id)}
                  >
                    <span className="filter-option-label">{option.label}</span>
                    {selectedShow === option.id && (
                      <span className="material-symbols-outlined filter-check">check</span>
                    )}
                  </button>
                ))}

                {/* Divider - only if both sections present */}
                {sortOptions.length > 0 && <div className="filter-divider" />}
              </>
            )}

            {/* Sort Section */}
            {sortOptions.length > 0 && (
              <>
                <div className="filter-group-header">Sort By</div>
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`filter-option filter-sort-option ${selectedSort === option.id ? 'selected' : ''}`}
                    onClick={() => onSortChange(option.id)}
                  >
                    <span className="filter-option-label">{option.label}</span>
                    {selectedSort === option.id && (
                      <button
                        className="filter-direction-toggle"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDirectionToggle();
                        }}
                        title={sortDirection === 'desc' ? 'Descending - click to reverse' : 'Ascending - click to reverse'}
                      >
                        <span className="material-symbols-outlined">
                          {sortDirection === 'desc' ? 'arrow_downward' : 'arrow_upward'}
                        </span>
                      </button>
                    )}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default FilterDropdown;
