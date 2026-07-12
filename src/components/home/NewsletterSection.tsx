"use client";

import { motion } from "framer-motion";

export function NewsletterSection() {
  return (
    <section className="py-24 px-6 sm:px-10 bg-[#590d0d] relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#7c1414] rounded-full mix-blend-multiply filter blur-3xl opacity-70 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#8b1a1a] rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/3 translate-y-1/3"></div>

      <div className="mx-auto max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#FFF9D0]">Join Our Newsletter</h2>
          <p className="mt-6 text-[#FFF9D0]/80 text-lg max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates on new saree collections, exclusive offers, and styling tips.
          </p>
          
          <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="flex-1 rounded-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFF9D0]/50 transition-all"
            />
            <button 
              type="submit"
              className="rounded-full bg-[#FFF9D0] px-8 py-4 text-sm font-bold text-[#590d0d] transition-transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Subscribe
            </button>
          </form>
          
          <p className="mt-4 text-xs text-[#FFF9D0]/50">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
