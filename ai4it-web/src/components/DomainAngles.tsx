'use client';
import React from 'react';

interface DairyAngleProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function DairyAngle({ title = 'Dairy & Cooperative Context', children, className = '' }: DairyAngleProps) {
  return (
    <div className={`p-4 rounded-xl border border-sky-500/30 bg-sky-950/20 backdrop-blur-sm my-4 ${className}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-lg">🥛</span>
        <h4 className="text-sm font-bold uppercase tracking-wider text-sky-400">{title}</h4>
      </div>
      <div className="text-xs md:text-sm text-sky-100/90 leading-relaxed pl-7">{children}</div>
    </div>
  );
}

interface InfraAngleProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function InfraAngle({ title = 'IT Infrastructure & Operations Context', children, className = '' }: InfraAngleProps) {
  return (
    <div className={`p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 backdrop-blur-sm my-4 ${className}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-lg">🧱</span>
        <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">{title}</h4>
      </div>
      <div className="text-xs md:text-sm text-amber-100/90 leading-relaxed pl-7">{children}</div>
    </div>
  );
}
