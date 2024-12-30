"use client"
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export const handleCheckout = async ({price,model}:{price:number,model:string}) => {
    console.log(price,model)
    try {
      const stripe = await stripePromise;
      if (stripe) {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({price,model}),
        });

        const { sessionId } = await response.json();
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (error) {
          window.location.href = "/error";
        }
      }
    } catch (err) {
      console.error("Error in creating checkout session:", err);
      window.location.href = "/error";
    }
  };

const CheckoutButton = () => {  
 

  return <button onClick={()=>handleCheckout({price:2000,model:"premium_monthly"})}>Buy Now</button>;
};

export default CheckoutButton;
