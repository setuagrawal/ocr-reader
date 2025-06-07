import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, ZoomIn, ZoomOut, RotateCcw, ScanText } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { ScanResult } from '../types';

interface ImageUploaderProps {
  onScanStart: () => void;
  onScanComplete: (result: ScanResult) => void;
  onProgress: (progress: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onScanStart,
  onScanComplete,
  onProgress
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setImage(e.target.result);
        setZoom(1); // Reset zoom when a new image is uploaded
      }
    };
    reader.readAsDataURL(file);
  };

  const handleScan = async () => {
    if (!image) return;
    
    onScanStart();
    
    try {
      const worker = await createWorker({
        logger: progress => {
          if (progress.status === 'recognizing text') {
            onProgress(progress.progress * 100);
          }
        }
      });
      
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      
      const { data } = await worker.recognize(image);
      
      onScanComplete({
        text: data.text,
        confidence: data.confidence,
        timestamp: new Date().toISOString(),
        imageData: image
      });
      
      await worker.terminate();
    } catch (error) {
      console.error('OCR processing error:', error);
      alert('Error processing the image. Please try again.');
    }
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const zoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.25, 3));
  };

  const zoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.25, 0.5));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Image Input</h2>
        {image && (
          <div className="flex space-x-2">
            <button
              onClick={zoomIn}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={zoomOut}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={clearImage}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              aria-label="Remove image"
            >
              <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        )}
      </div>
      
      {!image ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center h-64 transition-colors ${
            isDragging 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
            Drag and drop an image here, or click to select
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center space-x-1"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Image</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept="image/*"
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <div className="overflow-auto h-64 flex items-center justify-center">
            <img
              src={image}
              alt="Uploaded image"
              className="transition-transform duration-200 ease-in-out"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
        </div>
      )}
      
      <div className="flex space-x-2">
        <button
          onClick={handleScan}
          disabled={!image}
          className={`px-4 py-2 rounded-md transition-colors flex-1 flex items-center justify-center space-x-2 ${
            image
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
          }`}
        >
          <ScanText className="h-5 w-5" />
          <span>Extract Text</span>
        </button>
        
        <button
          onClick={clearImage}
          disabled={!image}
          className={`px-4 py-2 rounded-md transition-colors ${
            image
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
          }`}
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;