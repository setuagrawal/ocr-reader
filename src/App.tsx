import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import TextOutput from './components/TextOutput';
import { ThemeProvider } from './context/ThemeContext';
import { ScanResult } from './types';

function App() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ImageUploader 
                onScanStart={() => {
                  setIsProcessing(true);
                  setProgress(0);
                }}
                onScanComplete={(result) => {
                  setScanResult(result);
                  setIsProcessing(false);
                }}
                onProgress={(p) => setProgress(p)}
              />
            </div>

            <div className="space-y-6">
              <TextOutput 
                scanResult={scanResult}
                isProcessing={isProcessing}
                progress={progress}
              />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;