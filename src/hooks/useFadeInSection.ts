import { useEffect, useRef, useState } from 'react';

/**
 * Custom React hook to add fade-in effect to a section when it enters the viewport.
 * Usage: const [ref, isVisible] = useFadeInSection();
 * Then: <section ref={ref} className={`fade-in-section${isVisible ? ' is-visible' : ''}`}>...</section>
 */
export function useFadeInSection<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible] as const;
}
