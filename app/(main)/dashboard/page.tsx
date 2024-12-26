"use client"
import { useEffect } from "react";
import  {Dashboard} from "@/components/dashboard/Dashboard";
import { sampleSubscription, sampleSearches } from "@/data/SampleData";
import { useAuth } from "@/context/AuthContext";
import { redirect, useRouter } from "next/navigation";
import { useSubscription } from "@/hooks/useSubscription";
import Loading from "./loading";

export default function DashboardPage(){
    const router = useRouter();
    const { user }= useAuth();
    const { history, user: userData, loading } = useSubscription();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (loading) {
        return <div><Loading/></div>;
    }

    return <div className="">
        <Dashboard subscription={sampleSubscription} searchHistory={history} />
    </div>
}
