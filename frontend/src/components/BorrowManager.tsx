import React, { useState } from 'react';

interface BorrowItem {
  _id: string;
  title: string;
  item: {
    title: string;
    __typename: string;
  };
  borrower: {
    name: string;
  };
  status: 'active' | 'returned' | 'overdue';
  beginAt: string;
  endAt: string;
}

const BorrowManager: React.FC = () => {
  const [borrows, setBorrows] = useState<BorrowItem[]>([
    {
      _id: '1',
      title: 'Lent to Sarah',
      item: {
        title: 'The Great Gatsby',
        __typename: 'book'
      },
      borrower: {
        name: 'Sarah Johnson'
      },
      status: 'active',
      beginAt: '2023-05-15',
      endAt: '2023-05-22'
    },
    {
      _id: '2',
      title: 'Lent to Mike',
      item: {
        title: 'Inception',
        __typename: 'movie'
      },
      borrower: {
        name: 'Mike Chen'
      },
      status: 'active',
      beginAt: '2023-05-10',
      endAt: '2023-05-17'
    },
    {
      _id: '3',
      title: 'Lent to Emma',
      item: {
        title: 'Minecraft',
        __typename: 'game'
      },
      borrower: {
        name: 'Emma Davis'
      },
      status: 'returned',
      beginAt: '2023-05-01',
      endAt: '2023-05-08'
    }
  ]);

  const handleUpdateStatus = (id: string, newStatus: 'active' | 'returned' | 'overdue') => {
    setBorrows(borrows.map(borrow => 
      borrow._id === id ? { ...borrow, status: newStatus } : borrow
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'returned': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Borrow Management</h1>
      
      <div className="grid gap-4">
        {borrows.map((borrow) => (
          <div key={borrow._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{borrow.title}</h3>
                <p className="text-gray-600">
                  {borrow.item.title} ({borrow.item.__typename})
                </p>
                <p className="text-gray-600">Borrowed by: {borrow.borrower.name}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(borrow.status)}`}>
                  {borrow.status.charAt(0).toUpperCase() + borrow.status.slice(1)}
                </span>
                <select
                  value={borrow.status}
                  onChange={(e) => handleUpdateStatus(borrow._id, e.target.value as any)}
                  className="mt-2 text-sm p-1 border border-gray-300 rounded"
                >
                  <option value="active">Active</option>
                  <option value="returned">Returned</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
            
            <div className="mt-3 flex justify-between text-sm text-gray-500">
              <span>Borrowed: {new Date(borrow.beginAt).toLocaleDateString()}</span>
              <span>Due: {new Date(borrow.endAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowManager;