'use client';
import React, { useEffect, useState } from 'react';
import { checkBackendStatus } from '@/lib/api';
import { CheckCircle2, WifiOff } from 'lucide-react';

export default function BackendBadge() {
  const [online, setOnline] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>('Checking...');

  useEffect(() => {
    checkBackendStatus().then((res) => {
      setOnline(res.online);
      setMessage(res.message);
    });
  }, []);

  if (online === null) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium transition-all ${
        online
          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
          : 'bg-amber-950/40 text-amber-300 border border-amber-800/40'
      }`}
      title={message}
    >
      {online ? (
        <>
          <CheckCircle2 size={12} className="text-emerald-400" />
          <span>Backend Connected</span>
        </>
      ) : (
        <>
          <WifiOff size={12} className="text-amber-400" />
          <span>Local Computation Mode (Standalone)</span>
        </>
      )}
    </div>
  );
}
