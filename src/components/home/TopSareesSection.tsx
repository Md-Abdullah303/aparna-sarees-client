"use client";

import Image from "next/image";
import Link from "next/link";
import { formatBdt, TOP_SAREES } from "@/lib/mock-data";
import { SectionHeading } from "./SectionHeading";
import { motion } from "framer-motion";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-[var(--color-primary)]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={i < Math.floor(rating) ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
          className="h-4 w-4"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-[var(--color-text-muted)]">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

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

export function TopSareesSection() {
  return (
    <section className="bg-[var(--color-background)] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Featured Collection"
          title="Top Sarees"
          description="Handpicked bestsellers loved by our customers — exquisite weaves for weddings, festivals, and everyday elegance."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TOP_SAREES.map((saree) => (
            <motion.article
              variants={item}
              key={saree.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-surface)] shadow-lg shadow-black/10 transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={saree.image}
                  alt={saree.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                    saree.inStock
                      ? "bg-emerald-500/90 text-white"
                      : "bg-red-500/90 text-white"
                  }`}
                >
                  {saree.inStock ? "Available" : "Out of Stock"}
                </span>
              </div>

              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-primary)]">
                  {saree.category}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-[var(--color-text)]">
                  {saree.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--color-text-muted)]">
                  {saree.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-semibold text-[var(--color-primary)]">
                    {formatBdt(saree.price)}
                  </p>
                  <StarRating rating={saree.rating} />
                </div>
                <Link
                  href={`/sarees/${saree.id}`}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[var(--color-primary)] py-2.5 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-primary)]/10"
                >
                  Show Details
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            href="/browse-sarees"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-8 py-3 text-sm font-semibold text-[var(--color-primary-foreground)] transition-transform hover:scale-[1.02]"
          >
            View All Sarees
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
