'use client';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

interface PretextRendererProps {
  text: string;
  font?: string;
  lineHeight?: number;
  className?: string;
  as?: 'p' | 'div' | 'blockquote' | 'span';
  animateLines?: boolean;
}

export default function PretextRenderer({
  text,
  font = '14px Inter, system-ui, sans-serif',
  lineHeight = 22,
  className = '',
  as: Component = 'div',
  animateLines = false,
}: PretextRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const measureAndLayout = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth || 600;
      try {
        const prep = prepareWithSegments(text, font);
        const result = layoutWithLines(prep, width, lineHeight);
        setLines(result.lines.map((l) => l.text));
      } catch (err) {
        // If canvas context unavailable, fallback to standard text
        setLines(null);
      }
    };

    measureAndLayout();

    const resizeObserver = new ResizeObserver(() => {
      measureAndLayout();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [text, font, lineHeight, mounted]);

  // SSR or initial render fallback
  if (!mounted || !lines) {
    return (
      <Component ref={containerRef as any} className={`pretext-container ${className}`}>
        {text}
      </Component>
    );
  }

  return (
    <Component ref={containerRef as any} className={`pretext-container ${className}`}>
      {lines.map((line, idx) => (
        <span
          key={idx}
          className={`block ${animateLines ? 'transition-all duration-300' : ''}`}
          style={{
            lineHeight: `${lineHeight}px`,
          }}
        >
          {line}
        </span>
      ))}
    </Component>
  );
}
