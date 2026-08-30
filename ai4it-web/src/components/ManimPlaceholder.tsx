import React from 'react';
import { PlayCircle } from 'lucide-react';

export default function ManimPlaceholder({ sceneName }: { sceneName: string }) {
  return (
    <div className="w-full aspect-video rounded-2xl bg-slate-950 border-2 border-dashed border-slate-700/60 flex flex-col items-center justify-center text-center p-6 gap-3 group hover:border-purple-500/50 transition-colors">
      <PlayCircle size={48} className="text-slate-600 group-hover:text-purple-400 transition-colors" />
      <div>
        <h4 className="text-white font-bold text-lg font-mono tracking-wide">{sceneName}.mp4</h4>
        <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">
          Render this Manim scene from <code className="text-purple-300">manim_animations/transformer.py</code> and replace this placeholder with a standard HTML video element.
        </p>
      </div>
    </div>
  );
}
