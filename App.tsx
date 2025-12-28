
import React, { useState, useCallback } from 'react';
import { transformToy } from './services/gemini';
import { ImageData, StylePreset } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import EditorPanel from './components/EditorPanel';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('Bring this toy to life making him look like a cool bad guy with a cool background.');

  const handleImageUpload = (data: ImageData) => {
    setOriginalImage(data);
    setTransformedImage(null);
    setError(null);
  };

  const handleTransform = async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    setError(null);

    try {
      const result = await transformToy(originalImage, prompt);
      setTransformedImage(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setOriginalImage(null);
    setTransformedImage(null);
    setPrompt('Bring this toy to life making him look like a cool bad guy with a cool background.');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center pb-20 overflow-x-hidden">
      <Header />

      <main className="w-full max-w-6xl px-4 mt-8 flex flex-col gap-10">
        {!originalImage ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-700">
            <h2 className="text-3xl md:text-5xl font-oswald text-center mb-4 tracking-tighter uppercase">
              Summon Your Inner <span className="text-red-600">Villain</span>
            </h2>
            <p className="text-zinc-400 text-center max-w-md mb-8 text-lg">
              Upload a photo of your toy and witness its transformation into a legendary cinematic antagonist.
            </p>
            <ImageUploader onUpload={handleImageUpload} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in slide-in-from-bottom-4 duration-500">
            {/* Left Column: Editor & Original */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-oswald uppercase tracking-wider mb-4">Original Subject</h3>
                <div className="relative group overflow-hidden rounded-2xl aspect-square bg-black">
                  <img 
                    src={originalImage.base64} 
                    alt="Original Toy" 
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <button 
                      onClick={reset}
                      className="text-xs font-semibold bg-white text-black px-3 py-1 rounded-full uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-colors"
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              </div>

              <EditorPanel 
                prompt={prompt}
                setPrompt={setPrompt}
                onTransform={handleTransform}
                isProcessing={isProcessing}
                disabled={!originalImage}
              />
            </div>

            {/* Right Column: Result */}
            <div className="lg:col-span-7 h-full">
              <ResultDisplay 
                image={transformedImage} 
                isProcessing={isProcessing} 
                error={error}
              />
            </div>
          </div>
        )}
      </main>

      {/* Decorative background elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
    </div>
  );
};

export default App;
