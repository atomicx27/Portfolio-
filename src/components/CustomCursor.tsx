'use client';

import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function CustomCursor() {
  const { theme } = useTheme();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // References to the DOM elements for direct transform manipulation (performance-friendly)
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  
  // Track cursor position
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check for touch device support
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouchDevice) return;

    // Track mouse moves
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Track mouse actions on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') || 
        target.closest('input') || 
        target.closest('textarea') || 
        target.closest('.interactive-hover');
      
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Frame update loop
    let animationFrameId: number;
    
    const updatePosition = () => {
      // Linear interpolation to make the cursor smooth
      // Dot follows mouse immediately
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.25;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.25;

      // Ring follows mouse with some delay (ease-out)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dotPos.current.x - 3}px, ${dotPos.current.y - 3}px, 0)`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  // Determine colors based on active theme
  const getThemeColors = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          dot: 'bg-[#00f0ff]',
          ring: 'border-[#00f0ff]',
          glow: 'shadow-[0_0_10px_rgba(0,240,255,0.8)]',
          ringGlow: 'shadow-[0_0_15px_rgba(0,240,255,0.4)]'
        };
      case 'dark-minimal':
        return {
          dot: 'bg-[#FF6B6B]',
          ring: 'border-[#FF6B6B]',
          glow: 'shadow-[0_0_8px_rgba(255,107,107,0.6)]',
          ringGlow: 'shadow-[0_0_12px_rgba(255,107,107,0.3)]'
        };
      case 'light-airy':
        return {
          dot: 'bg-[#667eea]',
          ring: 'border-[#667eea]',
          glow: 'shadow-[0_0_6px_rgba(102,126,234,0.4)]',
          ringGlow: 'shadow-[0_0_10px_rgba(102,126,234,0.2)]'
        };
      case 'glassmorphism':
        return {
          dot: 'bg-[#60a5fa]',
          ring: 'border-[#a78bfa]',
          glow: 'shadow-[0_0_10px_rgba(96,165,250,0.6)]',
          ringGlow: 'shadow-[0_0_15px_rgba(167,139,250,0.3)]'
        };
      default:
        return {
          dot: 'bg-[#00f0ff]',
          ring: 'border-[#00f0ff]',
          glow: 'shadow-none',
          ringGlow: 'shadow-none'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <>
      {/* Outer cursor ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-9 h-9 border rounded-full pointer-events-none z-[9999] transition-[width,height,background-color,border-color,opacity] duration-300 ease-out will-change-transform ${colors.ring} ${
          isHovered 
            ? `bg-transparent scale-125 opacity-40 border-2` 
            : 'bg-transparent opacity-80'
        } ${clicked ? 'scale-75 opacity-100 border-[#ff2d95]' : ''}`}
      />
      {/* Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] transition-[transform,width,height,background-color,opacity] duration-150 ease-out will-change-transform ${colors.dot} ${colors.glow} ${
          isHovered 
            ? 'scale-150 opacity-0' 
            : 'opacity-100'
        }`}
      />
    </>
  );
}
