import { useMemo } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children, rootId = 'overlay-root' }) {
  const root = useMemo(() => {
    let el = document.getElementById(rootId);
    if (!el) {
      el = document.createElement('div');
      el.id = rootId;
      document.body.appendChild(el);
    }
    return el;
  }, [rootId]);

  return createPortal(children, root);
}

