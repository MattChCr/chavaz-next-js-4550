'use client'; 
export const dynamic = 'force-dynamic';

import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <h2>Account</h2>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <div style={{ flexShrink: 0 }}>
          <AccountNavigation />
        </div>
        <div style={{ flexGrow: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
