import { useEffect, useRef, useState } from 'react';

/**
 * useInView — observes an element with IntersectionObserver and returns
 * [ref, inView]. Use to gate expensive work (R3F canvases, SVG SMIL,
 * requestAnimationFrame loops) so it only runs while visible.
 *
 * @param {object} options
 * @param {string} options.rootMargin  CSS-string margin around the root.
 * @param {boolean} options.once       If true, stays true once seen.
 */
export function useInView({ rootMargin = '120px', once = false } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      // Fallback: assume visible if API is missing.
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, once]);

  return [ref, inView];
}
