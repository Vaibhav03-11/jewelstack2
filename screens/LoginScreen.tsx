
import React, { useState } from 'react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const switchView = () => setIsLoginView(!isLoginView);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-text-primary flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-5xl font-serif text-center mb-8 text-brand-gold">JewelStack</h1>
        
        {isLoginView ? (
          <div className="w-full">
            <h2 className="text-2xl text-center mb-6">Welcome Back</h2>
            <form onSubmit={(e) => { e.preventDefault(); onLoginSuccess(); }}>
              <input type="email" placeholder="Email or Phone Number" className="w-full bg-transparent border border-brand-gold rounded-lg px-4 py-3 mb-4 text-white placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-gold" />
              <input type="password" placeholder="Password" className="w-full bg-transparent border border-brand-gold rounded-lg px-4 py-3 mb-4 text-white placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-gold" />
              <div className="text-right mb-6">
                <a href="#" className="text-sm text-brand-text-secondary hover:text-brand-gold">Forgot Password?</a>
              </div>
              <button type="submit" className="w-full bg-brand-gold text-brand-dark font-bold py-3 rounded-lg text-lg hover:bg-brand-gold-hover transition-colors">
                Log In
              </button>
            </form>
            <p className="text-center mt-6 text-brand-text-secondary">
              Don't have an account? <button onClick={switchView} className="font-bold text-brand-gold hover:underline">Sign Up</button>
            </p>
          </div>
        ) : (
          <div className="w-full">
            <h2 className="text-2xl text-center mb-6">Create Account</h2>
            <form onSubmit={(e) => { e.preventDefault(); onLoginSuccess(); }}>
              <input type="text" placeholder="Full Name" className="w-full bg-transparent border border-brand-gold rounded-lg px-4 py-3 mb-4 text-white placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-gold" />
              <input type="email" placeholder="Email or Phone Number" className="w-full bg-transparent border border-brand-gold rounded-lg px-4 py-3 mb-4 text-white placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-gold" />
              <input type="password" placeholder="Password" className="w-full bg-transparent border border-brand-gold rounded-lg px-4 py-3 mb-4 text-white placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-gold" />
              <input type="password" placeholder="Confirm Password" className="w-full bg-transparent border border-brand-gold rounded-lg px-4 py-3 mb-4 text-white placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-gold" />
               <div className="flex items-center mb-6">
                <input id="terms" type="checkbox" className="h-4 w-4 rounded border-brand-border text-brand-gold focus:ring-brand-gold" />
                <label htmlFor="terms" className="ml-2 block text-sm text-brand-text-secondary">I agree to the <a href="#" className="text-brand-gold hover:underline">Terms & Conditions</a></label>
              </div>
              <button type="submit" className="w-full bg-brand-gold text-brand-dark font-bold py-3 rounded-lg text-lg hover:bg-brand-gold-hover transition-colors">
                Sign Up
              </button>
            </form>
            <p className="text-center mt-6 text-brand-text-secondary">
              Already have an account? <button onClick={switchView} className="font-bold text-brand-gold hover:underline">Log In</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;