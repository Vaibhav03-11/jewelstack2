import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import InventoryScreen from './screens/InventoryScreen';
import CustomersScreen from './screens/CustomersScreen';
import OrdersScreen from './screens/OrdersScreen';
import MLInsightsScreen from './screens/MLInsightsScreen';
import InvoiceGeneratorScreen from './screens/InvoiceGeneratorScreen';
import SettingsModal from './components/SettingsModal';
import { DashboardIcon, InventoryIcon, CustomersIcon, OrdersIcon, InsightsIcon, MenuIcon } from './components/Icons';

type Screen = 'dashboard' | 'inventory' | 'customers' | 'orders' | 'insights' | 'invoice';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard': return <DashboardScreen />;
      case 'inventory': return <InventoryScreen />;
      case 'customers': return <CustomersScreen />;
      case 'orders': return <OrdersScreen />;
      case 'insights': return <MLInsightsScreen />;
      case 'invoice': return <InvoiceGeneratorScreen />;
      default: return <DashboardScreen />;
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
    switch (activeScreen) {
      case 'dashboard':
        return 'JewelStack';
      case 'invoice':
        return 'Generate Invoice';
      default:
        return activeScreen.charAt(0).toUpperCase() + activeScreen.slice(1);
    }
  };

  return (
    <div className="min-h-screen bg-jewel-navy font-sans text-white">
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
        <header className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-jewel-gold">{getHeaderTitle()}</h1>
           <button onClick={() => setIsSettingsOpen(true)} className="p-2 -mr-2">
                <MenuIcon className="h-6 w-6 text-white" />
            </button>
        </header>

        <main className="flex-grow p-4 overflow-y-auto pb-24">
          {renderScreen()}
        </main>
        
        <footer className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-jewel-bg-dark border-t border-jewel-gold/20">
          <nav className="flex justify-around">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id as Screen)}
                className={`flex flex-col items-center justify-center w-full p-2 text-xs transition-colors ${
                  activeScreen === item.id ? 'text-jewel-gold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <item.icon className="h-6 w-6 mb-1" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default App;