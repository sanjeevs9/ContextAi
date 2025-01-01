"use client"
import { useAuth } from "@/context/AuthContext";
import { SearchResult, SubscriptionInfo } from "@/types/search";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";   

interface UserData {
    subscription_status: string;
    daily_check_limit: number;
    user_id: string;
    subscription_expiry: string;
}

export function useSubscription() {
    const { user: session } = useAuth();
    const [history, setHistory] = useState<SearchResult[]>([]);
    const [user, setUser] = useState<any|null>(null);
    const [loading, setLoading] = useState(true);
    const [subscription, setSubscription] = useState<SubscriptionInfo|null>(null);

    useEffect(() => {
        if (!session) return;

        const supabase = createClientComponentClient();
        const fetchUserAndHistory = async () => {
            try {
                setLoading(true);
                // Fetch user data
                const { data: userData, error: userError }: { data: UserData | null, error: Error | null } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', session.email)
                    .single();
                    
                if (userError) throw new Error(userError.message);
                setUser(userData);

                // Fetch recent searches using user_id
                const { data: searchData, error: searchError } = await supabase
                    .from('fact_check_cache')
                    .select('*')
                    .eq('user_id', userData?.user_id)
                    .order('last_accessed_at', { ascending: false })
                    .limit(10);

                if (searchError) throw new Error(searchError.message);
                setHistory(searchData);
                
                const {data:subscriptionData,error:subscriptionError}=await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id',userData?.user_id)
                .single();

                if(subscriptionData){
                    setSubscription(subscriptionData);
                }
                
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndHistory();
    }, [session]);

    return { history, user, loading, subscription };
}
