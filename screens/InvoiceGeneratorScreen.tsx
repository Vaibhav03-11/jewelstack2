import React, { useState, useEffect } from 'react';
import { mockOrders, mockProducts } from '../constants';
import { Order, Product } from '../types';

interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

// A simple mock mapping to link an order to a product for this demo
const orderToProductMap: { [key: string]: number } = {
    'JS-1024': 2, // Elegant Diamond Ring
    'JS-1023': 3, // Royal Ruby Necklace
    'JS-1022': 1, // Classic Gold Bangle
    'JS-1025': 5, // Studded Earrings
};


const InvoiceGeneratorScreen: React.FC = () => {
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('1');
    const [itemPrice, setItemPrice] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedOrderId, setSelectedOrderId] = useState<string>('');


    useEffect(() => {
        const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        setTotalAmount(total);
    }, [items]);

    useEffect(() => {
        if (selectedOrderId && orderToProductMap[selectedOrderId]) {
            const productId = orderToProductMap[selectedOrderId];
            const product = mockProducts.find(p => p.id === productId);

            if (product) {
                const newItem: InvoiceItem = {
                    id: product.id,
                    name: product.name,
                    quantity: 1,
                    price: product.price,
                };
                setItems([newItem]);
            }
        } else {
            setItems([]);
        }
    }, [selectedOrderId]);


    const handleAddItem = () => {
        const quantityNum = parseInt(itemQuantity, 10);
        const priceNum = parseFloat(itemPrice);

        if (itemName.trim() && !isNaN(quantityNum) && quantityNum > 0 && !isNaN(priceNum) && priceNum > 0) {
            const newItem: InvoiceItem = {
                id: Date.now(),
                name: itemName.trim(),
                quantity: quantityNum,
                price: priceNum,
            };
            setItems([...items, newItem]);
            // Reset fields
            setItemName('');
            setItemQuantity('1');
            setItemPrice('');
        } else {
            alert('Please ensure all fields are filled out correctly.');
        }
    };

    const handleRemoveItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };


    return (
        <div className="bg-jewel-bg-dark p-4 rounded-lg shadow-lg text-white space-y-4 animate-fade-in">
            <h1 className="text-xl font-bold text-jewel-gold">Generate Invoice</h1>

            <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-jewel-navy rounded-lg col-span-2">
                        <label className="font-semibold text-gray-400">Link to Existing Order</label>
                        <select
                            value={selectedOrderId}
                            onChange={(e) => setSelectedOrderId(e.target.value)}
                            className="w-full bg-jewel-bg-dark border border-jewel-gold/50 rounded mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white"
                        >
                            <option value="">Manual Entry</option>
                            {mockOrders.map(order => (
                                <option key={order.id} value={order.id}>
                                    {order.id} - {order.customerName}
                                </option>
                            ))}
                        </select>
                    </div>
                     <div className="p-3 bg-jewel-navy rounded-lg">
                        <label className="font-semibold text-gray-400">Invoice Date</label>
                        <input type="date" className="w-full bg-jewel-bg-dark border border-jewel-gold/50 rounded mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white" />
                    </div>
                    <div className="p-3 bg-jewel-navy rounded-lg">
                        <label className="font-semibold text-gray-400">Due Date</label>
                        <input type="date" className="w-full bg-jewel-bg-dark border border-jewel-gold/50 rounded mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white" />
                    </div>
                </div>


                {/* Manual Item Entry */}
                <div className="p-3 bg-jewel-navy rounded-lg">
                    <h3 className="font-semibold text-gray-400 mb-2">Add Invoice Item</h3>
                    <div className="space-y-2">
                        <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} className="w-full bg-jewel-bg-dark border border-jewel-gold/50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white placeholder-gray-500" disabled={!!selectedOrderId} />
                        <div className="grid grid-cols-2 gap-2">
                             <input type="number" placeholder="Qty" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} className="w-full bg-jewel-bg-dark border border-jewel-gold/50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white placeholder-gray-500" disabled={!!selectedOrderId} />
                             <input type="number" placeholder="Price per Item (₹)" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} className="w-full bg-jewel-bg-dark border border-jewel-gold/50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white placeholder-gray-500" disabled={!!selectedOrderId} />
                        </div>
                        <button onClick={handleAddItem} className="w-full bg-jewel-gold/20 text-jewel-gold font-semibold py-2 rounded-lg hover:bg-jewel-gold/30 transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed" disabled={!!selectedOrderId}>
                            + Add Item to Invoice
                        </button>
                    </div>
                </div>
                
                {/* Items List */}
                <div className="p-3 bg-jewel-navy rounded-lg">
                    <h3 className="font-semibold text-gray-400 mb-2">Invoice Items</h3>
                     {items.length === 0 ? (
                        <div className="text-center text-gray-500 border-2 border-dashed border-gray-600 p-4 rounded-lg">
                            <p>No items added yet. Select an order or add items manually.</p>
                        </div>
                     ) : (
                        <div className="space-y-2">
                            {items.map(item => (
                                <div key={item.id} className="bg-jewel-bg-dark p-2 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-xs text-gray-400">{item.quantity} x ₹{item.price.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <p className="font-semibold">₹{(item.quantity * item.price).toLocaleString('en-IN')}</p>
                                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-400 hover:text-red-600 font-bold text-lg disabled:text-gray-600 disabled:cursor-not-allowed" disabled={!!selectedOrderId}>&times;</button>
                                    </div>
                                </div>
                            ))}
                             <div className="mt-4 pt-2 border-t border-jewel-gold/20 flex justify-between items-center">
                                <span className="font-bold text-lg">Total:</span>
                                <span className="font-bold text-xl text-jewel-gold">₹{totalAmount.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                     )}
                </div>

                <button className="w-full bg-jewel-gold text-jewel-navy font-bold py-3 rounded-lg hover:bg-jewel-gold-dark transition-colors">
                   Preview Invoice
                </button>
            </div>
        </div>
    );
};

export default InvoiceGeneratorScreen;