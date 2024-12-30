"use client"
import { Check } from 'lucide-react';
import { formatPrice } from '../../utils/formatting';
import { handleCheckout } from '../stripe/Checkout';
import { useSubscription } from '@/hooks/useSubscription';
import { useRouter } from 'next/router';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTierProps {
  name: string;
  price: number | null;
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
  buttonText: string;
  model:string;
}

export function PricingTier({
  name,
  price,
  description,
  features,
  highlighted = false,
  buttonText,
  model
}: PricingTierProps) {
const {user} = useSubscription();
const router = useRouter();

const handleNavigation = (path: string) => {
  // Use router push instead of direct window.location
  router.push(path);
};

async function handlePricingAction() {
  try {
    if (user?.subscription_status === "premium") {
      handleNavigation("/dashboard");
      return;
    }

    if (name !== "Free") {
      await handleCheckout({
        price: Number(price) * 100,
        model: model
      });
    } else {
      handleNavigation("/dashboard");
    }
  } catch (error) {
    console.error("Error processing pricing action:", error);
    // Add appropriate error handling/notification here
  }
}

  return (
    <div className={`relative rounded-2xl ${
      highlighted 
        ? 'bg-gradient-to-b from-[#001F54] to-[#000B1D] text-white border-2 border-[#00FFC8]' 
        : 'bg-white border border-gray-200'
    } p-8 shadow-lg transform transition-transform hover:scale-105`}>
      {highlighted && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#FFD700] text-[#001F54] px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <h3 className={`text-xl font-bold ${highlighted ? 'text-white' : 'text-[#001F54]'}`}>
          {name}
        </h3>
        <div className="mt-4 mb-2">
          {price === null ? (
            <span className={`text-4xl font-bold ${highlighted ? 'text-white' : 'text-[#001F54]'}`}>
              Free
            </span>
          ) : (
            <div className="flex items-center justify-center">
              <span className={`text-4xl font-bold ${highlighted ? 'text-white' : 'text-[#001F54]'}`}>
                {formatPrice(price)}
              </span>
              <span className={`ml-2 text-sm ${highlighted ? 'text-gray-300' : 'text-gray-500'}`}>
                /month
              </span>
            </div>
          )}
        </div>
        <p className={`${highlighted ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          {description}
        </p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className={`w-5 h-5 ${
              feature.included 
                ? highlighted ? 'text-[#00FFC8]' : 'text-[#001F54]' 
                : 'text-gray-300'
            } mr-3`} />
            <span className={`${
              feature.included 
                ? highlighted ? 'text-gray-200' : 'text-gray-700'
                : highlighted ? 'text-gray-400' : 'text-gray-400'
            }`}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <button 
        onClick={handlePricingAction} 
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          highlighted
            ? 'bg-[#00FFC8] text-[#001F54] hover:bg-[#00FFC8]/90'
            : 'bg-[#001F54] text-white hover:bg-[#001F54]/90'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}