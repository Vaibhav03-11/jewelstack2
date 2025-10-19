import React, { useState } from 'react';
import { mockOrders } from '../constants';
import { OrderStatus, Purity } from '../types';

const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const statusStyles = {
        [OrderStatus.Delivered]: 'bg-green-900 text-green-300',
        [OrderStatus.Pending]: 'bg-yellow-900 text-yellow-300',
        [OrderStatus.Shipped]: 'bg-blue-900 text-blue-300',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
            {status}
        </span>
    );
};

const NewOrderForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="bg-jewel-bg-dark p-4 rounded-lg shadow-lg animate-fade-in text-white">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-bold text-jewel-gold">New Order</h2>
                 <button onClick={onBack} className="text-xl font-bold text-gray-400">&times;</button>
            </div>
           
            <div className="space-y-4 text-sm">
                <div className="p-3 bg-jewel-navy rounded-lg">
                    <label className="font-semibold text-gray-400">Customer Name</label>
                    <input type="text" placeholder="Link Existing Customer" className="w-full bg-jewel-bg-dark border border-jewel-gold rounded mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white placeholder-gray-500" />
                </div>
                <div className="p-3 bg-jewel-navy rounded-lg">
                    <label className="font-semibold text-gray-400">Purity</label>
                    <div className="flex space-x-2 mt-2">
                        <button className="flex-1 bg-jewel-gold text-jewel-navy py-2 rounded font-semibold">18K Gold</button>
                        <button className="flex-1 bg-gray-700 text-white py-2 rounded font-semibold">24K Gold</button>
                    </div>
                </div>
                 <div className="p-3 bg-jewel-navy rounded-lg space-y-2">
                    <label className="font-semibold text-gray-400">Item Details</label>
                    <input type="text" placeholder="Type of Ornament" className="w-full bg-jewel-bg-dark border border-jewel-gold rounded p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white placeholder-gray-500" />
                    <input type="text" placeholder="Weight (grams)" className="w-full bg-jewel-bg-dark border border-jewel-gold rounded p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white placeholder-gray-500" />
                    <textarea placeholder="Custom Description" className="w-full bg-jewel-bg-dark border border-jewel-gold rounded p-2 h-20 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white placeholder-gray-500"></textarea>
                </div>
                 <div className="p-3 bg-jewel-navy rounded-lg">
                    <label className="font-semibold text-gray-400">Dates</label>
                    <input type="date" placeholder="Estimated Delivery Date" className="w-full bg-jewel-bg-dark border border-jewel-gold rounded mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white placeholder-gray-500" />
                </div>
                 <div className="p-3 bg-jewel-navy rounded-lg space-y-2">
                    <h3 className="font-semibold text-gray-400">Payment History</h3>
                    <input type="number" placeholder="Advance Payment (₹)" className="w-full bg-jewel-bg-dark border border-jewel-gold rounded p-2 focus:outline-none focus:ring-2 focus:ring-jewel-gold text-white placeholder-gray-500" />
                    <p className="text-right font-semibold text-lg">Total Amount (₹): <span className="text-jewel-gold">0.00</span></p>
                </div>
                <button className="w-full bg-jewel-gold text-jewel-navy font-bold py-3 rounded-lg hover:bg-jewel-gold-dark transition-colors">
                   Confirm Order
                </button>
            </div>
        </div>
    );
}

const OrdersScreen: React.FC = () => {
    const [showNewOrderForm, setShowNewOrderForm] = useState(false);

    if(showNewOrderForm) {
        return <NewOrderForm onBack={() => setShowNewOrderForm(false)} />
    }

  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
             <h1 className="text-xl font-bold text-white">Orders</h1>
             <button onClick={() => setShowNewOrderForm(true)} className="bg-jewel-gold text-jewel-navy font-bold py-2 px-4 rounded-lg text-sm hover:bg-jewel-gold-dark transition-colors">
                + New Order
              </button>
        </div>
      <div className="flex space-x-2 border-b border-gray-700">
          <button className="py-2 px-4 text-sm font-medium border-b-2 border-jewel-gold text-jewel-gold">All Orders</button>
          <button className="py-2 px-4 text-sm font-medium text-gray-400">Pending</button>
          <button className="py-2 px-4 text-sm font-medium text-gray-400">Completed</button>
      </div>

      <div className="space-y-3">
        {mockOrders.map(order => (
          <div key={order.id} className="bg-jewel-bg-dark text-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">Order #{order.id}</p>
                <p className="text-sm text-gray-400">{order.customerName}</p>
                <p className="text-xs text-gray-500">{order.date}</p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="mt-2 pt-2 border-t border-gray-700 text-right">
              <span className="font-semibold text-jewel-gold">Total: ₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersScreen;