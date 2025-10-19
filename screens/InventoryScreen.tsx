import React, { useState } from 'react';
import { mockProducts } from '../constants';
import { Product, Purity } from '../types';

const filters = [Purity.TWENTY_TWO_K, Purity.EIGHTEEN_K, Purity.TWENTY_FOUR_K, 'Necklace', 'Rings', 'Out of Stock'];

const PriceChange: React.FC<{ change: number }> = ({ change }) => {
  const isPositive = change >= 0;
  const color = isPositive ? 'text-green-300' : 'text-red-300';
  const bgColor = isPositive ? 'bg-green-900' : 'bg-red-900';
  const sign = isPositive ? '+' : '-';
  const value = Math.abs(change).toFixed(1);

  return (
    <div className={`px-2 py-1 text-xs font-semibold rounded ${bgColor} ${color}`}>
      {sign} ₹{value} ({sign}{value}%)
    </div>
  );
};


const InventoryItemCard: React.FC<{ item: Product }> = ({ item }) => {
  const isLowStock = item.stock < 5;
  return (
    <div className="bg-jewel-bg-dark p-4 rounded-lg shadow-md flex space-x-4 items-center">
      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
      <div className="flex-grow">
        <h3 className="font-bold text-white">{item.name}</h3>
        <p className="text-sm text-gray-400">Purity: {item.purity}</p>
        <p className="text-sm text-gray-400">Weight: {item.weight}g</p>
        <p className={`text-sm font-semibold ${isLowStock ? 'text-jewel-red' : 'text-gray-400'}`}>
          Stock: {item.stock}
        </p>
      </div>
      <div className="flex flex-col items-end justify-between self-stretch">
         <PriceChange change={item.priceChange} />
        <span className="font-bold text-lg text-jewel-gold">₹{item.price.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
};

const InventoryScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>(Purity.TWENTY_TWO_K);
  // This filtering logic is for demonstration. A real app would use more complex filtering.
  const filteredProducts = mockProducts.filter(p => {
    if (activeFilter === 'Out of Stock') return p.stock <= 0;
    if (filters.includes(activeFilter)) {
        return p.purity === activeFilter || p.category === activeFilter;
    }
    return true;
  });


  return (
    <div className="relative">
      <div className="mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-jewel-gold text-jewel-navy'
                  : 'bg-jewel-bg-dark text-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredProducts.map(product => (
          <InventoryItemCard key={product.id} item={product} />
        ))}
      </div>

       <button className="absolute bottom-4 right-4 bg-jewel-gold text-jewel-navy h-14 w-14 rounded-full shadow-lg flex items-center justify-center text-3xl font-light">
        +
      </button>
    </div>
  );
};

export default InventoryScreen;