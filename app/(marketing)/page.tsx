'use client'

import { useAuth0 } from "@auth0/auth0-react";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const MarketingPage = () => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useConvexAuth();

    const { loginWithRedirect } = useAuth0();

    const onLogin = () => {
        loginWithRedirect().then(() => {
        });
    }

    return (
        <div className="h-screen w-screen bg-slate-700 text-white flex flex-col">
            Hejsan
            {isAuthenticated ? (
                <button onClick={() => router.push('/projects')}>Gå in</button>
            ) : (
                <button onClick={() => loginWithRedirect()}>Log in</button>
            )}
        </div>
    )
};

export default MarketingPage;