import React, { useState, useEffect } from 'react';
import { Clipboard, Download, Edit, Check, Loader2 } from 'lucide-react';
import { ScanResult } from '../types';

interface TextOutputProps {
  scanResult: ScanResult | null;
  isProcessing: boolean;
  progress: number;
}

const TextOutput: React.FC<TextOutputProps> = ({ 
  scanResult, 
  isProcessing,
  progress 
}) => {
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (scanResult) {
      setText(scanResult.text);
    }
  }, [scanResult]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `ocr-text-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Extracted Text</h2>
        
        {scanResult && !isEditing && (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              aria-label="Edit text"
            >
              <Edit className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={handleCopyToClipboard}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              aria-label="Copy to clipboard"
            >
              {copySuccess ? (
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <Clipboard className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              aria-label="Download as text file"
            >
              <Download className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        )}
        
        {isEditing && (
          <button
            onClick={handleSaveEdit}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors flex items-center space-x-1"
          >
            <Check className="h-4 w-4" />
            <span>Done</span>
          </button>
        )}
      </div>
      
      {isProcessing ? (
        <div className="border rounded-lg p-4 h-64 flex flex-col items-center justify-center bg-white dark:bg-gray-800">
          <Loader2 className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Processing image...
          </p>
          <div className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
            <div 
              className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {Math.round(progress)}% complete
          </p>
        </div>
      ) : scanResult ? (
        <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
          {isEditing ? (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-64 p-4 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 resize-none"
              placeholder="Extracted text will appear here..."
            />
          ) : (
            <div className="p-4 h-64 overflow-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {text || "No text was extracted from the image."}
            </div>
          )}
        </div>
      ) : (
        <div className="border rounded-lg p-4 h-64 flex items-center justify-center bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500">
          Upload an image and click "Extract Text" to see results
        </div>
      )}
      
      {scanResult && (
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
          <span>Confidence: {scanResult.confidence.toFixed(2)}%</span>
          <span>Processed: {new Date(scanResult.timestamp).toLocaleString()}</span>
        </div>
      )}
    </div>
  );
};

export default TextOutput;