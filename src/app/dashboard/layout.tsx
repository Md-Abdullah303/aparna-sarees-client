"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        // Not logged in -> unauthorized or login page
        router.push("/401"); // Redirecting to unauthorized as requested
      } else {
        const role = session.user?.role || "user";
        // If they are on exactly /dashboard, redirect based on role
        if (pathname === "/dashboard") {
           router.push(`/dashboard/${role}`);
        } else if (pathname.startsWith("/dashboard/")) {
           // Basic role check: if trying to access another role's dashboard
           const section = pathname.split("/")[2]; // e.g. "admin", "seller", "user"
           if (section !== role && section !== "profile") {
               router.push("/403"); // Or some forbidden page, or their correct dashboard
               // Or simply redirect to their respective dashboard
               // router.push(`/dashboard/${role}`);
           }
        }
      }
    }
  }, [session, isPending, router, pathname]);

  if (isPending) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}
