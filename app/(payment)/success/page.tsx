"use client"

import { useSearchParams } from "next/navigation";
import { useEffect,useState } from "react";
import { createClient } from "@/lib/supabase";


export default function Success() {
  const [error,setError]=useState(false);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const userId = searchParams.get('userId');
  const plan_type = searchParams.get('plan_type');
  const [loading,setLoading]=useState(false);

 
  

    return (
      <div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
      </div>
    );
  }