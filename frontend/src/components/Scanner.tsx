import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { fetchBookByISBN } from '../services/openLibrary';

interface ScannerProps {
  onScanSuccess?: (book: any) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanSuccess }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [bookData, setBookData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        fpsCamera: 10,
        qrbox: { width: 250, height: 250 },
      },
      /* verbose= */ false
    );

    scanner.render(document.getElementById('reader') as HTMLElement, async (result) => {
      if (result) {
        scanner.pause();
        setLoading(true);
        const book = await fetchBookByISBN(result);
        if (book) {
          setBookData(book);
          if (onScanSuccess) {
            onScanSuccess(book);
          }
        } else {
          alert('No book found with that ISBN.');
        }
        setLoading(false);
        scanner.resume();
      }
    });

    scannerRef.current = scanner;

    return () => {
      scanner.clear();
    };
  }, [onScanSuccess]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Scan Book Barcode</h2>
      {bookData ? (
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold">{bookData.title}</h3>
          <p className="text-gray-600">{bookData.author}</p>
          <p className="mt-2">{bookData.description}</p>
          {bookData.coverUrl && (
            <img src={bookData.coverUrl} alt={bookData.title} className="mt-4 rounded-lg" />
          )}
          <button 
            onClick={() => setBookData(null)} 
            className="mt-4 text-blue-500 underline"
          >
            Clear Results
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md overflow-hidden rounded-lg border-4 border-blue-500">
          {loading && <p className="p-4">Searching...</p>}
          <div id="reader" className="w-full"></div>
        </div>
      )}
      <p className="mt-4 text-sm text-gray-600">
        {loading ? 'Searching...' : 'Align the barcode within the frame.'}
      </p>
    </div>
  );
};

export default Scanner;
