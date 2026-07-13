"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#3a2a1a] selection:bg-[#590d0d] selection:text-white pt-[72px]">
      {/* ─── Hero Section ─── */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-[#590d0d] px-6 py-24 text-center">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heritage-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="20" cy="20" r="3" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heritage-pattern)" />
          </svg>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-10 max-w-3xl"
        >
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-[#d9c9a8]">
            Discover Our Roots
          </span>
          <h1 className="font-display text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
            Weaving Stories, <br />
            <span className="italic text-[#d9c9a8]">Preserving Heritage</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-white/80">
            Aparna Sarees is more than a brand. It is a tribute to the artisans who pour their soul into every thread, keeping the ancient loom alive.
          </p>
        </motion.div>
      </section>

      {/* ─── Our Story Section ─── */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#e2d5c0] shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
                alt="Artisan weaving a saree"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="font-hero text-3xl italic">The Loom's Legacy</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeUp}>
                <h2 className="font-display text-4xl font-bold text-[#590d0d] sm:text-5xl">
                  Our Journey
                </h2>
                <div className="mt-4 h-1 w-20 bg-[#d9c9a8]" />
              </motion.div>
              <motion.p variants={fadeUp} className="text-lg leading-relaxed text-[#6b5040]">
                Born out of a profound love for traditional textiles, Aparna Sarees started as a humble initiative to connect master weavers directly with those who appreciate authentic craftsmanship.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg leading-relaxed text-[#6b5040]">
                For decades, the art of hand-weaving has been passed down through generations. Our mission is to ensure that these intricate techniques—from the delicate Jamdani motifs to the rich Banarasi brocades—are not lost to time. We travel across the country, curating masterpieces that reflect the rich cultural tapestry of our heritage.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us / Values ─── */}
      <section className="bg-[#f1ebe0] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 text-center"
          >
            <h2 className="font-display text-4xl font-bold text-[#590d0d]">What Defines Us</h2>
            <p className="mt-4 text-[#6b5040]">The pillars that uphold the Aparna Sarees legacy.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Value 1 */}
            <motion.div variants={fadeUp} className="group rounded-2xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#590d0d]/5 text-[#590d0d] transition-colors group-hover:bg-[#590d0d] group-hover:text-[#d9c9a8]">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-[#2a1a0a]">Authentic Craftsmanship</h3>
              <p className="text-sm leading-relaxed text-[#6b5040]">Every saree is 100% handwoven, guaranteeing an authenticity that machines can never replicate.</p>
            </motion.div>

            {/* Value 2 */}
            <motion.div variants={fadeUp} className="group rounded-2xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#590d0d]/5 text-[#590d0d] transition-colors group-hover:bg-[#590d0d] group-hover:text-[#d9c9a8]">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-[#2a1a0a]">Fair Trade</h3>
              <p className="text-sm leading-relaxed text-[#6b5040]">We ensure our weavers are compensated fairly, empowering their communities and preserving their trade.</p>
            </motion.div>

            {/* Value 3 */}
            <motion.div variants={fadeUp} className="group rounded-2xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-xl sm:col-span-2 lg:col-span-1">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#590d0d]/5 text-[#590d0d] transition-colors group-hover:bg-[#590d0d] group-hover:text-[#d9c9a8]">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-[#2a1a0a]">Timeless Elegance</h3>
              <p className="text-sm leading-relaxed text-[#6b5040]">Our designs bridge the gap between ancient motifs and modern aesthetics, suitable for any occasion.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Call to Action ─── */}
      <section className="px-6 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[#590d0d] text-center shadow-2xl"
        >
          <div className="px-8 py-16 md:px-16 md:py-20">
            <h2 className="font-hero text-4xl text-[#d9c9a8] md:text-5xl">
              Ready to Wear a Masterpiece?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-white/80">
              Explore our exclusive collection and find the perfect saree that resonates with your style and celebrates our heritage.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/browse-sarees"
                className="w-full rounded-full bg-[#d9c9a8] px-8 py-4 text-sm font-bold tracking-widest text-[#590d0d] transition-transform hover:scale-105 sm:w-auto"
              >
                EXPLORE COLLECTION
              </Link>
              <Link
                href="/contact"
                className="w-full rounded-full border border-[#d9c9a8] px-8 py-4 text-sm font-bold tracking-widest text-[#d9c9a8] transition-colors hover:bg-[#d9c9a8]/10 sm:w-auto"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
