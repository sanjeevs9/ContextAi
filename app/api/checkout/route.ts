import { validateAuth } from '@/lib/auth-middleware';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase';

const supabase=createClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia', // Use the latest API version
});

export async function POST(request: NextRequest) {
    const {price,model}=await request.json();
    const {session,userData} = await validateAuth();
 
    if(!session || !userData){
        console.log("Unauthorized");
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }

  
    let time=0;
    if(model==="premium_monthly"){
      time=30*24*60*60*1000;
    }else if(model==="premium_annual"){
      time=365*24*60*60*1000;
    }

    const {data,error}=await supabase.from('subscriptions').insert({
        // stripe_transaction_id:sessionId,
        payment_status:"pending",
        user_id:userData.user_id,
        plan_type:model,
        start_date:new Date(),
        end_date:new Date(new Date().getTime() + time),
      }).select("*")
      if(error){
        console.log(error)
        return NextResponse.json({error:"Error adding to DB"},{status:500})
      }
      console.log({data});

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Your Product Name',
              metadata: {model:model},
              // Add description and images if needed
            },
            unit_amount: price, // Amount in cents (e.g., $20.00)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?session_id={CHECKOUT_SESSION_ID}&userId=${userData.user_id}&plan_type=${model}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata:{
        userId:userData.user_id,
        email:userData.email,
        plan_type:model
      }

    });
    console.log(checkoutSession.status);

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}