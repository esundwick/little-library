import React, { useState, useEffect } from 'react';
import { BookDetail } from '../services/openLibrary';

interface Person {
  _id: string;
  name: string;
}

interface BorrowFormData {
  item: BookDetail | null;
  borrower: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'returned' | 'overdue';
}

const BorrowForm: React.FC<{ 
  bookData: BookDetail | null; 
  onBorrow: (data: BorrowFormData) => void;
  onBack: () => void;
}> = ({ bookData, onBorrow, onBack }) => {
  const [borrowers, setBorrowers] = useState<Person[]>([]);
  const [formData, setFormData] = useState<BorrowFormData>({
    item: bookData,
    borrower: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from Sanity
    // Mock data for now
    setBorrowers([
      { _id: '1', name: 'Sarah Johnson' },
      { _id: '2', name: 'Mike Chen' },
      { _id: '3', name: 'Emma Davis' }
    ]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookData && formData.borrower) {
      onBorrow({
        ...formData,
        item: bookData
      });
    }
  };

  if (!bookData) {
    return (
      <div className="text-center py-8">
        <p>No book data available</p>
        <button 
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Scanner
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Borrow Item</h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <h3 className="text-xl font-semibold">{bookData.title}</h3>
        <p className="text-gray-600">{bookData.author}</p>
        {bookData.coverUrl && (
          <img src={bookData.coverUrl} alt={bookData.title} className="mt-2 max-w-xs h-auto rounded" />
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Borrower</label>
          <select
            name="borrower"
            value={formData.borrower}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a borrower</option>
            {borrowers.map(borrower => (
              <option key={borrower._id} value={borrower._id}>
                {borrower.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="active">Active</option>
            <option value="returned">Returned</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Create Borrow Record'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BorrowForm;