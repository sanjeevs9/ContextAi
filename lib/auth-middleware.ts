import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';


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
  if(userError){
    throw new Error('Error fetching user data');
  }

  return {userData,session};
} 