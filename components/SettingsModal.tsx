import React from 'react';
import { InvoiceIcon } from './Icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: 'invoice') => void;
  onLogout: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onNavigate, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-brand-surface text-white rounded-lg shadow-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-brand-gold">Menu</h2>
          <button onClick={onClose} className="text-2xl font-bold text-brand-text-secondary">&times;</button>
        </div>
        <div className="space-y-3">
          <button 
            onClick={() => onNavigate('invoice')}
            className="w-full bg-brand-dark border border-brand-border text-brand-text-primary font-semibold py-3 px-4 rounded-lg hover:bg-brand-gold/10 transition-colors text-left flex items-center space-x-3"
          >
            <InvoiceIcon className="h-5 w-5 text-brand-gold" />
            <span>Generate Invoice</span>
          </button>
          
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-brand-text-secondary mb-1">Theme</label>
            <select id="theme" className="w-full bg-brand-dark border border-brand-border rounded p-2 focus:outline-none focus:ring-2 focus:ring-brand-gold">
              <option>Dark Mode</option>
              <option disabled>Light Mode (Coming Soon)</option>
            </select>
          </div>

          <button 
            onClick={onLogout}
            className="w-full bg-red-600/20 border border-red-500/50 text-red-300 font-bold py-3 px-4 rounded-lg hover:bg-red-600/40 transition-colors mt-4"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;