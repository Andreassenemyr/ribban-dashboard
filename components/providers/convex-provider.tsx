"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import { Auth0Provider } from "@auth0/auth0-react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  return (
    <Auth0Provider
      domain="https://dev-ribban.eu.auth0.com"
      clientId="nD8U3sLaUpMsakNIGLouppDuXesBOlaE"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      useRefreshTokens
      cacheLocation='localstorage'
    >
      <ConvexProviderWithAuth0
        client={convex}
      >
        {children}
      </ConvexProviderWithAuth0>
    </Auth0Provider>
  );
};