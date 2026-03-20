"use client";

import { ReactNode } from "react";
import { authClient } from "@/lib/auth/client";
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react/ui";

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <NeonAuthUIProvider authClient={authClient} emailOTP>
      {children}
    </NeonAuthUIProvider>
  );
}
