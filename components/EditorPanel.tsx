
import React from 'react';
import { StylePreset } from '../types';

interface EditorPanelProps {
  prompt: string;
  setPrompt: (p: string) => void;
  onTransform: () => void;
  isProcessing: boolean;
  disabled: boolean;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ 
  prompt, 
  setPrompt, 
  onTransform, 
  isProcessing,
  disabled 
}) => {
  const presets = [
    { name: 'Default', prompt: 'Bring this toy to life making him look like a cool bad guy with a cool background.' },
    { name: 'Cyberpunk', prompt: 'Transform this toy into a high-tech cyberpunk villain with neon enhancements, in a rainy futuristic neon city background.' },
    { name: 'Dark Overlord', prompt: 'Reimagine this toy as a dark fantasy warlord with obsidian armor and glowing eyes, standing before a burning volcanic fortress.' },
    { name: 'Sci-Fi Rogue', prompt: 'Turn this character into a space pirate rogue with battle-worn tech gear on a dusty alien planet with two moons.' }
  ];

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 backdrop-blur-sm space-y-6">
      <div>
        <h3 className="text-xl font-oswald uppercase tracking-wider mb-4">Command Center</h3>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your villain..."
          className="w-full h-32 bg-black border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-300 focus:outline-none focus:border-red-600 transition-colors resize-none placeholder:text-zinc-700"
          disabled={isProcessing}
        />
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Style Presets</p>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setPrompt(preset.prompt)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                prompt === preset.prompt 
                  ? 'bg-red-600 border-red-500 text-white' 
                  : 'bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:border-zinc-500'
              }`}
              disabled={isProcessing}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onTransform}
        disabled={disabled || isProcessing}
        className={`w-full py-4 rounded-2xl font-oswald text-xl uppercase tracking-widest transition-all relative overflow-hidden group ${
          isProcessing 
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
            : 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]'
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Manifesting...
            </>
          ) : (
            <>Unleash Transformation</>
          )}
        </span>
        {!isProcessing && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        )}
      </button>
    </div>
  );
};

export default EditorPanel;
