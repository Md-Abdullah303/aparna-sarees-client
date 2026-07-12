"use client";

import { useEffect, useState, useCallback } from "react";
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

const CATEGORIES = [
  "all",
  "Banarasi",
  "Kanjivaram",
  "Chiffon",
  "Georgette",
  "Silk",
  "Cotton",
  "Linen",
  "Net",
  "Bridal",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
];

export default function BrowseSareesPage() {
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [totalCount, setTotalCount] = useState(0);

  const fetchSarees = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (category !== "all") params.set("category", category);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (sortBy !== "newest") params.set("sortBy", sortBy);

      const res = await fetch(`${API}/api/sarees?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setSarees(data);
        setTotalCount(data.length);
      }
    } catch (err) {
      console.error("Failed to fetch sarees:", err);
    } finally {
      setLoading(false);
    }
  }, [search, category, minPrice, maxPrice, sortBy]);

  useEffect(() => {
    fetchSarees();
  }, [fetchSarees]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  };

  const hasActiveFilters =
    search || category !== "all" || minPrice || maxPrice || sortBy !== "newest";

  return (
    <section className="min-h-screen px-6 py-32 sm:px-10 bg-[#FFF9D0]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <h1 className="font-display text-4xl font-bold text-[#590d0d] text-center mb-4">
          Browse Sarees
        </h1>
        <p className="max-w-2xl text-center mx-auto text-[#590d0d]/70 mb-10">
          Explore our curated collection of beautifully handcrafted sarees.
          Perfect for every occasion, from elegant daily wear to luxurious bridal collections.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mb-6 flex gap-2 max-w-xl mx-auto">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#590d0d]/50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search sarees by name, description, or tag…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-full border border-[#590d0d]/20 bg-white pl-10 pr-4 py-2.5 text-sm text-[#590d0d] placeholder-[#590d0d]/40 outline-none focus:border-[#590d0d]/50 focus:ring-2 focus:ring-[#590d0d]/10"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => { setSearchInput(""); setSearch(""); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#590d0d]/40 hover:text-[#590d0d]"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="submit"
            className="rounded-full bg-[#590d0d] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Search
          </button>
        </form>

        {/* Filters Row */}
        <div className="mb-8 flex flex-wrap gap-3 items-end justify-between bg-white border border-[#590d0d]/10 rounded-xl p-4 shadow-sm">
          {/* Category Filter */}
          <div className="flex flex-col gap-1.5 min-w-[160px]">
            <label className="text-xs font-semibold text-[#590d0d]/60 uppercase tracking-wide">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-[#590d0d]/20 bg-[#FFF9D0] px-3 py-2 text-sm text-[#590d0d] outline-none focus:border-[#590d0d]/40 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#590d0d]/60 uppercase tracking-wide">Price Range (৳)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                min="0"
                className="w-24 rounded-lg border border-[#590d0d]/20 bg-[#FFF9D0] px-3 py-2 text-sm text-[#590d0d] outline-none focus:border-[#590d0d]/40 placeholder-[#590d0d]/40"
              />
              <span className="text-[#590d0d]/40 text-sm">—</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min="0"
                className="w-24 rounded-lg border border-[#590d0d]/20 bg-[#FFF9D0] px-3 py-2 text-sm text-[#590d0d] outline-none focus:border-[#590d0d]/40 placeholder-[#590d0d]/40"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="flex flex-col gap-1.5 min-w-[180px]">
            <label className="text-xs font-semibold text-[#590d0d]/60 uppercase tracking-wide">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-[#590d0d]/20 bg-[#FFF9D0] px-3 py-2 text-sm text-[#590d0d] outline-none focus:border-[#590d0d]/40 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="rounded-lg border border-[#590d0d]/30 px-4 py-2 text-sm font-semibold text-[#590d0d] transition-colors hover:bg-[#590d0d]/5 self-end"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Info */}
        {!loading && (
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-[#590d0d]/60">
              {hasActiveFilters
                ? `Found ${totalCount} saree${totalCount !== 1 ? "s" : ""} matching your criteria`
                : `${totalCount} saree${totalCount !== 1 ? "s" : ""} available`}
            </p>
            {/* Active Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {search && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#590d0d]/10 px-3 py-1 text-xs font-medium text-[#590d0d]">
                  &ldquo;{search}&rdquo;
                  <button onClick={() => { setSearch(""); setSearchInput(""); }} className="hover:opacity-70">✕</button>
                </span>
              )}
              {category !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#9d713c]/10 px-3 py-1 text-xs font-medium text-[#9d713c]">
                  {category}
                  <button onClick={() => setCategory("all")} className="hover:opacity-70">✕</button>
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#590d0d]/10 px-3 py-1 text-xs font-medium text-[#590d0d]">
                  ৳{minPrice || "0"} — ৳{maxPrice || "∞"}
                  <button onClick={() => { setMinPrice(""); setMaxPrice(""); }} className="hover:opacity-70">✕</button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#590d0d]/20 border-t-[#590d0d]" />
          </div>
        ) : sarees.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">🧣</span>
            <h3 className="text-xl font-bold text-[#590d0d]">No sarees found</h3>
            <p className="text-[#590d0d]/70 mt-2">
              {hasActiveFilters
                ? "Try adjusting your filters or search term."
                : "Check back later for new collections."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="mt-4 rounded-full bg-[#590d0d] px-6 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {sarees.map((saree) => (
              <div
                key={saree._id}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 border border-[#590d0d]/10"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                  {saree.images && saree.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={saree.images[0]}
                      alt={saree.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1618901185975-d59f7091bcfa?q=80&w=600&auto=format&fit=crop";
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#590d0d]/5">
                      <span className="text-3xl opacity-20">🧣</span>
                    </div>
                  )}

                  {/* Category Badge */}
                  {saree.category && (
                    <div className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#590d0d] shadow-sm backdrop-blur-sm">
                      {saree.category}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-base font-bold text-[#590d0d] line-clamp-1">
                    {saree.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#590d0d]/60 line-clamp-2 min-h-[32px]">
                    {saree.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-[#9d713c]">
                      ৳{saree.price.toLocaleString()}
                    </span>
                    {saree.quantity > 0 ? (
                      <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                        Sold Out
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/browse-sarees/${saree._id}`}
                    className="mt-4 block w-full rounded-md bg-[#590d0d] py-2 text-center text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Show Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
