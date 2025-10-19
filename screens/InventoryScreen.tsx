
import React, { useState } from 'react';
import { Product, Purity } from '../types';
import { BoxIcon, EditIcon, TrashIcon, PlusIcon } from '../components/Icons';
import ProductFormModal from '../components/ProductFormModal';

interface InventoryScreenProps {
    products: Product[];
    onAddProduct: (productData: Omit<Product, 'id' | 'priceChange'>) => void;
    onUpdateProduct: (product: Product) => void;
    onDeleteProduct: (productId: number) => void;
}

const filters = [Purity.TWENTY_TWO_K, Purity.EIGHTEEN_K, Purity.TWENTY_FOUR_K, 'Necklace', 'Rings', 'Out of Stock'];

const PriceChange: React.FC<{ change: number }> = ({ change }) => {
  const isPositive = change >= 0;
  const color = isPositive ? 'text-green-300' : 'text-red-300';
  const bgColor = isPositive ? 'bg-green-900/50' : 'bg-red-900/50';
  const sign = isPositive ? '+' : '';
  const value = Math.abs(change).toFixed(2);

  return (
    <div className={`px-2 py-1 text-xs font-semibold rounded ${bgColor} ${color}`}>
      {sign} ₹{value}
    </div>
  );
};

const InventoryItemCard: React.FC<{ item: Product; onEdit: () => void; onDelete: () => void; }> = ({ item, onEdit, onDelete }) => {
  const isLowStock = item.stock < 5 && item.stock > 0;
  const isOutOfStock = item.stock === 0;

  return (
    <div className="bg-brand-surface p-4 rounded-lg shadow-md flex space-x-4 items-center">
      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
      <div className="flex-grow">
        <h3 className="font-bold text-brand-text-primary">{item.name}</h3>
        <p className="text-sm text-brand-text-secondary">Purity: {item.purity}</p>
        <p className="text-sm text-brand-text-secondary">Weight: {item.weight}g</p>
        <p className={`text-sm font-semibold ${isLowStock ? 'text-yellow-400' : isOutOfStock ? 'text-brand-red' : 'text-brand-text-secondary'}`}>
          Stock: {item.stock} {isLowStock && '(Low)'} {isOutOfStock && '(Out of Stock)'}
        </p>
      </div>
      <div className="flex flex-col items-end justify-between self-stretch">
        <PriceChange change={item.priceChange} />
        <div className="flex items-center space-x-2">
            <button onClick={onEdit} className="p-1 text-brand-text-secondary hover:text-white"><EditIcon className="h-4 w-4" /></button>
            <button onClick={onDelete} className="p-1 text-brand-text-secondary hover:text-brand-red"><TrashIcon className="h-4 w-4" /></button>
        </div>
        <span className="font-bold text-lg text-brand-gold">₹{item.price.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
};

const InventoryScreen: React.FC<InventoryScreenProps> = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [activeFilter, setActiveFilter] = useState<string>(Purity.TWENTY_TWO_K);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'priceChange'> | Product) => {
    if ('id' in productData) {
      onUpdateProduct(productData);
    } else {
      onAddProduct(productData);
    }
  };

  const filteredProducts = products.filter(p => {
    if (activeFilter === 'Out of Stock') return p.stock <= 0;
    if (filters.includes(activeFilter)) {
        return p.purity === activeFilter || p.category === activeFilter;
    }
    return true;
  });


  return (
    <div className="relative animate-fade-in">
      <ProductFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />
      <div className="mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-brand-gold text-brand-dark'
                  : 'bg-brand-surface text-brand-text-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <InventoryItemCard key={product.id} item={product} onEdit={() => handleOpenEditModal(product)} onDelete={() => onDeleteProduct(product.id)} />
          ))
        ) : (
          <div className="bg-brand-surface p-8 rounded-lg text-center text-brand-text-secondary border border-brand-border flex flex-col items-center">
            <BoxIcon className="h-12 w-12 text-gray-500 mb-4" />
            <p className="font-semibold text-brand-text-primary">No products found for this filter.</p>
            <p className="text-sm mt-1">Add a new product or change the filter.</p>
          </div>
        )}
      </div>

       <button onClick={handleOpenAddModal} className="fixed bottom-24 right-4 bg-brand-gold text-brand-dark h-14 w-14 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
        <PlusIcon className="h-8 w-8" />
      </button>
    </div>
  );
};

export default InventoryScreen;