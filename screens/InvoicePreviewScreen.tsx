
import React from 'react';

const InvoicePreviewScreen: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto font-serif">
      <header className="flex justify-between items-center pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">JewelStack Inc.</h1>
          <p className="text-sm">123 Gold Lane, Jewel City, 110022</p>
        </div>
        <h2 className="text-4xl font-light text-gray-500">INVOICE</h2>
      </header>

      <section className="flex justify-between mt-6">
        <div>
          <h3 className="font-semibold text-gray-600">BILL TO</h3>
          <p>Rohan Sharma</p>
          <p>456 Diamond St, Crystal Town</p>
          <p>Mumbai, 400001</p>
        </div>
        <div className="text-right">
          <p><span className="font-semibold">Invoice #:</span> INV-0012</p>
          <p><span className="font-semibold">Date:</span> Oct 26, 2023</p>
          <p><span className="font-semibold">Due Date:</span> Nov 10, 2023</p>
        </div>
      </section>

      <section className="mt-8">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 font-semibold">Item</th>
              <th className="p-2 font-semibold text-right">Qty</th>
              <th className="p-2 font-semibold text-right">Price</th>
              <th className="p-2 font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">Elegant Diamond Ring (18K)</td>
              <td className="p-2 text-right">1</td>
              <td className="p-2 text-right">₹55,000</td>
              <td className="p-2 text-right">₹55,000</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="flex justify-end mt-6">
        <div className="w-1/2">
          <div className="flex justify-between text-gray-700">
            <p>Subtotal:</p>
            <p>₹55,000.00</p>
          </div>
          <div className="flex justify-between text-gray-700">
            <p>Taxes (GST @ 3%):</p>
            <p>₹1,650.00</p>
          </div>
          <div className="flex justify-between font-bold text-xl mt-2 pt-2 border-t">
            <p>Total:</p>
            <p>₹56,650.00</p>
          </div>
        </div>
      </section>
      
      <footer className="mt-12 text-center text-xs text-gray-500">
        <p>Thank you for your business!</p>
        <p>If you have any questions, please contact us at support@jewelstack.com</p>
      </footer>
    </div>
  );
};

export default InvoicePreviewScreen;
