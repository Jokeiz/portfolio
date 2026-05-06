import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: pos.x, y: pos.y };

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.0, ease: 'none' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.0, ease: 'none' });
    const xToR = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'expo.out' });
    const yToR = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'expo.out' });

    const handleMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      xTo(pos.x);
      yTo(pos.y);
      xToR(pos.x);
      yToR(pos.y);
    };

    const addHover = () => ring.classList.add('is-hover');
    const removeHover = () => ring.classList.remove('is-hover');

    const interactive = 'a, button, [role="button"], input, textarea, .clickable, [data-cursor="hover"]';

    const handleOver = (e) => {
      if (e.target.closest(interactive)) addHover();
    };
    const handleOut = (e) => {
      if (e.target.closest(interactive)) removeHover();
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring hidden md:block" />
      <div ref={dotRef} className="cursor-dot hidden md:block" />
    </>
  );
}
