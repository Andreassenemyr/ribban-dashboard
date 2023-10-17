'use client';

import useStoreUserEffect from "@/hooks/use-store-user";

const HomePage = () => {
    const userId = useStoreUserEffect();

    if (userId === null) {
        return <div>Storing user...</div>;
     }
     
     return <div>Stored user ID: {userId}</div>;
};

export default HomePage;