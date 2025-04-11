// src/hooks/useScrollAnimation.tsx
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once the animation has triggered, we can stop observing
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when at least 10% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return { ref, isVisible };
}