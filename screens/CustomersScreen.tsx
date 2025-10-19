import React, { useState } from 'react';
import { mockCustomers, mockOrders } from '../constants';
import { Customer, Order, OrderStatus } from '../types';

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

const CustomerDetailView: React.FC<{ customer: Customer; onBack: () => void }> = ({ customer, onBack }) => {
  const [activeTab, setActiveTab] = useState('active');
  const customerOrders = mockOrders.slice(0, 2); // Mock orders for this customer

  return (
    <div className="bg-jewel-bg-dark text-white rounded-lg shadow-md p-4 animate-fade-in">
        <button onClick={onBack} className="text-sm text-jewel-gold mb-4">&larr; Back to Customers</button>
        <div className="flex items-center space-x-4 mb-4">
            <img src={customer.avatarUrl} alt={customer.name} className="w-16 h-16 rounded-full" />
            <div>
                <h2 className="text-xl font-bold">{customer.name}</h2>
                <p className="text-sm text-gray-400">Last Purchase: {customer.lastPurchase}</p>
                <p className="text-sm text-gray-400">Total Orders: {customer.totalOrders}</p>
            </div>
        </div>
        <div className="flex border-b border-gray-700 mb-4">
            <button onClick={() => setActiveTab('active')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'active' ? 'border-b-2 border-jewel-gold text-jewel-gold' : 'text-gray-400'}`}>Active Orders</button>
            <button onClick={() => setActiveTab('history')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'history' ? 'border-b-2 border-jewel-gold text-jewel-gold' : 'text-gray-400'}`}>Purchase History</button>
        </div>
        <div className="space-y-3">
          {customerOrders.map(order => (
            <div key={order.id} className="bg-jewel-navy p-3 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img src={`https://picsum.photos/seed/${order.id}/50`} alt="item" className="w-12 h-12 rounded-md object-cover" />
                    <div>
                        <p className="font-semibold">Order ID - {order.id}</p>
                        <p className="text-sm text-gray-400">Date: {order.date}</p>
                        <OrderStatusBadge status={order.status} />
                    </div>
                </div>
                <p className="font-bold text-jewel-gold">₹{order.total.toLocaleString('en-IN')}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-green-900/50 p-3 rounded-lg">
            <h3 className="font-semibold text-gray-200">Payment History</h3>
            <p className="text-gray-300">Advance Payments: <span className="font-bold">₹0</span></p>
            <div className="flex justify-between items-center">
                <p className="text-gray-300">Balance Due:</p>
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-500 text-white">Paid</span>
            </div>
        </div>
    </div>
  );
};


const CustomersScreen: React.FC = () => {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    if (selectedCustomer) {
        return <CustomerDetailView customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} />
    }

  return (
    <div className="space-y-4">
        <h1 className="text-xl font-bold text-white">Customers</h1>
      {mockCustomers.map(customer => (
        <div key={customer.id} onClick={() => setSelectedCustomer(customer)} className="bg-jewel-bg-dark p-4 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer hover:shadow-lg transition-shadow">
          <img src={customer.avatarUrl} alt={customer.name} className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="font-bold text-white">{customer.name}</h3>
            <p className="text-sm text-gray-400">Total Orders: {customer.totalOrders}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomersScreen;