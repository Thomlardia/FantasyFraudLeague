import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

/**
 * usePopoverPosition
 * Small hook to position a popover panel relative to an anchor element
 * using viewport-fixed coordinates. It supports basic flipping, clamping
 * within the viewport, and auto-updating on scroll/resize.
 *
 * Example usage:
 *   const { panelRef, style, placement } = usePopoverPosition({
 *     anchorRef: buttonRef,
 *     open: isOpen,
 *     placement: 'bottom-start',
 *     offset: 8,
 *   });
 *   return isOpen && (
 *     <div ref={panelRef} style={{ position: 'fixed', ...style }}>...</div>
 *   );
 */
export function usePopoverPosition({
  anchorRef,
  open,
  placement = 'bottom-start', // 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  offset = 8,
  viewportMargin = 8,
  minWidth = 'anchor', // number | 'anchor'
} = {}) {
  const panelRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, minWidth: 200 });
  const [actualPlacement, setActualPlacement] = useState(placement);

  const clamp = useCallback((val, min, max) => Math.min(Math.max(val, min), max), []);

  const compute = useCallback(() => {
    if (!open) return;
    const anchor = anchorRef?.current;
    if (!anchor) return;

    const r = anchor.getBoundingClientRect();
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const vh = window.innerHeight || document.documentElement.clientHeight;

    const panelEl = panelRef.current;
    const estWidth = panelEl?.offsetWidth || Math.max(200, r.width);
    const estHeight = panelEl?.offsetHeight || 240;

    const desiredMinWidth = typeof minWidth === 'number' ? minWidth : Math.max(200, r.width);

    // Base calculations
    const alignStartLeft = clamp(r.left, viewportMargin, vw - estWidth - viewportMargin);
    const alignEndLeft = clamp(r.right - estWidth, viewportMargin, vw - estWidth - viewportMargin);

    const belowTop = r.bottom + offset;
    const aboveTop = r.top - offset - estHeight;

    // Try desired placement first
    const tryPlacement = (p) => {
      let top, left;
      if (p.startsWith('bottom')) {
        top = belowTop;
      } else {
        top = aboveTop;
      }

      if (p.endsWith('start')) {
        left = alignStartLeft;
      } else {
        left = alignEndLeft;
      }

      // Clamp vertical within viewport if needed
      top = clamp(top, viewportMargin, vh - estHeight - viewportMargin);
      return { top, left };
    };

    // Check if desired placement fits; otherwise flip vertically
    const fitsBelow = belowTop + estHeight <= vh - viewportMargin;
    const fitsAbove = r.top - offset - viewportMargin >= estHeight;

    let chosen = placement;
    if (placement.startsWith('bottom') && !fitsBelow && fitsAbove) {
      chosen = placement.replace('bottom', 'top');
    } else if (placement.startsWith('top') && !fitsAbove && fitsBelow) {
      chosen = placement.replace('top', 'bottom');
    }

    const { top, left } = tryPlacement(chosen);
    setCoords({ top, left, minWidth: desiredMinWidth });
    setActualPlacement(chosen);
  }, [anchorRef, clamp, estDep(open), minWidth, offset, placement, viewportMargin]);

  // Recompute on open, and on scroll/resize while open
  useLayoutEffect(() => {
    if (!open) return;
    compute();

    const onScroll = () => compute();
    const onResize = () => compute();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }, [open, compute]);

  return useMemo(() => ({ panelRef, style: coords, placement: actualPlacement, updatePosition: compute }), [coords, actualPlacement, compute]);
}

// Helper to keep compute() deps stable even if `open` toggles
function estDep(v) {
  return v ? 1 : 0;
}

export default usePopoverPosition;

