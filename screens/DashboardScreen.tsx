
import React, { useState } from 'react';
import { Order, OrderStatus, Product } from '../types';
import { RupeeIcon, BoxIcon, EditIcon, CalendarIcon } from '../components/Icons';

interface DashboardScreenProps {
    orders: Order[];
    products: Product[];
}

const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode; colorClass: string }> = ({ title, value, icon, colorClass }) => (
  <div className={`p-4 rounded-xl shadow-lg flex-1 bg-jewel-bg-dark text-white relative overflow-hidden border border-white/10`}>
    <div className={`absolute -right-4 -top-2 text-6xl opacity-5 ${colorClass}`}>{icon}</div>
    <p className="text-sm text-gray-400">{title}</p>
    <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
  </div>
);

const GoldRateCard = () => {
    const [mode, setMode] = useState<'api' | 'manual'>('api');
    const [rate, setRate] = useState('6,350');

    return (
        <div className="col-span-2 bg-jewel-bg-dark p-4 rounded-xl shadow-lg text-white border border-white/10">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm text-gray-400">Live Gold Rate (/gram)</h3>
                <button onClick={() => setMode(mode === 'api' ? 'manual' : 'api')} className="flex items-center space-x-1 text-xs text-jewel-gold hover:text-jewel-gold-dark transition-colors">
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
                    <span className="text-2xl font-bold text-gray-400">₹</span>
                    <input 
                        type="text" 
                        value={rate} 
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full bg-jewel-navy text-3xl font-bold text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-jewel-gold"
                    />
                    <button onClick={() => setMode('api')} className="bg-jewel-gold text-jewel-navy font-bold px-3 py-1 rounded-md text-sm hover:bg-jewel-gold-dark">Save</button>
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
                    <div key={order.id} className="bg-jewel-bg-dark p-3 rounded-lg shadow-md flex items-center justify-between transition-transform hover:scale-105 cursor-pointer border border-jewel-gold/30">
                      <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 rounded-lg bg-jewel-navy flex items-center justify-center text-jewel-gold">
                             <CalendarIcon />
                         </div>
                         <div>
                            <p className="font-semibold text-white">{order.customerName}</p>
                            <p className="text-sm text-gray-400">Order ID - {order.id}</p>
                         </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                         <OrderStatusBadge status={order.status} />
                      </div>
                    </div>
                  ))}
                </div>
            ) : (
                <div className="bg-jewel-bg-dark p-4 rounded-lg text-center text-gray-400 border border-white/10">
                    <p>No upcoming deliveries or reminders.</p>
                </div>
            )}
        </div>
    );
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

const DashboardScreen: React.FC<DashboardScreenProps> = ({ orders, products }) => {
  const today = new Date().toISOString().split('T')[0];
  const dailySales = orders
    .filter(o => o.date === today && o.status === OrderStatus.Delivered)
    .reduce((sum, order) => sum + order.total, 0);
  
  const lowStockItems = products.filter(p => p.stock > 0 && p.stock < 5).length;
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <MetricCard title="Daily Sales" value={`₹${dailySales.toLocaleString('en-IN')}`} icon={<RupeeIcon />} colorClass="text-green-400" />
        <MetricCard title="Low Stock Items" value={lowStockItems.toString()} icon={<BoxIcon />} colorClass="text-jewel-red" />
        <GoldRateCard />
      </div>
      
      <UpcomingDeliveries orders={orders} />

      <div className="bg-jewel-bg-dark p-4 rounded-xl shadow-lg text-white border border-white/10">
        <h3 className="text-sm text-gray-400">Total Inventory Value</h3>
        <p className="text-lg font-bold">₹{totalInventoryValue.toLocaleString('en-IN')}</p>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-2">Recent Order History</h2>
        <div className="space-y-3">
          {recentOrders.length > 0 ? recentOrders.map(order => (
            <div key={order.id} className="bg-jewel-bg-dark p-3 rounded-lg shadow-md flex items-center justify-between">
              <div className="flex items-center space-x-3">
                 <img src={`https://picsum.photos/seed/${order.id}/50`} alt="item" className="w-12 h-12 rounded-md object-cover" />
                 <div>
                    <p className="font-semibold text-white">Order ID - {order.id}</p>
                    <p className="text-sm text-gray-400">{order.customerName}</p>
                 </div>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
          )) : (
             <div className="bg-jewel-bg-dark p-4 rounded-lg text-center text-gray-400 border border-white/10">
                <p>No recent orders to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
