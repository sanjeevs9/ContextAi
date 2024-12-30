import Stripe from "stripe";
import { NextRequest } from "next/server";
// import { OrderTable, db } from "@/lib/drizzleOrm";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase";

const supabase = createClient();

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
      // const checkoutSessionAsyncPaymentFailed = event.data.object;
    //   const {data,error}=await supabase.from('subscriptions').insert({
    //     user_id:checkoutSessionAsyncPaymentFailed.metadata.userId,
    //     email:checkoutSessionAsyncPaymentFailed.metadata.email,
    //     status:"failed"
    //   })
    //   if(error){
    //     return new Response(`Webhook Error: ${error}`, {
    //       status: 400,
    //     });
    //   }
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      console.log({checkoutSessionAsyncPaymentSucceeded});
      console.log("checkoutSessionAsyncPaymentSucceeded")
      break;

     // this is for the success page
    case "checkout.session.completed":

      const checkoutSessionCompleted =  event.data.object;

      if(checkoutSessionCompleted.metadata==null || checkoutSessionCompleted.metadata.userId==null){

        return new Response(`Webhook Error: ${"metadata not found"}`, {
          status: 400,
        });
      }

      const {data:subscriptionData,error:subscriptionError}=await supabase.from('subscriptions').update({
        payment_status:"completed",
        stripe_transaction_id:checkoutSessionCompleted.id,
      }).eq('user_id',checkoutSessionCompleted.metadata.userId).select("end_date")

      if(subscriptionError){  
        return new Response(`Webhook Error: ${subscriptionError}`, {
          status: 400,
        });
      }

      const {data:userData,error:userError}=await supabase.from('users').update({
        subscription_status:"premium",
        
        subscription_expiry: subscriptionData?.[0]?.end_date || null,
      }).eq('user_id',checkoutSessionCompleted.metadata.userId).select("*")

      console.log({userData});

      if(userError){
        return new Response(`Webhook Error: ${userError}`, {
          status: 400,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return new Response("RESPONSE EXECUTE", {
    status: 200,
  })
}   
