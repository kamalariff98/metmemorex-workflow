'use client';

import React, { useState } from 'react';

const edgeTypes = [
  { value: 'default', label: 'Default' },
  { value: 'animated', label: 'Animated' },
  { value: 'straight', label: 'Straight' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'thick', label: 'Thick' },
  { value: 'step', label: 'Step' },
  { value: 'smoothstep', label: 'Smooth Step' },
  { value: 'crowsfoot', label: 'Crowsfoot' }
];

export const SimpleSelect = () => {
  const [selectedType, setSelectedType] = useState('default');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    console.log('Edge type changed to:', newType);
    setSelectedType(newType);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-white text-sm font-medium">Edge:</label>
      <select
        value={selectedType}
        onChange={handleChange}
        className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{ minWidth: '120px' }}
      >
        {edgeTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SimpleSelect;
