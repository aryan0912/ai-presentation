'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface PresentationContextType {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  activeBeat: string | null;
  setActiveBeat: (beat: string | null) => void;
}

const PresentationContext = createContext<PresentationContextType>({
  isSidebarCollapsed: false,
  setIsSidebarCollapsed: () => {},
  toggleSidebar: () => {},
  activeBeat: null,
  setActiveBeat: () => {},
});

export function PresentationProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [activeBeat, setActiveBeat] = useState<string | null>(null);

  // Load persistence from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ai4it_sidebar_collapsed');
      if (saved !== null) {
        setIsSidebarCollapsed(saved === 'true');
      }
    } catch (e) {}
  }, []);

  // Keyboard shortcut listener ('[' to toggle sidebar, 'F' for presentation mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === '[' || (e.shiftKey && e.key === 'F')) {
        e.preventDefault();
        setIsSidebarCollapsed((prev) => {
          const next = !prev;
          try {
            localStorage.setItem('ai4it_sidebar_collapsed', String(next));
          } catch (err) {}
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('ai4it_sidebar_collapsed', String(next));
      } catch (err) {}
      return next;
    });
  };

  return (
    <PresentationContext.Provider
      value={{
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toggleSidebar,
        activeBeat,
        setActiveBeat,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentation() {
  return useContext(PresentationContext);
}
