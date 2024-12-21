import { PricingTier } from './PricingTier';

const pricingTiers = [
  {
    name: 'Free',
    price: null,
    description: 'Perfect for getting started with fact-checking',
    features: [
      { text: 'Basic fact-checking', included: true },
      { text: '100 checks per month', included: true },
      { text: 'Access to public sources', included: true },
      { text: 'Browser extension', included: true },
      { text: 'Advanced AI analysis', included: false },
      { text: 'Priority support', included: false },
    ],
    buttonText: 'Get Started',
  },
  {
    name: 'Pro',
    price: 19.90,
    description: 'Ideal for professionals and content creators',
    features: [
      { text: 'Advanced fact-checking', included: true },
      { text: 'Unlimited checks', included: true },
      { text: 'Premium sources access', included: true },
      { text: 'Browser extension', included: true },
      { text: 'Advanced AI analysis', included: true },
      { text: 'Priority support', included: true },
    ],
    buttonText: 'Start Pro Trial',
    highlighted: true,
  },
  {
    name: 'Team',
    price: 49.90,
    description: 'Perfect for teams and organizations',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Team collaboration', included: true },
      { text: 'Admin dashboard', included: true },
      { text: 'API access', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Dedicated support', included: true },
    ],
    buttonText: 'Contact Sales',
  },
];

export function PricingSection() {
  return (
    <div id="pricing" className="bg-gray-50 py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#001F54] mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your needs. All plans include our core fact-checking capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <PricingTier
              key={index}
              name={tier.name}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              buttonText={tier.buttonText}
              highlighted={tier.highlighted}
            />
          ))}
        </div>
      </div>
    </div>
  );
}