"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const API = "/api/server";

// ─── Inner Checkout Form ───────────────────────────────────────
function CheckoutForm({
  saree,
}: {
  saree: { name: string; price: number; image?: string; category?: string };
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMsg("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMsg(error.message || "Payment failed.");
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      router.push(
        `/payment-success?name=${encodeURIComponent(saree.name)}&price=${saree.price}`
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-[#e2d5c0] bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#590d0d]">
          Payment Details
        </h3>
        <PaymentElement
          options={{
            layout: "tabs",
            wallets: {
              applePay: "never",
              googlePay: "never",
            },
          }}
        />
      </div>

      {errorMsg && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          ⚠️ {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full rounded-full bg-[#590d0d] py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#7a1010] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8h4l-3 3-3-3h4z" />
            </svg>
            Processing Payment...
          </span>
        ) : (
          `Pay ৳${saree.price.toLocaleString()}`
        )}
      </button>

      <p className="text-center text-xs text-[#9d713c]">
        🔒 Secured by Stripe — Your payment info is encrypted and safe.
      </p>
    </form>
  );
}

import { useSession } from "@/lib/auth-client";

// ─── Checkout Page Wrapper ─────────────────────────────────────
function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sareeId = searchParams.get("sareeId");
  const [saree, setSaree] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loadError, setLoadError] = useState("");
  const [step, setStep] = useState<"loading" | "ready" | "error">("loading");
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return; // wait for session to load

    // ── Auth Guard ──────────────────────────────────────────────
    if (!session) {
      const redirectUrl = sareeId
        ? `/checkout?sareeId=${sareeId}`
        : "/checkout";
      router.replace(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
      return;
    }
    
    if (!sareeId) {
      setLoadError("No saree selected.");
      setStep("error");
      return;
    }

    // Fetch saree details
    fetch(`${API}/api/sarees/${sareeId}`)
      .then((r) => r.json())
      .then(async (data) => {
        if (!data || !data.price) throw new Error("Saree not found");
        setSaree(data);

        // Create payment intent
        const res = await fetch(`${API}/api/stripe/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: data.price,
            sareeId: data._id,
            sareeName: data.name,
            userEmail: session?.user?.email || "",
          }),
        });

        const piData = await res.json();
        if (!piData.clientSecret) throw new Error("Could not create payment");
        setClientSecret(piData.clientSecret);
        setStep("ready");
      })
      .catch((err) => {
        setLoadError(err.message || "Something went wrong.");
        setStep("error");
      });
  }, [sareeId, isPending, session]);

  if (step === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fdf8f0]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#590d0d]/20 border-t-[#590d0d]" />
          <p className="text-sm font-medium text-[#9d713c]">Preparing secure checkout...</p>
        </div>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#fdf8f0]">
        <p className="text-lg font-bold text-red-600">{loadError}</p>
        <Link href="/browse-sarees" className="text-[#590d0d] hover:underline">
          ← Back to Sarees
        </Link>
      </div>
    );
  }

  const appearance = {
    theme: "stripe" as const,
    variables: {
      colorPrimary: "#590d0d",
      colorBackground: "#ffffff",
      colorText: "#1a1a1a",
      colorDanger: "#df1b41",
      fontFamily: "Georgia, serif",
      borderRadius: "8px",
    },
  };

  return (
    <div className="min-h-screen bg-[#fdf8f0] pt-28 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/browse-sarees/${sareeId}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#9d713c] hover:text-[#590d0d]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Saree
          </Link>
          <h1 className="mt-4 font-display text-3xl font-bold text-[#1a1a1a]">
            Secure Checkout
          </h1>
          <p className="mt-1 text-sm text-[#6b5040]">
            Complete your purchase safely with Stripe
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left — Payment Form */}
          <div className="lg:col-span-3">
            <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
              <CheckoutForm saree={saree} />
            </Elements>
          </div>

          {/* Right — Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 rounded-2xl border border-[#e2d5c0] bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-[#590d0d]">
                Order Summary
              </h3>

              {/* Saree image + name */}
              <div className="flex gap-4">
                {saree.images && saree.images.length > 0 && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={saree.images[0]}
                    alt={saree.name}
                    className="h-24 w-20 flex-shrink-0 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0">
                  <h4 className="font-display text-base font-semibold text-[#1a1a1a] line-clamp-2">
                    {saree.name}
                  </h4>
                  {saree.category && (
                    <p className="mt-1 text-xs text-[#9d713c] uppercase tracking-wider">
                      {saree.category}
                    </p>
                  )}
                  {saree.fabric && (
                    <p className="mt-1 text-xs text-[#6b5040]">
                      Fabric: {saree.fabric}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-[#e2d5c0] pt-5">
                <div className="flex justify-between text-sm text-[#6b5040]">
                  <span>Subtotal</span>
                  <span>৳{saree.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6b5040]">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between border-t border-[#e2d5c0] pt-3 text-base font-bold text-[#1a1a1a]">
                  <span>Total</span>
                  <span className="text-[#590d0d]">৳{saree.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 flex flex-col gap-2">
                {[
                  { icon: "🔒", text: "SSL Encrypted Payment" },
                  { icon: "✅", text: "Stripe Verified Checkout" },
                  { icon: "📦", text: "Free Delivery Included" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2 text-xs text-[#9d713c]">
                    <span>{b.icon}</span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}
