import { validateAuth } from "@/lib/auth-middleware";
import { createClient } from "@/lib/supabase";
import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

const supabase=createClient();

export async function POST(request: Request) {
  try {
    const {session} = await validateAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized', login: false }, { status: 401 });
    }

    const body = await request.json();
    const { feedback,cache_id } = body;
console.log(feedback);
    if (!feedback) {
      return NextResponse.json({ error: 'Feedback is required' }, { status: 400 });
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_id, email')
      .eq('email', session.user.email)
      .single();

    if (userError) {
      return NextResponse.json({ error: 'Error fetching user data', buy: false, login: false }, { status: 500 });
    }
   console.log({cache_id});
    const {  error } = await supabase
    .from('feedback')
    .upsert({
      user_id: userData.user_id,
      feedback_type: feedback,
      action_id: cache_id
    })
    console.log(error);
    if(error){
      return NextResponse.json({
        error: 'Something went wrong'
      })
    }
    return NextResponse.json({
      success:true
    })
    
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
