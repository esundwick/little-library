import React, { useState } from 'react';
import Scanner from './components/Scanner';
import BorrowDashboard from './components/BorrowDashboard';
import PersonManager from './components/PersonManager';

const App = () => {
  const [view, setView] = useState<'scanner' | 'dashboard' | 'people'>('scanner');
  const [bookData, setBookData] = useState<any | null>(null);

  const handleScanSuccess = (book: any) => {
    setBookData(book);
    setView('scanner'); // Stay on scanner but show book data
  };

  const handleBorrow = (data: any) => {
    // In a real implementation, this would create a borrow record in Sanity
    console.log('Creating borrow record:', data);
    alert('Borrow record created successfully!');
    setBookData(null);
    setView('dashboard');
  };

  const handleBackToScanner = () => {
    setBookData(null);
    setView('scanner');
  };

  const handleViewDashboard = () => {
    setView('dashboard');
  };

  const handleViewPeople = () => {
    setView('people');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600">Little Library</h1>
        <p className="text-gray-500">Track borrowed games, movies, and books</p>
      </header>
      
      <main className="w-full max-w-md">
        {view === 'scanner' && !bookData && (
          <div className="flex flex-col items-center">
            <Scanner onScanSuccess={handleScanSuccess} />
            <div className="mt-6 flex gap-2">
              <button 
                onClick={handleViewDashboard}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                View Dashboard
              </button>
              <button 
                onClick={handleViewPeople}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Manage People
              </button>
            </div>
          </div>
        )}
        
        {view === 'scanner' && bookData && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Confirm Borrow Details</h2>
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-bold">{bookData.title}</h3>
              <p className="text-gray-600">{bookData.author}</p>
              {bookData.coverUrl && (
                <img src={bookData.coverUrl} alt={bookData.title} className="mt-4 rounded-lg max-w-xs h-auto" />
              )}
              <button 
                onClick={() => setBookData(null)}
                className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Scan Another Book
              </button>
            </div>
            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => setView('dashboard')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Back to Dashboard
              </button>
              <button 
                onClick={() => setView('people')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Manage People
              </button>
            </div>
          </div>
        )}
        
        {view === 'dashboard' && (
          <div>
            <BorrowDashboard />
            <div className="mt-6 flex justify-center gap-2">
              <button 
                onClick={() => setView('scanner')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Scan New Item
              </button>
              <button 
                onClick={handleViewPeople}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Manage People
              </button>
            </div>
          </div>
        )}
        
        {view === 'people' && (
          <div>
            <PersonManager />
            <div className="mt-6 flex justify-center">
              <button 
                onClick={() => setView('scanner')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Back to Scanner
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
