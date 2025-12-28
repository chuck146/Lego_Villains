
import React, { useRef } from 'react';
import { ImageData } from '../types';

interface ImageUploaderProps {
  onUpload: (data: ImageData) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onUpload({
        base64,
        mimeType: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative group w-full max-w-xl">
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <div 
        onClick={triggerUpload}
        className="w-full h-80 border-2 border-dashed border-zinc-700 hover:border-red-600 rounded-[2rem] flex flex-col items-center justify-center gap-6 cursor-pointer bg-zinc-900/30 hover:bg-red-950/5 transition-all duration-500 overflow-hidden"
      >
        <div className="w-20 h-20 bg-zinc-800 group-hover:bg-red-600/20 group-hover:scale-110 rounded-3xl flex items-center justify-center transition-all duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zinc-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        <div className="text-center px-6">
          <p className="text-xl font-medium mb-1">Drop your subject here</p>
          <p className="text-zinc-500 text-sm">Or click to browse your library</p>
        </div>
        
        <div className="flex gap-2 text-[10px] uppercase font-bold tracking-widest text-zinc-600">
          <span>PNG</span>
          <span className="text-zinc-800">•</span>
          <span>JPG</span>
          <span className="text-zinc-800">•</span>
          <span>WEBP</span>
        </div>
      </div>
      
      {/* Decorative accent */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-red-600/10 blur-2xl -z-10 group-hover:bg-red-600/30 transition-all duration-700"></div>
    </div>
  );
};

export default ImageUploader;
