"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Saree = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  fabric: string;
  color: string;
  size: string;
  quantity: number;
  images: string[];
  tags: string[];
  isAvailable: boolean;
};

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BrowseSareesPage() {
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSarees = async () => {
      try {
        const res = await fetch(`${API}/api/sarees`);
        if (res.ok) {
          const data = await res.json();
          setSarees(data);
        }
      } catch (err) {
        console.error("Failed to fetch sarees:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSarees();
  }, []);

  return (
    <section className="min-h-screen px-6 py-32 sm:px-10 bg-[#FFF9D0]">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-4xl font-bold text-[#590d0d] text-center mb-4">
          Browse Sarees
        </h1>
        <p className="max-w-2xl text-center mx-auto text-[#590d0d]/70 mb-12">
          Explore our curated collection of beautifully handcrafted sarees. 
          Perfect for every occasion, from elegant daily wear to luxurious bridal collections.
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#590d0d]/20 border-t-[#590d0d]" />
          </div>
        ) : sarees.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">🧣</span>
            <h3 className="text-xl font-bold text-[#590d0d]">No sarees found</h3>
            <p className="text-[#590d0d]/70 mt-2">Check back later for new collections.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sarees.map((saree) => (
              <div 
                key={saree._id} 
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 border border-[#590d0d]/10"
              >
                {/* Image Section */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  {saree.images && saree.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={saree.images[0]}
                      alt={saree.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618901185975-d59f7091bcfa?q=80&w=600&auto=format&fit=crop";
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#590d0d]/5">
                      <span className="text-4xl opacity-20">🧣</span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  {saree.category && (
                    <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#590d0d] shadow-sm backdrop-blur-sm">
                      {saree.category}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold text-[#590d0d] line-clamp-1">
                    {saree.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#590d0d]/60 line-clamp-2 min-h-[40px]">
                    {saree.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#9d713c]">
                      ৳{saree.price.toLocaleString()}
                    </span>
                    {saree.quantity > 0 ? (
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                        Sold Out
                      </span>
                    )}
                  </div>
                  
                  {saree.tags && saree.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {saree.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-semibold text-[#590d0d]/50 uppercase tracking-wider bg-[#590d0d]/5 px-2 py-0.5 rounded-sm">
                          #{tag}
                        </span>
                      ))}
                      {saree.tags.length > 3 && (
                        <span className="text-[10px] font-semibold text-[#590d0d]/40">
                          +{saree.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
