import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * A button/link that subtly follows the cursor on hover.
 * Used for primary CTAs to add polish.
 */
export default function MagneticButton({
  as: Tag = 'a',
  strength = 0.3,
  className = '',
  children,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.6,
        ease: 'expo.out',
      });
    };
    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return (
    <Tag ref={ref} className={`magnet ${className}`} {...props}>
      {children}
    </Tag>
  );
}
