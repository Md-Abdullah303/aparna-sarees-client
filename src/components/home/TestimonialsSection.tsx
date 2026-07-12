"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Nusrat Jahan",
    role: "Regular Customer",
    review: "The quality of the Jamdani saree I ordered is absolutely stunning. The colors are vibrant and the fabric is incredibly soft. I will definitely buy again!",
    rating: 5,
  },
  {
    name: "Farhana Islam",
    role: "Bride-to-be",
    review: "I was looking for the perfect Katan silk for my wedding reception, and Aparna Sarees delivered beyond my expectations. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sadia Rahman",
    role: "Fashion Enthusiast",
    review: "Great collection and reasonable prices. The delivery was super fast, and the packaging felt very premium. A wonderful shopping experience.",
    rating: 4,
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 px-6 sm:px-10 bg-gradient-to-b from-[#FFF9D0]/50 to-[#fdfaf3]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-[#590d0d]">What Our Customers Say</h2>
          <p className="mt-4 text-[#590d0d]/70 max-w-2xl mx-auto">
            Read the experiences of our happy customers who found their perfect sarees with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-[#590d0d]/10 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-6xl text-[#FFF9D0] font-serif leading-none opacity-50">
                &quot;
              </div>
              
              <div className="flex text-yellow-400 mb-4 text-sm">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < testimonial.rating ? "★" : "☆"}</span>
                ))}
              </div>
              
              <p className="text-[#590d0d]/80 italic mb-6 relative z-10 text-sm leading-relaxed min-h-[80px]">
                "{testimonial.review}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-[#590d0d] flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-[#590d0d] text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-[#590d0d]/60">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
