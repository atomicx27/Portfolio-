'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeName = 'cyberpunk' | 'dark-minimal' | 'light-airy' | 'glassmorphism';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'cyberpunk',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const themeConfig: Record<ThemeName, { label: string; colors: string[] }> = {
  cyberpunk: {
    label: 'Cyberpunk Neon',
    colors: ['#00f0ff', '#ff2d95', '#b026ff'],
  },
  'dark-minimal': {
    label: 'Dark Minimal',
    colors: ['#FF6B6B', '#FFD43B', '#4CAF50'],
  },
  'light-airy': {
    label: 'Light Airy',
    colors: ['#667eea', '#764ba2', '#f093fb'],
  },
  glassmorphism: {
    label: 'Glassmorphism',
    colors: ['#60a5fa', '#a78bfa', '#34d399'],
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('cyberpunk');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('portfolio-theme') as ThemeName | null;
    if (saved && Object.keys(themeConfig).includes(saved)) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('portfolio-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
