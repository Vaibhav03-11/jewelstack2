
import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import InventoryScreen from './screens/InventoryScreen';
import CustomersScreen from './screens/CustomersScreen';
import OrdersScreen from './screens/OrdersScreen';
import MLInsightsScreen from './screens/MLInsightsScreen';
import InvoiceGeneratorScreen from './screens/InvoiceGeneratorScreen';
import SettingsModal from './components/SettingsModal';
import OrderForm from './components/OrderForm';
import { DashboardIcon, InventoryIcon, CustomersIcon, OrdersIcon, InsightsIcon, MenuIcon, BackIcon, MessageIcon } from './components/Icons';
import { Product, Order, Customer, OrderStatus } from './types';
import { mockProducts, mockOrders, mockCustomers } from './constants';

type Screen = 'dashboard' | 'inventory' | 'customers' | 'orders' | 'insights' | 'invoice';
type AppView = Screen | 'new-order';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState<AppView>('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // --- CRUD Handlers ---

  const handleAddProduct = (productData: Omit<Product, 'id' | 'priceChange'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now(),
      priceChange: Math.floor(Math.random() * 200) - 100,
      imageUrl: productData.imageUrl || `https://picsum.photos/seed/${Date.now()}/200`,
    };
    setProducts(prev => [...prev, newProduct]);
  };
  
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleAddOrder = (
    orderData: Omit<Order, 'id' | 'total'>,
    newCustomerData?: Omit<Customer, 'id' | 'avatarUrl' | 'lastPurchase' | 'totalOrders'>
  ) => {
      let customerId = orderData.customerId;
      let updatedCustomers = [...customers];
      
      if (newCustomerData) {
          const newCustomer: Customer = {
              id: Date.now(),
              name: newCustomerData.name,
              avatarUrl: `https://i.pravatar.cc/150?img=${Date.now()}`,
              lastPurchase: new Date().toISOString().split('T')[0],
              totalOrders: 1,
              phone: newCustomerData.phone,
          };
          updatedCustomers.push(newCustomer);
          setCustomers(updatedCustomers);
          customerId = newCustomer.id;
      } else {
          updatedCustomers = customers.map(c => 
              c.id === customerId 
              ? { ...c, totalOrders: c.totalOrders + 1, lastPurchase: new Date().toISOString().split('T')[0] } 
              : c
          );
          setCustomers(updatedCustomers);
      }

      const total = orderData.items.reduce((sum, item) => sum + item.quantity * item.pricePerItem, 0);

      const newOrder: Order = {
          ...orderData,
          id: `JS-${Math.floor(Math.random() * 9000) + 1000}`,
          customerId,
          total
      };
      
      setOrders(prev => [newOrder, ...prev]);

      // Update stock
      let updatedProducts = [...products];
      newOrder.items.forEach(item => {
        updatedProducts = updatedProducts.map(p => 
            p.id === item.productId ? { ...p, stock: p.stock - item.quantity } : p
        );
      });
      setProducts(updatedProducts);
      setActiveScreen('orders');
  };
  
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleDeleteOrder = (orderId: string) => {
      if (window.confirm('Are you sure you want to delete this order?')) {
        const orderToDelete = orders.find(o => o.id === orderId);
        if (!orderToDelete) return;

        // Restore stock
        let updatedProducts = [...products];
        orderToDelete.items.forEach(item => {
            updatedProducts = updatedProducts.map(p =>
                p.id === item.productId ? { ...p, stock: p.stock + item.quantity } : p
            );
        });
        setProducts(updatedProducts);
        setOrders(prev => prev.filter(o => o.id !== orderId));
      }
  };


  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard': return <DashboardScreen orders={orders} products={products} />;
      case 'inventory': return <InventoryScreen products={products} onAddProduct={handleAddProduct} onUpdateProduct={handleUpdateProduct} onDeleteProduct={handleDeleteProduct} />;
      case 'customers': return <CustomersScreen customers={customers} orders={orders} />;
      case 'orders': return <OrdersScreen orders={orders} onUpdateStatus={handleUpdateOrderStatus} onDeleteOrder={handleDeleteOrder} onNavigateToNewOrder={() => setActiveScreen('new-order')} />;
      case 'insights': return <MLInsightsScreen />;
      case 'invoice': return <InvoiceGeneratorScreen orders={orders} products={products} customers={customers} />;
      case 'new-order': return <OrderForm customers={customers} products={products} onSave={handleAddOrder} onBack={() => setActiveScreen('orders')} />;
      default: return <DashboardScreen orders={orders} products={products} />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'inventory', label: 'Inventory', icon: InventoryIcon },
    { id: 'customers', label: 'Customers', icon: CustomersIcon },
    { id: 'orders', label: 'Orders', icon: OrdersIcon },
    { id: 'insights', label: 'Insights', icon: InsightsIcon },
  ];

  const getHeaderTitle = () => {
    if (activeScreen === 'dashboard') return 'JewelStack';
    if (activeScreen === 'invoice') return 'Generate Invoice';
    if (activeScreen === 'new-order') return 'New Order';
    const screen = activeScreen as Screen;
    return screen.charAt(0).toUpperCase() + screen.slice(1);
  };

  return (
    <div className="min-h-screen bg-brand-dark font-sans text-brand-text-primary">
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onNavigate={(screen) => {
          setActiveScreen(screen);
          setIsSettingsOpen(false);
        }}
        onLogout={() => {
            setIsSettingsOpen(false);
            setIsLoggedIn(false);
        }}
      />
      <div className="container mx-auto max-w-lg h-screen flex flex-col">
        <header className="p-4 flex justify-between items-center h-16 flex-shrink-0">
          {activeScreen === 'new-order' ? (
              <>
                <button onClick={() => setActiveScreen('orders')} className="p-2 -ml-2 text-brand-text-primary">
                    <BackIcon className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-bold text-brand-text-primary">{getHeaderTitle()}</h1>
                <div className="flex items-center space-x-2">
                    <button className="p-2 -mr-2"><MessageIcon className="h-6 w-6 text-brand-text-primary" /></button>
                    <button onClick={() => setIsSettingsOpen(true)} className="p-2 -mr-2"><MenuIcon className="h-6 w-6 text-brand-text-primary" /></button>
                </div>
              </>
          ) : (
             <>
                <h1 className="text-2xl font-serif text-brand-gold">{getHeaderTitle()}</h1>
                <button onClick={() => setIsSettingsOpen(true)} className="p-2 -mr-2">
                    <MenuIcon className="h-6 w-6 text-brand-text-primary" />
                </button>
             </>
          )}
        </header>

        <main className={`flex-grow p-4 overflow-y-auto ${activeScreen !== 'new-order' ? 'pb-24' : 'pb-4'}`}>
          {renderScreen()}
        </main>
        
        {activeScreen !== 'new-order' && (
            <footer className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-brand-surface border-t border-brand-border">
              <nav className="flex justify-around">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveScreen(item.id as Screen)}
                    className={`flex flex-col items-center justify-center w-full py-2 text-xs transition-colors ${
                      activeScreen === item.id ? 'text-brand-gold' : 'text-brand-text-secondary hover:text-brand-text-primary'
                    }`}
                  >
                    <item.icon className="h-6 w-6 mb-1" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </footer>
        )}
      </div>
    </div>
  );
};

export default App;