import Stripe from "stripe";
import { NextRequest } from "next/server";
// import { OrderTable, db } from "@/lib/drizzleOrm";
import { headers } from "next/headers";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const sig = headers().get("stripe-signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.log("error")
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      console.log("checkoutSessionAsyncPaymentFailed")
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      console.log("checkoutSessionAsyncPaymentSucceeded")
      break;
    case "checkout.session.completed":
      const checkoutSessionCompleted: any = event.data.object;
      console.log(checkoutSessionCompleted)
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return new Response("RESPONSE EXECUTE", {
    status: 200,
  })
}   
