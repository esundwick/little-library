import React, { useState } from 'react';
import BorrowManager from './BorrowManager';

const BorrowDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'manager'>('overview');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Little Library Dashboard</h1>
      
      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'manager' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('manager')}
          >
            Manage Borrows
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Active Loans</h2>
            <p className="text-gray-700">You have 2 active loans</p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Upcoming Due Dates</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Book due tomorrow</li>
              <li>Movie due in 3 days</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
            <p className="text-gray-700">Last updated: Today</p>
          </div>
        </div>
      ) : (
        <BorrowManager />
      )}
    </div>
  );
};

export default BorrowDashboard;