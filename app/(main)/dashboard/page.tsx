"use client";

import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { sampleSubscription } from "@/data/SampleData";
import { useEffect } from "react";

export default function DashboardPage(){
    const router = useRouter();
    const { user }= useAuth();
    const { history, loading, subscription, user:userData } = useSubscription();

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        if(userData?.subscription_status === "free"){
            router.push("/");
            return;
        }
    }, [user, userData, router]);

    if (loading) {
        return <div><Loading/></div>;
    }

    return (
        <div className="">
            <Dashboard subscription={subscription || sampleSubscription} searchHistory={history} />
        </div>
    );
}
