"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Silk Sarees", img: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?q=80&w=400&auto=format&fit=crop" },
  { name: "Jamdani", img: "https://images.unsplash.com/photo-1610030469614-740b20cb3a0c?q=80&w=400&auto=format&fit=crop" },
  { name: "Cotton", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac661?q=80&w=400&auto=format&fit=crop" },
  { name: "Georgette", img: "https://images.unsplash.com/photo-1605792657360-d5845cb447cb?q=80&w=400&auto=format&fit=crop" },
];

export function CategoriesSection() {
  return (
    <section className="py-20 px-6 sm:px-10 bg-[#FFF9D0]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-[#590d0d]">Shop by Category</h2>
          <p className="mt-4 text-[#590d0d]/70 max-w-2xl mx-auto">
            Discover our wide range of exquisite sarees categorized for your perfect occasion.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#590d0d]/80 via-[#590d0d]/20 to-transparent flex items-end p-6">
                <h3 className="text-white text-xl md:text-2xl font-bold font-display tracking-wide">{category.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
