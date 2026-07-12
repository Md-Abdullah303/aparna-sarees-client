"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Premium Quality",
    description: "Every saree is handpicked and undergoes strict quality checks to ensure you get only the finest fabrics.",
    icon: "✨",
  },
  {
    title: "Free Shipping",
    description: "Enjoy fast and free delivery across the country on all orders above ৳2000.",
    icon: "🚚",
  },
  {
    title: "Secure Payments",
    description: "Your transactions are protected with industry-leading encryption for a safe shopping experience.",
    icon: "🔒",
  },
  {
    title: "24/7 Support",
    description: "Our dedicated customer service team is always available to assist you with any queries.",
    icon: "💬",
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-6 sm:px-10 bg-[#fdfaf3]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-[#590d0d]">Why Choose Us?</h2>
          <p className="mt-4 text-[#590d0d]/70 max-w-2xl mx-auto">
            We are committed to providing the best shopping experience for our customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-[#590d0d]/5 text-center transition-shadow hover:shadow-md"
            >
              <div className="mx-auto w-16 h-16 bg-[#FFF9D0] rounded-full flex items-center justify-center text-3xl mb-6 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#590d0d] mb-3">{feature.title}</h3>
              <p className="text-sm text-[#590d0d]/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
