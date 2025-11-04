'use client';
export const dynamic = 'force-dynamic';

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
    } else {
      router.push("/Account/Profile");
    }
  }, [currentUser, router]);

  return null; 
}
