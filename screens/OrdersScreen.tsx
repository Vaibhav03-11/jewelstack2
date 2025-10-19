
import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { OrdersIcon, TrashIcon } from '../components/Icons';

interface OrdersScreenProps {
    orders: Order[];
    onUpdateStatus: (orderId: string, status: OrderStatus) => void;
    onDeleteOrder: (orderId: string) => void;
    onNavigateToNewOrder: () => void;
}

const OrderStatusBadge: React.FC<{ status: OrderStatus, orderId: string, onUpdateStatus: (orderId: string, status: OrderStatus) => void }> = ({ status, orderId, onUpdateStatus }) => {
    const statusStyles = {
        [OrderStatus.Delivered]: 'bg-green-500/10 text-green-400',
        [OrderStatus.Pending]: 'bg-yellow-500/10 text-yellow-400',
        [OrderStatus.Shipped]: 'bg-blue-500/10 text-blue-400',
    };
    
    const nextStatus = {
        [OrderStatus.Pending]: OrderStatus.Shipped,
        [OrderStatus.Shipped]: OrderStatus.Delivered,
        [OrderStatus.Delivered]: OrderStatus.Delivered,
    }

    const handleStatusClick = () => {
        if (status !== OrderStatus.Delivered) {
             onUpdateStatus(orderId, nextStatus[status]);
        }
    }

    return (
        <button onClick={handleStatusClick} title={status !== OrderStatus.Delivered ? `Click to change to ${nextStatus[status]}` : ''}
          className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]} ${status !== OrderStatus.Delivered ? 'cursor-pointer hover:opacity-80' : ''}`}>
            {status}
        </button>
    );
};

const OrdersScreen: React.FC<OrdersScreenProps> = ({ orders, onUpdateStatus, onDeleteOrder, onNavigateToNewOrder }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    
    const filteredOrders = orders.filter(order => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Pending') return order.status === OrderStatus.Pending;
        if (activeFilter === 'Completed') return order.status === OrderStatus.Delivered;
        return true;
    });

    return (
    <div className="space-y-4 animate-fade-in">
        <div className="flex justify-between items-center">
             <h1 className="text-xl font-bold text-white">Orders</h1>
             <button onClick={onNavigateToNewOrder} className="bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-lg text-sm hover:bg-brand-gold-hover transition-colors">
                + New Order
              </button>
        </div>
      <div className="flex space-x-2 border-b border-brand-border">
          <button onClick={() => setActiveFilter('All')} className={`py-2 px-4 text-sm font-medium ${activeFilter === 'All' ? 'border-b-2 border-brand-gold text-brand-gold' : 'text-brand-text-secondary'}`}>All Orders</button>
          <button onClick={() => setActiveFilter('Pending')} className={`py-2 px-4 text-sm font-medium ${activeFilter === 'Pending' ? 'border-b-2 border-brand-gold text-brand-gold' : 'text-brand-text-secondary'}`}>Pending</button>
          <button onClick={() => setActiveFilter('Completed')} className={`py-2 px-4 text-sm font-medium ${activeFilter === 'Completed' ? 'border-b-2 border-brand-gold text-brand-gold' : 'text-brand-text-secondary'}`}>Completed</button>
      </div>

      <div className="space-y-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <div key={order.id} className="bg-brand-surface text-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-bold">Order #{order.id}</p>
                        <p className="text-sm text-brand-text-secondary">{order.customerName}</p>
                        <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <OrderStatusBadge status={order.status} orderId={order.id} onUpdateStatus={onUpdateStatus} />
                        <button onClick={() => onDeleteOrder(order.id)} className="p-1 text-brand-text-secondary hover:text-brand-red"><TrashIcon className="h-4 w-4" /></button>
                    </div>
                </div>
                <div className="mt-2 pt-2 border-t border-brand-border text-right">
                <span className="font-semibold text-brand-gold">Total: ₹{order.total.toLocaleString('en-IN')}</span>
                </div>
            </div>
          ))
        ) : (
             <div className="bg-brand-surface p-8 rounded-lg text-center text-brand-text-secondary border border-brand-border flex flex-col items-center">
                <OrdersIcon className="h-12 w-12 text-gray-500 mb-4" />
                <p className="font-semibold text-white">No orders for this filter.</p>
                <p className="text-sm mt-1">Click the '+ New Order' button to create one.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default OrdersScreen;