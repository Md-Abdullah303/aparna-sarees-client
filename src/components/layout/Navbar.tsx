"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assests/logo.png";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/browse-sarees", label: "Browse Sarees" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <nav className="mx-auto max-w-7xl rounded-full bg-[#fdfaf3] border border-[#e5d5c5] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between px-5 py-3 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image src={logo} alt="logo Img" width={100} height={100} className="w-8" />
            <h1 className="font-display text-xl tracking-wider text-[#9d713c] transition-opacity hover:opacity-80 sm:text-2xl">
              Aparna Sarees
            </h1>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <ul className="hidden items-center gap-2 md:flex lg:gap-4">
              {NAV_LINKS.map(({ href, label }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`px-3 py-2 text-sm font-medium transition-colors lg:text-[15px] ${
                        active
                          ? "text-[#9d713c] font-semibold"
                          : "text-[#5a4838] hover:text-[#9d713c]"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}

              {!user && (
                <>
                  <li>
                    <Link
                      href="/login"
                      className={`px-3 py-2 text-sm font-medium transition-colors lg:text-[15px] ${
                        isActive(pathname, "/login")
                          ? "text-[#9d713c] font-semibold"
                          : "text-[#5a4838] hover:text-[#9d713c]"
                      }`}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="rounded-full bg-[#590d0d] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:text-[15px]"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-[#e5d5c5] ring-offset-2 ring-offset-[#fdfaf3] transition-all hover:opacity-80">
                    <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                    <AvatarFallback className="bg-[#9d713c] text-white text-xs">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white border-[#e5d5c5]">
                  <div className="px-2 py-1.5 text-sm font-medium text-[#5a4838]">
                    {user.name}
                  </div>
                  <DropdownMenuSeparator className="bg-[#e5d5c5]" />
                  <DropdownMenuItem onClick={() => router.push("/dashboard")} className="cursor-pointer text-[#5a4838] hover:bg-[#fdfaf3] hover:text-[#9d713c]">
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <ThemeToggle />

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#5a4838] transition-colors hover:bg-[#e5d5c5]/30 md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <ul className="border-t border-[#e5d5c5] px-5 py-3 md:hidden">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#e5d5c5]/30 text-[#9d713c]"
                        : "text-[#5a4838] hover:bg-[#e5d5c5]/10"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            {!user && (
              <li>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive(pathname, "/login")
                      ? "bg-[#e5d5c5]/30 text-[#9d713c]"
                      : "text-[#5a4838] hover:bg-[#e5d5c5]/10"
                  }`}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}

