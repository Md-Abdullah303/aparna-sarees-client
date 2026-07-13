"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      toast.error("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      toast.error("Password must contain at least one uppercase letter.");
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      toast.error("Password must contain at least one lowercase letter.");
      setLoading(false);
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      toast.error("Password must contain at least one number.");
      setLoading(false);
      return;
    }


    await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onSuccess: async () => {
          toast.success("Registration successful!");
          await authClient.signIn.email({ email, password });
          router.push("/");
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Registration failed");
          toast.error(ctx.error.message || "Registration failed");
          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Image Section */}
      <div className="relative hidden w-1/2 md:block">
        <Image
          src="/a_high_quality_professional_8k_photography_of_an_elegant_indian_woman_wearing_a.png"
          alt="Aparna Sarees"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-12 left-12 text-white">
          <h2 className="font-hero text-5xl font-bold">Aparna Sarees</h2>
          <p className="mt-4 max-w-sm text-lg font-light italic text-white/90">
            &quot;Preserving the loom, weaving the future. Experience the timeless allure of handcrafted heritage.&quot;
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="relative flex w-full items-center justify-center bg-[#FFF9D0] p-8 md:w-1/2 lg:p-16">

        {/* Back Button */}
        <Link
          href="/"
          className="absolute left-6 top-6 flex items-center gap-2 text-sm font-semibold text-[#590d0d]/70 transition-colors hover:text-[#590d0d] md:left-10 md:top-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </Link>

        <div className="w-full max-w-md text-[#590d0d]">
          <h1 className="font-display text-4xl font-semibold">Join the Legacy</h1>
          <p className="mt-3 text-sm text-[#590d0d]/70">
            Create an account to curate your personal collection of handcrafted elegance.
          </p>

          <form onSubmit={handleRegister} className="mt-10 space-y-6">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full border-b border-[#590d0d]/30 bg-transparent py-2 text-sm text-[#590d0d] placeholder:text-[#590d0d]/40 focus:border-[#590d0d] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full border-b border-[#590d0d]/30 bg-transparent py-2 text-sm text-[#590d0d] placeholder:text-[#590d0d]/40 focus:border-[#590d0d] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full border-b border-[#590d0d]/30 bg-transparent py-2 text-sm text-[#590d0d] placeholder:text-[#590d0d]/40 focus:border-[#590d0d] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                required
                id="terms"
                className="h-4 w-4 rounded border-[#590d0d] text-[#590d0d] focus:ring-[#590d0d]"
              />
              <label htmlFor="terms" className="text-xs text-[#590d0d]/80">
                I agree to the <span className="font-bold">Terms &amp; Conditions</span> and <span className="font-bold">Privacy Policy</span>.
              </label>
            </div>

            {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 bg-[#590d0d] py-3.5 text-sm font-bold tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "REGISTERING..." : "REGISTER"}
              {!loading && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-[#590d0d]/80">
            Already have an account?{" "}
            <Link href="/login" className="font-bold hover:underline">
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
