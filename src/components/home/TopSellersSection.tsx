"use client";

import Link from "next/link";
import { TOP_SELLERS } from "@/lib/mock-data";
import { SectionHeading } from "./SectionHeading";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function TopSellersSection() {
  return (
    <section className="border-t border-white/10 bg-[var(--color-surface)] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Trusted Artisans"
          title="Top Sellers"
          description="Meet our highest-rated sellers — passionate curators of fine sarees with exceptional craftsmanship."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TOP_SELLERS.map((seller, index) => (
            <motion.article
              variants={item}
              key={seller.id}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-background)] p-6 shadow-lg shadow-black/10 transition-transform hover:-translate-y-1"
            >
              <div className="absolute right-4 top-4 font-display text-5xl font-bold text-[var(--color-primary)]/15">
                #{index + 1}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/20 font-display text-xl font-semibold text-[var(--color-primary)]">
                  {seller.avatar}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-[var(--color-text)]">
                    {seller.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {seller.shopName}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                <div className="text-center">
                  <p className="text-lg font-semibold text-[var(--color-primary)]">
                    {seller.totalProducts}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-[var(--color-primary)]">
                    {seller.rating}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-[var(--color-primary)]">
                    {seller.totalSales}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">Sales</p>
                </div>
              </div>

              <Link
                href="/browse-sarees"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-[var(--color-primary)] py-2.5 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-primary)]/10"
              >
                View Shop
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
