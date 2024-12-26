"use client"
import { useAuth } from "@/context/AuthContext";
import { SearchResult } from "@/types/search";
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

    useEffect(() => {
        if (!session) return;

        const supabase = createClientComponentClient();
        const fetchUserAndHistory = async () => {
            try {
                setLoading(true);
                // Fetch user data
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('subscription_status, daily_check_limit, user_id, subscription_expiry')
                    .eq('email', session.email)
                    .single();
                    
                if (userError) throw new Error(userError.message);
                setUser(userData);

                // Fetch recent searches using user_id
                const { data: searchData, error: searchError } = await supabase
                    .from('fact_check_cache')
                    .select('*')
                    .eq('user_id', userData.user_id)
                    .order('last_accessed_at', { ascending: false })
                    .limit(10);

                if (searchError) throw new Error(searchError.message);
                setHistory(searchData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndHistory();
    }, [session]);

    return { history, user, loading };
}
