import { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

interface PDFPreviewProps {
  pdfUrl: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export default function PDFPreview({ pdfUrl, alt, className = '', onClick }: PDFPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderPDF = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load the PDF document
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        
        // Get the first page
        const page = await pdf.getPage(1);
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const context = canvas.getContext('2d');
        if (!context) return;

        // Calculate scale to fit the container
        const containerWidth = 300; // Adjust based on your card width
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        // Set canvas dimensions
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;
        canvas.style.width = '100%';
        canvas.style.height = 'auto';

        // Render the page
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };

        await page.render(renderContext).promise;
        setIsLoading(false);
      } catch (err) {
        console.error('Error rendering PDF:', err);
        setError('Failed to load PDF preview');
        setIsLoading(false);
      }
    };

    renderPDF();
  }, [pdfUrl]);

  if (error) {
    return (
      <div 
        className={`w-full h-40 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
        onClick={onClick}
      >
        <div className="text-red-500 dark:text-red-400 text-sm text-center">
          <p>Preview not available</p>
          <p className="text-xs mt-1">Click to view PDF</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full h-40 overflow-hidden rounded-lg cursor-pointer ${className}`}
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
      {/* Overlay for better hover effect */}
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
    </div>
  );
}