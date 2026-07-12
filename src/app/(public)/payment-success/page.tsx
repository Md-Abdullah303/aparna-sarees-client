"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Your Saree";
  const price = searchParams.get("price") || "";
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  const orderId = `APR-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf8f0] to-[#f1ebe0] pt-24 pb-16 px-4">
      <div className="mx-auto max-w-2xl">
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-green-100 shadow-lg shadow-green-200"
            >
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="h-16 w-16 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
              </motion.svg>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-4xl font-bold text-[#1a1a1a] sm:text-5xl"
            >
              Payment Successful!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-3 text-lg text-[#6b5040]"
            >
              Thank you for your purchase. Your saree is on its way!
            </motion.p>

            {/* Order Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 overflow-hidden rounded-2xl border border-[#e2d5c0] bg-white shadow-xl shadow-[#590d0d]/5"
            >
              {/* Card Header */}
              <div className="bg-[#590d0d] px-8 py-6 text-center">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#ffe088]/80">
                  Aparna Sarees
                </p>
                <p className="mt-1 text-xl font-bold text-[#ffe088]">Order Confirmed</p>
              </div>

              {/* Card Body */}
              <div className="px-8 py-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#f0ebe0] pb-4">
                    <span className="text-sm text-[#9d713c] uppercase tracking-wider">Order ID</span>
                    <span className="font-mono text-sm font-bold text-[#1a1a1a]">{orderId}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#f0ebe0] pb-4">
                    <span className="text-sm text-[#9d713c] uppercase tracking-wider">Item</span>
                    <span className="text-sm font-semibold text-[#1a1a1a] max-w-[55%] text-right">{name}</span>
                  </div>
                  {price && (
                    <div className="flex items-center justify-between border-b border-[#f0ebe0] pb-4">
                      <span className="text-sm text-[#9d713c] uppercase tracking-wider">Amount Paid</span>
                      <span className="text-lg font-bold text-[#590d0d]">
                        ৳{Number(price).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-b border-[#f0ebe0] pb-4">
                    <span className="text-sm text-[#9d713c] uppercase tracking-wider">Shipping</span>
                    <span className="text-sm font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#9d713c] uppercase tracking-wider">Status</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      Payment Confirmed
                    </span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mt-8 rounded-xl bg-[#fdf8f0] px-5 py-4 text-sm text-[#6b5040]">
                  <p className="font-semibold text-[#590d0d] mb-2">📦 What happens next?</p>
                  <ul className="space-y-1.5 list-none">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#9d713c]">→</span>
                      <span>We'll carefully pack your saree within 24 hours.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#9d713c]">→</span>
                      <span>Expected delivery: 3–5 business days.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#9d713c]">→</span>
                      <span>You will receive a confirmation email shortly.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Link
                href="/browse-sarees"
                className="inline-flex items-center gap-2 rounded-full bg-[#590d0d] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#7a1010] hover:shadow-xl"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-[#590d0d] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-[#590d0d] transition-all hover:bg-[#590d0d]/5"
              >
                Go to Home
              </Link>
            </motion.div>

            {/* Footer note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-10 text-xs text-[#b0998a]"
            >
              Questions? Contact us at{" "}
              <a href="mailto:support@aparnasarees.com" className="text-[#9d713c] hover:underline">
                support@aparnasarees.com
              </a>
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <PaymentSuccessContent />
    </Suspense>
  );
}
