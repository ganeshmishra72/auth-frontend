"use client";

import useAuth from "@/auth/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkLogin = useAuth(state => state.checkLogin);
  const router = useRouter();

  useEffect(() => {
    if (!checkLogin()) {
      router.replace("/login");
    }
  }, []);

  return <>{children}</>;
}
