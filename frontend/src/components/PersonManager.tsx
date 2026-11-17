import React, { useState } from 'react';

interface Person {
  _id: string;
  name: string;
  slug: string;
}

const PersonManager: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([
    { _id: '1', name: 'Sarah Johnson', slug: 'sarah-johnson' },
    { _id: '2', name: 'Mike Chen', slug: 'mike-chen' },
    { _id: '3', name: 'Emma Davis', slug: 'emma-davis' }
  ]);
  
  const [newPerson, setNewPerson] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPerson.trim()) {
      setLoading(true);
      // In a real app, this would call the Sanity API
      const person: Person = {
        _id: `${people.length + 1}`,
        name: newPerson.trim(),
        slug: newPerson.trim().toLowerCase().replace(/\s+/g, '-')
      };
      setPeople([...people, person]);
      setNewPerson('');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Manage People</h2>
      
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Add New Person</h3>
        <form onSubmit={handleAddPerson} className="flex gap-2">
          <input
            type="text"
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
            placeholder="Enter person's name"
            className="flex-1 p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Person'}
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Current Borrowers</h3>
        <div className="grid gap-3">
          {people.map(person => (
            <div key={person._id} className="p-3 border border-gray-200 rounded flex justify-between items-center">
              <span>{person.name}</span>
              <span className="text-sm text-gray-500">{person.slug}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonManager;