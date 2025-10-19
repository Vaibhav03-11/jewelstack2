
import React, { useState } from 'react';
import { Customer, Order, OrderStatus } from '../types';
import { CustomersIcon } from '../components/Icons';

interface CustomersScreenProps {
    customers: Customer[];
    orders: Order[];
}

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

const CustomerDetailView: React.FC<{ customer: Customer; customerOrders: Order[]; onBack: () => void }> = ({ customer, customerOrders, onBack }) => {
  const [activeTab, setActiveTab] = useState('history');
  
  const activeOrders = customerOrders.filter(o => o.status !== OrderStatus.Delivered);
  const orderHistory = customerOrders.filter(o => o.status === OrderStatus.Delivered);

  const ordersToShow = activeTab === 'active' ? activeOrders : orderHistory;

  return (
    <div className="bg-jewel-bg-dark text-white rounded-lg shadow-md p-4 animate-fade-in">
        <button onClick={onBack} className="text-sm text-jewel-gold mb-4">&larr; Back to Customers</button>
        <div className="flex items-center space-x-4 mb-4">
            <img src={customer.avatarUrl} alt={customer.name} className="w-16 h-16 rounded-full" />
            <div>
                <h2 className="text-xl font-bold">{customer.name}</h2>
                <p className="text-sm text-gray-400">Last Purchase: {new Date(customer.lastPurchase).toLocaleDateString()}</p>
                <p className="text-sm text-gray-400">Total Orders: {customer.totalOrders}</p>
            </div>
        </div>
        <div className="flex border-b border-gray-700 mb-4">
            <button onClick={() => setActiveTab('active')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'active' ? 'border-b-2 border-jewel-gold text-jewel-gold' : 'text-gray-400'}`}>Active Orders ({activeOrders.length})</button>
            <button onClick={() => setActiveTab('history')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'history' ? 'border-b-2 border-jewel-gold text-jewel-gold' : 'text-gray-400'}`}>Purchase History ({orderHistory.length})</button>
        </div>
        <div className="space-y-3">
            {ordersToShow.length > 0 ? ordersToShow.map(order => (
                <div key={order.id} className="bg-jewel-navy p-3 rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src={`https://picsum.photos/seed/${order.id}/50`} alt="item" className="w-12 h-12 rounded-md object-cover" />
                        <div>
                            <p className="font-semibold">Order ID - {order.id}</p>
                            <p className="text-sm text-gray-400">Date: {new Date(order.date).toLocaleDateString()}</p>
                            <OrderStatusBadge status={order.status} />
                        </div>
                    </div>
                    <p className="font-bold text-jewel-gold">₹{order.total.toLocaleString('en-IN')}</p>
                </div>
            )) : <p className="text-center text-gray-400 py-4">No orders in this category.</p>}
        </div>
    </div>
  );
};


const CustomersScreen: React.FC<CustomersScreenProps> = ({ customers, orders }) => {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    if (selectedCustomer) {
        const customerOrders = orders.filter(o => o.customerId === selectedCustomer.id);
        return <CustomerDetailView customer={selectedCustomer} customerOrders={customerOrders} onBack={() => setSelectedCustomer(null)} />
    }

  return (
    <div className="space-y-4">
        <h1 className="text-xl font-bold text-white">Customers</h1>
      {customers.length > 0 ? (
        [...customers].sort((a,b) => b.totalOrders - a.totalOrders).map(customer => (
            <div key={customer.id} onClick={() => setSelectedCustomer(customer)} className="bg-jewel-bg-dark p-4 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer hover:bg-jewel-gold/10 transition-colors">
            <img src={customer.avatarUrl} alt={customer.name} className="w-12 h-12 rounded-full" />
            <div>
                <h3 className="font-bold text-white">{customer.name}</h3>
                <p className="text-sm text-gray-400">Total Orders: {customer.totalOrders}</p>
            </div>
            </div>
        ))
      ) : (
        <div className="bg-jewel-bg-dark p-8 rounded-lg text-center text-gray-400 border border-white/10 flex flex-col items-center">
            <CustomersIcon className="h-12 w-12 text-gray-500 mb-4" />
            <p className="font-semibold text-white">No customers found.</p>
            <p className="text-sm mt-1">New customers are added when you create a new order.</p>
        </div>
      )}
    </div>
  );
};

export default CustomersScreen;
