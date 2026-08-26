'use client';
import React from 'react';
import { PresentationProvider, usePresentation } from '@/components/PresentationContext';
import Sidebar from '@/components/Sidebar';
import LectureHeader from '@/components/LectureHeader';

function ShellContent({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed } = usePresentation();

  return (
    <div className="app-container">
      <Sidebar />
      <main className={`main-content ${isSidebarCollapsed ? 'collapsed-margin' : ''}`}>
        <LectureHeader />
        {children}
      </main>
    </div>
  );
}

export default function PresentationShell({ children }: { children: React.ReactNode }) {
  return (
    <PresentationProvider>
      <ShellContent>{children}</ShellContent>
    </PresentationProvider>
  );
}
