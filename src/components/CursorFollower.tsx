import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CursorFollower: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering over a clickable element
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window === 'undefined') return null;
  // If user prefers reduced motion or is on a touch device, we might not want to show it, but for now we'll just hide default cursor via CSS or keep it as an overlay.
  // Actually, we should probably hide the default cursor in global css if we want a full custom cursor, or just keep it as an aura. Let's keep it as an aura behind the normal cursor.

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-[#3B4BE8]/50 pointer-events-none z-[100] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(59, 75, 232, 0.2)' : 'rgba(59, 75, 232, 0)',
      }}
      transition={{
        scale: { duration: 0.15 },
        backgroundColor: { duration: 0.15 }
      }}
    />
  );
};
