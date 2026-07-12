"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

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

const API = "/api/server";

export default function SareeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [saree, setSaree] = useState<Saree | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    const fetchSaree = async () => {
      try {
        const res = await fetch(`${API}/api/sarees/${resolvedParams.id}`);
        if (res.ok) {
          const data = await res.json();
          setSaree(data);
          if (data.images && data.images.length > 0) {
            setActiveImage(data.images[0]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch saree details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSaree();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF9D0]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#590d0d]/20 border-t-[#590d0d]" />
      </div>
    );
  }

  if (!saree) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFF9D0]">
        <h2 className="text-2xl font-bold text-[#590d0d]">Saree not found</h2>
        <Link href="/browse-sarees" className="mt-4 text-[#9d713c] hover:underline">
          &larr; Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9D0] pt-24 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm font-medium text-[#590d0d]/60">
          <Link href="/" className="hover:text-[#590d0d]">Home</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/browse-sarees" className="hover:text-[#590d0d]">Sarees</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-[#590d0d]">Saree Details</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - Images */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Main Image */}
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white shadow-md">
              {activeImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activeImage}
                  alt={saree.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#590d0d]/5">
                  <span className="text-6xl opacity-20">🧣</span>
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {saree.images && saree.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {saree.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      activeImage === img ? "border-[#590d0d] shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Thumbnail ${idx}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1a1a1a]">
              {saree.name}
            </h1>
            
            <p className="mt-4 text-[#4a4a4a] leading-relaxed">
              {saree.description}
            </p>

            <div className="mt-6 border-t border-[#590d0d]/10 pt-6">
              <p className="text-3xl font-bold text-[#1a1a1a]">
                Price: ৳{saree.price.toLocaleString()}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-[#1a1a1a]">
                <span className="font-bold">Availability:</span>{" "}
                {saree.quantity > 0 ? (
                  <span className="text-[#4a4a4a]">In Stock ({saree.quantity} units)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
              
              {saree.category && (
                <p className="text-[#1a1a1a]">
                  <span className="font-bold">Category:</span> <span className="text-[#4a4a4a]">{saree.category}</span>
                </p>
              )}
              {saree.fabric && (
                <p className="text-[#1a1a1a]">
                  <span className="font-bold">Fabric:</span> <span className="text-[#4a4a4a]">{saree.fabric}</span>
                </p>
              )}
              {saree.color && (
                <p className="text-[#1a1a1a]">
                  <span className="font-bold">Color:</span> <span className="text-[#4a4a4a]">{saree.color}</span>
                </p>
              )}
              {saree.size && (
                <p className="text-[#1a1a1a]">
                  <span className="font-bold">Size/Length:</span> <span className="text-[#4a4a4a]">{saree.size}</span>
                </p>
              )}
            </div>

            <button 
              className="mt-8 w-full rounded-md bg-[#7c1414] py-4 text-center text-lg font-bold text-white transition-all hover:bg-[#590d0d] active:scale-[0.98] shadow-md"
              disabled={saree.quantity === 0}
            >
              {saree.quantity > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            {/* Tags */}
            {saree.tags && saree.tags.length > 0 && (
              <div className="mt-8 border-t border-[#590d0d]/10 pt-6">
                <h3 className="font-bold text-[#1a1a1a] mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {saree.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="rounded-full bg-white px-3 py-1 text-sm font-medium text-[#590d0d] shadow-sm border border-[#590d0d]/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
