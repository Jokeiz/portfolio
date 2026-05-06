import { useEffect, useState } from 'react';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function useKeyboardShortcuts() {
  const [easter, setEaster] = useState(false);

  useEffect(() => {
    let buf = [];

    const scrollTo = (sel) => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const onKey = (e) => {
      // Don't fire shortcuts while typing in inputs / textareas
      const tag = (e.target?.tagName || '').toLowerCase();
      if (['input', 'textarea'].includes(tag) || e.target?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // Konami detection (case-insensitive last entries)
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buf.push(k);
      if (buf.length > KONAMI.length) buf.shift();
      if (buf.length === KONAMI.length && buf.every((v, i) => v === KONAMI[i])) {
        setEaster(true);
        buf = [];
        return;
      }

      // Single-letter shortcuts
      switch (e.key.toLowerCase()) {
        case 'g':
          window.open('https://github.com/Jokeiz', '_blank');
          break;
        case 'w':
          scrollTo('#work');
          break;
        case 'a':
          scrollTo('#about');
          break;
        case 's':
          scrollTo('#stack');
          break;
        case 'p':
          scrollTo('#process');
          break;
        case 'c':
          scrollTo('#contact');
          break;
        case 't':
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case '?':
          // toggle help — handled by parent via a future hook return
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return { easter, dismissEaster: () => setEaster(false) };
}
