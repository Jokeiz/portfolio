import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (ref.current) ref.current.style.transform = `scaleX(${pct / 100})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[1px] z-50 pointer-events-none">
      <div
        ref={ref}
        className="origin-left h-full bg-accent transition-transform duration-100"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
