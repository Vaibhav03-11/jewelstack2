
import React, { useState, useMemo } from 'react';
import { Customer, Order, OrderItem, OrderStatus, Product } from '../types';

interface OrderFormProps {
  customers: Customer[];
  products: Product[];
  onSave: (orderData: Omit<Order, 'id' | 'total'>, newCustomer?: Omit<Customer, 'id' | 'avatarUrl' | 'lastPurchase' | 'totalOrders'>) => void;
  onBack: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ customers, products, onSave, onBack }) => {
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
    const [newCustomerName, setNewCustomerName] = useState('');
    const [items, setItems] = useState<OrderItem[]>([]);
    
    const totalAmount = useMemo(() => {
        return items.reduce((sum, item) => sum + (item.quantity * item.pricePerItem), 0);
    }, [items]);

    const handleAddItem = (product: Product) => {
        if (product.stock <= 0) {
            alert("This item is out of stock.");
            return;
        }
        setItems(prev => {
            const existingItem = prev.find(i => i.productId === product.id);
            if (existingItem) {
                if (existingItem.quantity >= product.stock) {
                     alert("Cannot add more than available stock.");
                     return prev;
                }
                return prev.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { productId: product.id, quantity: 1, pricePerItem: product.price }];
        });
    };
    
    const handleRemoveItem = (productId: number) => {
        setItems(prev => prev.filter(i => i.productId !== productId));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if ((!selectedCustomerId || selectedCustomerId === 'new') && !newCustomerName) {
            alert('Please select or create a customer.');
            return;
        }
        if (items.length === 0) {
            alert('Please add at least one item to the order.');
            return;
        }

        const customerName = selectedCustomerId === 'new' 
            ? newCustomerName 
            : customers.find(c => c.id === parseInt(selectedCustomerId))?.name || '';

        const orderData: Omit<Order, 'id' | 'total'> = {
            customerId: selectedCustomerId === 'new' ? -1 : parseInt(selectedCustomerId),
            customerName: customerName,
            date: new Date().toISOString().split('T')[0],
            items,
            status: OrderStatus.Pending
        };
        
        const newCustomerData = selectedCustomerId === 'new' ? { name: newCustomerName } : undefined;

        onSave(orderData, newCustomerData);
    };

    return (
        <div className="bg-jewel-bg-dark p-4 rounded-lg shadow-lg animate-fade-in text-white">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-bold text-jewel-gold">New Order</h2>
                 <button onClick={onBack} className="text-xl font-bold text-gray-400">&times;</button>
            </div>
           
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div className="p-3 bg-jewel-navy rounded-lg">
                    <label className="font-semibold text-gray-400">Customer</label>
                    <select value={selectedCustomerId} onChange={e => setSelectedCustomerId(e.target.value)} className="w-full bg-jewel-bg-dark border border-jewel-gold rounded mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white placeholder-gray-500">
                        <option value="">Select Existing Customer</option>
                        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        <option value="new">-- Add New Customer --</option>
                    </select>
                    {selectedCustomerId === 'new' && (
                        <input type="text" placeholder="New Customer Name" value={newCustomerName} onChange={e => setNewCustomerName(e.target.value)} className="w-full bg-jewel-bg-dark border border-jewel-gold rounded mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white placeholder-gray-500" />
                    )}
                </div>

                <div className="p-3 bg-jewel-navy rounded-lg">
                    <label className="font-semibold text-gray-400">Add Items</label>
                    <div className="max-h-40 overflow-y-auto space-y-2 mt-2 pr-2">
                        {products.map(p => (
                            <div key={p.id} className="flex justify-between items-center bg-jewel-bg-dark p-2 rounded">
                                <div>
                                    <p className="font-semibold">{p.name}</p>
                                    <p className="text-xs text-gray-400">Stock: {p.stock} | ₹{p.price.toLocaleString()}</p>
                                </div>
                                <button type="button" onClick={() => handleAddItem(p)} className="bg-jewel-gold text-jewel-navy h-8 w-8 rounded-full shadow-lg flex items-center justify-center text-xl font-light disabled:bg-gray-500" disabled={p.stock <= 0}>
                                    +
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                 <div className="p-3 bg-jewel-navy rounded-lg space-y-2">
                    <h3 className="font-semibold text-gray-400">Order Summary</h3>
                    {items.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No items added.</p>
                    ) : (
                        items.map(item => {
                            const product = products.find(p => p.id === item.productId);
                            if (!product) return null;
                            return (
                                <div key={item.productId} className="flex justify-between items-center bg-jewel-bg-dark p-2 rounded">
                                    <div>
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-xs text-gray-400">{item.quantity} x ₹{item.pricePerItem.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p>₹{(item.quantity * item.pricePerItem).toLocaleString()}</p>
                                        <button type="button" onClick={() => handleRemoveItem(item.productId)} className="text-red-400 hover:text-red-600 font-bold">&times;</button>
                                    </div>
                                </div>
                            )
                        })
                    )}
                    <p className="text-right font-semibold text-lg pt-2 border-t border-gray-600">Total: <span className="text-jewel-gold">₹{totalAmount.toLocaleString()}</span></p>
                </div>

                <button type="submit" className="w-full bg-jewel-gold text-jewel-navy font-bold py-3 rounded-lg hover:bg-jewel-gold-dark transition-colors">
                   Confirm Order
                </button>
            </form>
        </div>
    );
};

export default OrderForm;
