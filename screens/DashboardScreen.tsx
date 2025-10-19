
import React, { useState } from 'react';
import { Order, OrderStatus, Product } from '../types';
import { RupeeIcon, BoxIcon, EditIcon, CalendarIcon } from '../components/Icons';

interface DashboardScreenProps {
    orders: Order[];
    products: Product[];
}

const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode; colorClass: string }> = ({ title, value, icon, colorClass }) => (
  <div className={`p-4 rounded-xl shadow-lg flex-1 bg-brand-surface text-white relative overflow-hidden`}>
    <div className={`absolute -right-4 -top-2 text-6xl opacity-10 ${colorClass}`}>{icon}</div>
    <p className="text-sm text-brand-text-secondary">{title}</p>
    <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
  </div>
);

const GoldRateCard = () => {
    const [mode, setMode] = useState<'api' | 'manual'>('api');
    const [rate, setRate] = useState('6,350');

    return (
        <div className="col-span-2 bg-brand-surface p-4 rounded-xl shadow-lg text-white">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm text-brand-text-secondary">Live Gold Rate (/gram)</h3>
                <button onClick={() => setMode(mode === 'api' ? 'manual' : 'api')} className="flex items-center space-x-1 text-xs text-brand-gold hover:text-brand-gold-hover transition-colors">
                    <EditIcon className="h-3 w-3" />
                    <span>{mode === 'api' ? 'Manual Edit' : 'Sync from API'}</span>
                </button>
            </div>
            {mode === 'api' ? (
                <div>
                    <p className="text-3xl font-bold">₹{rate}</p>
                    <span className="text-green-400 flex items-center text-xs">▲ +0.5% today</span>
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-brand-text-secondary">₹</span>
                    <input 
                        type="text" 
                        value={rate} 
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full bg-brand-dark text-3xl font-bold text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                    <button onClick={() => setMode('api')} className="bg-brand-gold text-brand-dark font-bold px-3 py-1 rounded-md text-sm hover:bg-brand-gold-hover">Save</button>
                </div>
            )}
        </div>
    );
};

const UpcomingDeliveries: React.FC<{orders: Order[]}> = ({ orders }) => {
    const upcomingOrders = orders.filter(o => o.status !== OrderStatus.Delivered);

    return (
        <div>
            <h2 className="text-lg font-bold text-white mb-3">Order Reminders</h2>
            {upcomingOrders.length > 0 ? (
                <div className="space-y-3">
                  {upcomingOrders.map(order => (
                    <div key={order.id} className="bg-brand-surface p-3 rounded-lg shadow-md flex items-center justify-between transition-transform hover:scale-105 cursor-pointer">
                      <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 rounded-lg bg-brand-dark flex items-center justify-center text-brand-gold">
                             <CalendarIcon />
                         </div>
                         <div>
                            <p className="font-semibold text-brand-text-primary">{order.customerName}</p>
                            <p className="text-sm text-brand-text-secondary">Order ID - {order.id}</p>
                         </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-brand-text-primary">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                         <OrderStatusBadge status={order.status} />
                      </div>
                    </div>
                  ))}
                </div>
            ) : (
                <div className="bg-brand-surface p-4 rounded-lg text-center text-brand-text-secondary">
                    <p>No upcoming deliveries or reminders.</p>
                </div>
            )}
        </div>
    );
}

const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const statusStyles = {
        [OrderStatus.Delivered]: 'bg-green-500/10 text-green-400',
        [OrderStatus.Pending]: 'bg-yellow-500/10 text-yellow-400',
        [OrderStatus.Shipped]: 'bg-blue-500/10 text-blue-400',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
            {status}
        </span>
    );
};

const DashboardScreen: React.FC<DashboardScreenProps> = ({ orders, products }) => {
  const today = new Date().toISOString().split('T')[0];
  const dailySales = orders
    .filter(o => o.date === today && o.status === OrderStatus.Delivered)
    .reduce((sum, order) => sum + order.total, 0);
  
  const lowStockItems = products.filter(p => p.stock > 0 && p.stock < 5).length;
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        <MetricCard title="Daily Sales" value={`₹${dailySales.toLocaleString('en-IN')}`} icon={<RupeeIcon />} colorClass="text-brand-success" />
        <MetricCard title="Low Stock Items" value={lowStockItems.toString()} icon={<BoxIcon />} colorClass="text-brand-red" />
        <GoldRateCard />
      </div>
      
      <UpcomingDeliveries orders={orders} />

      <div className="bg-brand-surface p-4 rounded-xl shadow-lg text-white">
        <h3 className="text-sm text-brand-text-secondary">Total Inventory Value</h3>
        <p className="text-lg font-bold">₹{totalInventoryValue.toLocaleString('en-IN')}</p>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-2">Recent Order History</h2>
        <div className="space-y-3">
          {recentOrders.length > 0 ? recentOrders.map(order => (
            <div key={order.id} className="bg-brand-surface p-3 rounded-lg shadow-md flex items-center justify-between">
              <div className="flex items-center space-x-3">
                 <img src={`https://picsum.photos/seed/${order.id}/50`} alt="item" className="w-12 h-12 rounded-md object-cover" />
                 <div>
                    <p className="font-semibold text-brand-text-primary">Order ID - {order.id}</p>
                    <p className="text-sm text-brand-text-secondary">{order.customerName}</p>
                 </div>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
          )) : (
             <div className="bg-brand-surface p-4 rounded-lg text-center text-brand-text-secondary">
                <p>No recent orders to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;