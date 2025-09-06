import React, { useState } from 'react';
import { Lock, Star, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface PremiumGateProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const PremiumGate: React.FC<PremiumGateProps> = ({ 
  children, 
  title = "Premium Content",
  description = "This content is available to premium subscribers only."
}) => {
  const { user, subscribe, isLoading } = useAuth();
  const [isSubscribing, setIsSubscribing] = useState(false);

  if (user?.isPremium) {
    return <>{children}</>;
  }

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    const success = await subscribe('premium');
    if (success) {
      // Content will automatically show after subscription
    }
    setIsSubscribing(false);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Lock className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold text-gray-900">Premium Benefits</span>
        </div>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Access to complete article archive</li>
          <li>• Ad-free reading experience</li>
          <li>• Exclusive weekly deep-dive reports</li>
          <li>• Early access to breaking news</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-3xl font-bold text-gray-900">$9</span>
          <span className="text-gray-600">/month</span>
        </div>
        
        <button
          onClick={handleSubscribe}
          disabled={isSubscribing || isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <CreditCard className="w-5 h-5" />
          <span>{isSubscribing ? 'Processing...' : 'Upgrade to Premium'}</span>
        </button>
        
        <p className="text-xs text-gray-500">
          Cancel anytime. No long-term commitments.
        </p>
      </div>
    </div>
  );
};

export default PremiumGate;