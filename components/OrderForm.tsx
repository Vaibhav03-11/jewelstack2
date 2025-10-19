
import React, { useState, useMemo } from 'react';
import { Customer, Order, OrderItem, OrderStatus, Product } from '../types';
import { UserPlusIcon, ContactIcon, CalendarInputIcon } from './Icons';

interface OrderFormProps {
  customers: Customer[];
  products: Product[];
  onSave: (orderData: Omit<Order, 'id' | 'total'>, newCustomer?: Omit<Customer, 'id' | 'avatarUrl' | 'lastPurchase' | 'totalOrders'>) => void;
  onBack: () => void;
}

const DetailTag: React.FC<{ label: string; selected: boolean; onClick: () => void; }> = ({ label, selected, onClick }) => (
    <button type="button" onClick={onClick} className={`text-center py-2 px-1 text-sm rounded-md transition-colors ${selected ? 'bg-brand-gold text-brand-dark font-semibold' : 'bg-brand-dark text-brand-text-secondary'}`}>
        {label}
    </button>
);

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void; }> = ({ enabled, onChange }) => (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`${enabled ? 'bg-brand-gold' : 'bg-brand-border'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
    >
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
);

const itemDetailTags = ["24K Gold", "18K Gold", "Platinum", "Rings", "Earrings", "Pendant", "Bracelet", "Custom"];

const OrderForm: React.FC<OrderFormProps> = ({ customers, products, onSave, onBack }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [selectedDetails, setSelectedDetails] = useState<string[]>(["24K Gold"]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // This is a mock save for UI demonstration purposes.
        // The original `onSave` logic is complex and tied to a different form structure.
        // It would need to be adapted to this new, more detailed form.
        alert('Order Confirmed (UI Demo)!');
        onBack();
    };

    return (
        <div className="text-brand-text-primary animate-fade-in space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Customer Information Card */}
                <div className="bg-brand-surface rounded-lg p-4 space-y-4">
                    <h3 className="text-brand-text-secondary font-semibold">Customer Information</h3>
                    <div className="relative">
                        <input type="text" placeholder="Name (Tap to Search/Add)" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-brand-text-primary placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-gold pr-10" />
                        <UserPlusIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text-secondary" />
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Contact Number" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-brand-text-primary placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-gold pr-10" />
                        <ContactIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text-secondary" />
                    </div>
                    <button type="button" className="w-full bg-brand-gold text-brand-dark font-bold py-2.5 rounded-lg hover:bg-brand-gold-hover transition-colors">
                        Link Existing Customer
                    </button>
                </div>

                {/* Item Details Card */}
                <div className="bg-brand-surface rounded-lg p-4">
                    <h3 className="text-brand-text-secondary font-semibold mb-3">Item Details</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {itemDetailTags.map(tag => (
                           <DetailTag 
                             key={tag}
                             label={tag}
                             selected={selectedDetails.includes(tag)}
                             onClick={() => {
                                 setSelectedDetails(prev => 
                                    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                                 )
                             }}
                           />
                        ))}
                    </div>
                </div>

                {/* Dates Card */}
                <div className="bg-brand-surface rounded-lg p-4">
                    <h3 className="text-brand-text-secondary font-semibold mb-3">Dates</h3>
                    <div className="relative">
                        <CalendarInputIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text-secondary" />
                        <input type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} placeholder="Estimated Delivery Date" className="w-full bg-brand-dark border border-brand-border rounded-lg pl-10 pr-10 py-3 text-brand-text-primary placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                        <CalendarInputIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text-secondary" />
                    </div>
                </div>
                
                {/* Pricing & Payment Card */}
                <div className="bg-brand-surface rounded-lg p-4 space-y-4">
                    <h3 className="text-brand-text-secondary font-semibold">Pricing & Payment</h3>
                    <div className="flex justify-between items-center">
                        <p>Live Gold Rate: <span className="font-bold text-white">₹6,350/gram</span></p>
                        <ToggleSwitch enabled={true} onChange={() => {}} />
                    </div>
                    <div className="flex justify-between items-center">
                        <p>Balance Due (₹)</p>
                        <span className="bg-brand-success-bg text-brand-success text-xs font-semibold px-2.5 py-1 rounded-full">Paid</span>
                    </div>
                     <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-secondary">₹</span>
                        <input type="number" placeholder="Advance Payment" className="w-full bg-brand-dark border border-brand-border rounded-lg pl-7 pr-4 py-3 text-brand-text-primary placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                    </div>
                </div>

                {/* Confirm Order Button */}
                <div className="pt-2">
                    <button type="submit" className="w-full bg-brand-gold text-brand-dark font-bold py-3.5 rounded-lg hover:bg-brand-gold-hover transition-colors text-lg">
                        Confirm Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;