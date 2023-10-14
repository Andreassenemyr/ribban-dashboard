'use client'

import { useAuth0 } from "@auth0/auth0-react";

const MarketingPage = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="h-screen w-screen bg-slate-700 text-white flex flex-col">
            Hejsan
            <button onClick={() => loginWithRedirect()}>Log in</button>
        </div>
    )
};

export default MarketingPage;