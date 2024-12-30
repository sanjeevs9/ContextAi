import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function validateAuth() {
  console.log("validating auth");
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();


  if (!session) {
    throw new Error('Unauthorized');
  }
  // console.log({session});

  const {data:userData,error:userError}=await supabase.from('users').select('user_id,email').eq('email',session.user.email).single();
  // console.log({userData});

  return {userData,session};
} 