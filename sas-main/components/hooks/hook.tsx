// components/hooks/hook.tsx
"use client";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export const useScrollToOffset = <T extends HTMLElement = HTMLElement>(
  offset: number = 100, // Increased offset (adjust as needed)
  threshold: number = 0.5
): [React.RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const [inView, entry] = useInView({ threshold });

  useEffect(() => {
    if (inView && entry) {
      const targetElement = entry.target as T;

      if (targetElement) {
        let top = targetElement.getBoundingClientRect().top;

        // 1. Get the height of the sticky/fixed navbar (adjust selector if needed)
        const navbar = document.querySelector("nav"); // Or a more specific selector
        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        let totalOffset = offset + navbarHeight; // Add navbar height to the offset

        let parent = targetElement.parentElement;
        while (parent && parent !== document.body) {
          const parentOffsetTop = parent.offsetTop;
          if (parentOffsetTop) {
            totalOffset += parentOffsetTop;
          }
          parent = parent.parentElement;
        }

        const scrollPosition = window.scrollY + top - totalOffset;

        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [inView, entry, offset]);

  return [ref, inView];
};

export default useScrollToOffset;
