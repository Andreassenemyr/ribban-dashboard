import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth0 } from "@auth0/auth0-react";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect, useState } from "react";

export default function useStoreUserEffect() {
    const { isAuthenticated } = useConvexAuth();
    const { user } = useAuth0();

    const [userId, setUserId] = useState<Id<"users"> | null>(null);
    const storeUser = useMutation(api.users.store);

    useEffect(() => {
        if (!isAuthenticated) {
          return;
        }
       
        async function createUser() {
          const id = await storeUser();
          setUserId(id);
        }
        
        createUser();
        return () => setUserId(null);
        // Make sure the effect reruns if the user logs in with
        // a different identity
    }, [isAuthenticated, storeUser, user?.id]);

    return userId;
}