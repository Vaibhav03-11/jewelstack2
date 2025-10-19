
import React, { useState, useEffect } from 'react';
import { Product, Purity } from '../types';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Omit<Product, 'id' | 'priceChange'> | Product) => void;
  productToEdit?: Product | null;
}

const initialFormState = {
    name: '',
    category: '',
    purity: Purity.TWENTY_TWO_K,
    weight: 0,
    stock: 0,
    price: 0,
    imageUrl: '',
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSave, productToEdit }) => {
    const [formState, setFormState] = useState(initialFormState);

    useEffect(() => {
        if (productToEdit) {
            setFormState(productToEdit);
        } else {
            setFormState(initialFormState);
        }
    }, [productToEdit, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: name === 'weight' || name === 'stock' || name === 'price' ? parseFloat(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formState);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <div className="bg-jewel-bg-dark text-white rounded-lg shadow-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-jewel-gold">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose} className="text-2xl font-bold text-gray-400">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Product Name" value={formState.name} onChange={handleChange} className="w-full bg-jewel-navy border border-jewel-gold/50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold" required />
                    <input type="text" name="category" placeholder="Category (e.g., Ring)" value={formState.category} onChange={handleChange} className="w-full bg-jewel-navy border border-jewel-gold/50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold" required />
                    <select name="purity" value={formState.purity} onChange={handleChange} className="w-full bg-jewel-navy border border-jewel-gold/50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold">
                        {Object.values(Purity).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" name="weight" placeholder="Weight (g)" value={formState.weight} onChange={handleChange} className="w-full bg-jewel-navy border border-jewel-gold/50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold" required />
                        <input type="number" name="stock" placeholder="Stock" value={formState.stock} onChange={handleChange} className="w-full bg-jewel-navy border border-jewel-gold/50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold" required />
                    </div>
                    <input type="number" name="price" placeholder="Price (₹)" value={formState.price} onChange={handleChange} className="w-full bg-jewel-navy border border-jewel-gold/50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold" required />
                    <input type="text" name="imageUrl" placeholder="Image URL (Optional)" value={formState.imageUrl} onChange={handleChange} className="w-full bg-jewel-navy border border-jewel-gold/50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold" />
                    <button type="submit" className="w-full bg-jewel-gold text-jewel-navy font-bold py-3 rounded-lg hover:bg-jewel-gold-dark transition-colors">
                        Save Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductFormModal;
