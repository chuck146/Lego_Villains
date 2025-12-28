
import React from 'react';

interface ResultDisplayProps {
  image: string | null;
  isProcessing: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ image, isProcessing, error }) => {
  return (
    <div className="h-full bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-4 flex flex-col relative overflow-hidden min-h-[500px]">
      <div className="flex items-center justify-between mb-4 px-4 pt-2">
        <h3 className="text-xl font-oswald uppercase tracking-wider">Final Evolution</h3>
        {image && (
          <div className="flex gap-2">
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = image;
                link.download = 'villain-transformation.png';
                link.click();
              }}
              className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              Export
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 relative rounded-[2rem] overflow-hidden bg-black flex items-center justify-center">
        {isProcessing && (
          <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
            <div className="w-24 h-24 relative mb-6">
              <div className="absolute inset-0 border-2 border-red-600 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-0 border-4 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 bg-zinc-900 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-oswald text-2xl">V</span>
              </div>
            </div>
            <p className="text-xl font-oswald uppercase tracking-[0.2em] mb-2 animate-pulse">Evolving Character</p>
            <p className="text-zinc-500 text-sm max-w-xs">Gemini is rendering cinematic details and atmospheric lighting...</p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 z-20 bg-black/90 flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-lg font-bold text-red-500 mb-2">Darkness Overwhelmed</p>
            <p className="text-zinc-500 text-sm max-w-xs mb-6">{error}</p>
          </div>
        )}

        {!image && !isProcessing && !error && (
          <div className="flex flex-col items-center justify-center text-center p-12 opacity-30 select-none">
            <div className="w-32 h-32 border-2 border-zinc-800 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <p className="text-lg uppercase tracking-[0.2em] font-oswald">Awaiting Subject</p>
            <p className="text-xs mt-2">The chamber is ready for the transformation process.</p>
          </div>
        )}

        {image && (
          <img 
            src={image} 
            alt="Transformed Villain" 
            className={`w-full h-full object-cover transition-all duration-1000 ${isProcessing ? 'blur-xl opacity-50' : 'blur-0 opacity-100'}`}
          />
        )}
      </div>
      
      {/* Aesthetic scanner line effect while processing */}
      {isProcessing && (
        <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.8)] animate-[scan_2s_ease-in-out_infinite] z-30"></div>
      )}

      <style>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ResultDisplay;
