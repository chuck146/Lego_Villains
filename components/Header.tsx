
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full h-20 px-8 flex items-center justify-between border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center transform rotate-12 shadow-lg shadow-red-900/40">
          <span className="text-white font-black text-xl leading-none">V</span>
        </div>
        <h1 className="text-2xl font-oswald tracking-tighter uppercase">Toy<span className="text-red-600">Villain</span></h1>
      </div>
      
      <div className="hidden md:flex gap-6 items-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        <span className="hover:text-white cursor-pointer transition-colors">Gallery</span>
        <span className="hover:text-white cursor-pointer transition-colors">Presets</span>
        <span className="hover:text-white cursor-pointer transition-colors">Pro Mode</span>
        <div className="h-4 w-[1px] bg-zinc-800"></div>
        <a 
          href="https://ai.google.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-all"
        >
          Powered by Gemini
        </a>
      </div>
    </header>
  );
};

export default Header;
