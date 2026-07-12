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
const ITEMS_PER_PAGE = 12;

const CATEGORIES = [
  "Banarasi",
  "Kanjivaram",
  "Silk",
  "Cotton",
  "Chiffon",
  "Georgette",
  "Jamdani",
  "Linen",
  "Net",
  "Bridal",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest Arrivals" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
];

function StarRating({ count = 4 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-3.5 w-3.5 ${star <= count ? "text-[#c8922a]" : "text-[#d9c9a8]"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function BrowseSareesPage() {
  const [allSarees, setAllSarees] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchSarees = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (sortBy !== "newest") params.set("sortBy", sortBy);

      const res = await fetch(`${API}/api/sarees?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        // Client-side category filter (multi-select)
        if (selectedCategories.length > 0) {
          const filtered = data.filter((s: Saree) =>
            selectedCategories.some(
              (cat) => s.category?.toLowerCase() === cat.toLowerCase()
            )
          );
          setAllSarees(filtered);
        } else {
          setAllSarees(data);
        }
      }
    } catch (err) {
      console.error("Failed to fetch sarees:", err);
    } finally {
      setLoading(false);
    }
  }, [search, selectedCategories, minPrice, maxPrice, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
    fetchSarees();
  }, [fetchSarees]);

  const totalPages = Math.ceil(allSarees.length / ITEMS_PER_PAGE);
  const paginatedSarees = allSarees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setCurrentPage(1);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearch("");
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handleApplyPrice = () => {
    setCurrentPage(1);
    fetchSarees();
  };

  const hasActiveFilters =
    search ||
    selectedCategories.length > 0 ||
    minPrice ||
    maxPrice ||
    sortBy !== "newest";

  const totalCount = allSarees.length;

  // Pagination page range
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* ── Hero Banner ── */}
      <div className="bg-[#f1ebe0] border-b border-[#e2d5c0] pt-24 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-[#8a7060] uppercase tracking-widest mb-5">
            <Link href="/" className="hover:text-[#590d0d] transition-colors">
              Home
            </Link>
            <span className="text-[#c8b49a]">/</span>
            <span className="text-[#590d0d]">Our Collection</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display text-5xl font-bold text-[#590d0d] mb-3 leading-tight">
                Browse Sarees
              </h1>
              <p className="text-[#6b5040] max-w-lg leading-relaxed">
                Discover an exquisite curation of handcrafted legacies, where
                every thread tells a story of heritage and timeless elegance.
              </p>
            </div>
            {/* Top Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 bg-white border border-[#d8c9b5] rounded-full px-4 py-2.5 shadow-sm min-w-[280px]"
            >
              <svg
                className="h-4 w-4 text-[#9d713c] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search our heritage collection…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 bg-transparent text-sm text-[#3a2a1a] placeholder-[#b0998a] outline-none min-w-0"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                  }}
                  className="text-[#b0998a] hover:text-[#590d0d] transition-colors flex-shrink-0"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button type="submit" className="flex-shrink-0 bg-[#590d0d] text-white rounded-full p-1.5 hover:bg-[#7a1010] transition-colors">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* ── Sidebar ── */}
          <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 gap-7">
            {/* Category Filter */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] font-bold text-[#590d0d] uppercase tracking-[0.15em]">
                  Category
                </h3>
                <svg className="h-4 w-4 text-[#9d713c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="space-y-2.5">
                {CATEGORIES.map((cat) => {
                  const active = selectedCategories.includes(cat);
                  return (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <span
                        onClick={() => toggleCategory(cat)}
                        className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                          active
                            ? "bg-[#590d0d] border-[#590d0d]"
                            : "border-[#c8b49a] group-hover:border-[#590d0d]"
                        }`}
                      >
                        {active && (
                          <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span
                        onClick={() => toggleCategory(cat)}
                        className={`text-sm transition-colors ${
                          active
                            ? "text-[#590d0d] font-semibold"
                            : "text-[#6b5040] group-hover:text-[#590d0d]"
                        }`}
                      >
                        {cat}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-[#e2d5c0]" />

            {/* Price Range */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] font-bold text-[#590d0d] uppercase tracking-[0.15em]">
                  Price Range
                </h3>
              </div>
              {minPrice || maxPrice ? (
                <p className="text-xs font-semibold text-[#9d713c] mb-3">
                  ৳{minPrice || "0"} — ৳{maxPrice || "∞"}
                </p>
              ) : (
                <p className="text-xs text-[#9d713c] mb-3">Any price</p>
              )}
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min="0"
                  className="w-full rounded border border-[#d8c9b5] bg-white px-2.5 py-1.5 text-xs text-[#3a2a1a] outline-none focus:border-[#9d713c] placeholder-[#c0a990]"
                />
                <span className="text-[#c8b49a] text-xs flex-shrink-0">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                  className="w-full rounded border border-[#d8c9b5] bg-white px-2.5 py-1.5 text-xs text-[#3a2a1a] outline-none focus:border-[#9d713c] placeholder-[#c0a990]"
                />
              </div>
              <button
                onClick={handleApplyPrice}
                className="mt-3 w-full rounded border border-[#590d0d] py-1.5 text-xs font-bold text-[#590d0d] uppercase tracking-wider hover:bg-[#590d0d] hover:text-white transition-all duration-200"
              >
                Apply
              </button>
            </div>

            <div className="h-px bg-[#e2d5c0]" />

            {/* Reset Filters */}
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="w-full border border-[#c8b49a] py-2.5 text-xs font-bold text-[#6b5040] uppercase tracking-[0.15em] hover:border-[#590d0d] hover:text-[#590d0d] transition-all duration-200"
              >
                Reset Filters
              </button>
            )}
          </aside>

          {/* ── Right: Toolbar + Grid ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-7 gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden flex items-center gap-2 text-xs font-semibold text-[#590d0d] border border-[#590d0d]/30 rounded px-3 py-2 hover:bg-[#590d0d]/5 transition-colors"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h6" />
                  </svg>
                  Filters
                </button>
                {!loading && (
                  <p className="text-sm text-[#6b5040]">
                    Showing{" "}
                    <span className="font-bold text-[#590d0d]">{totalCount}</span>{" "}
                    artisanal masterpiece{totalCount !== 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {/* Sort + Active chips */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Active filter chips */}
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#590d0d] text-white px-3 py-1 text-xs font-semibold"
                  >
                    {cat}
                    <button
                      onClick={() => toggleCategory(cat)}
                      className="hover:opacity-75 transition-opacity"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                {search && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9d713c]/15 text-[#9d713c] px-3 py-1 text-xs font-semibold border border-[#9d713c]/20">
                    &ldquo;{search}&rdquo;
                    <button onClick={() => { setSearch(""); setSearchInput(""); }}>
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}

                {/* Sort By */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#6b5040] uppercase tracking-wider whitespace-nowrap hidden sm:block">
                    Sort By
                  </span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                      className="appearance-none rounded border border-[#d8c9b5] bg-white pl-3 pr-8 py-2 text-xs font-semibold text-[#3a2a1a] outline-none focus:border-[#9d713c] cursor-pointer"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9d713c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Sidebar Drawer */}
            {sidebarOpen && (
              <div className="lg:hidden mb-6 bg-white border border-[#e2d5c0] rounded-lg p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#590d0d] uppercase tracking-wider">Filters</h3>
                  <button onClick={() => setSidebarOpen(false)} className="text-[#9d713c]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {CATEGORIES.map((cat) => {
                    const active = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`py-2 px-3 rounded text-xs font-semibold border transition-all ${
                          active
                            ? "bg-[#590d0d] text-white border-[#590d0d]"
                            : "border-[#d8c9b5] text-[#6b5040] hover:border-[#590d0d]"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2 mb-4">
                  <input type="number" placeholder="Min ৳" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="flex-1 rounded border border-[#d8c9b5] px-3 py-2 text-xs outline-none" />
                  <input type="number" placeholder="Max ৳" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="flex-1 rounded border border-[#d8c9b5] px-3 py-2 text-xs outline-none" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { handleApplyPrice(); setSidebarOpen(false); }} className="flex-1 bg-[#590d0d] text-white py-2 text-xs font-bold uppercase tracking-wider rounded">Apply</button>
                  <button onClick={() => { handleClearFilters(); setSidebarOpen(false); }} className="flex-1 border border-[#590d0d] text-[#590d0d] py-2 text-xs font-bold uppercase tracking-wider rounded">Reset</button>
                </div>
              </div>
            )}

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] rounded-lg bg-[#e2d5c0] mb-3" />
                    <div className="h-4 bg-[#e2d5c0] rounded mb-2 w-3/4" />
                    <div className="h-3 bg-[#e2d5c0] rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : paginatedSarees.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-full bg-[#f1ebe0] flex items-center justify-center mb-5">
                  <span className="text-4xl">🧣</span>
                </div>
                <h3 className="text-xl font-bold text-[#590d0d] mb-2">
                  No sarees found
                </h3>
                <p className="text-[#6b5040] text-sm mb-6 max-w-sm">
                  {hasActiveFilters
                    ? "Try adjusting your filters or search term."
                    : "Check back later for new collections."}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="rounded-full bg-[#590d0d] px-8 py-3 text-sm font-bold text-white tracking-wider hover:bg-[#7a1010] transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {paginatedSarees.map((saree, idx) => {
                    // Rotate badge types for visual variety
                    const badges = ["BESTSELLER", "HAND-WOVEN", "NEW ARRIVAL", "EXCLUSIVE"];
                    const badge = idx % 5 === 0 ? badges[0] : idx % 5 === 1 ? badges[1] : idx % 5 === 2 ? badges[2] : idx % 5 === 3 ? badges[3] : null;
                    const stars = 3 + (idx % 3);

                    return (
                      <Link
                        key={saree._id}
                        href={`/browse-sarees/${saree._id}`}
                        className="group flex flex-col"
                      >
                        {/* Image */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#ede8e0] mb-3">
                          {saree.images && saree.images.length > 0 ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={saree.images[0]}
                              alt={saree.name}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1618901185975-d59f7091bcfa?q=80&w=600&auto=format&fit=crop";
                              }}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="text-5xl opacity-20">🧣</span>
                            </div>
                          )}

                          {/* Badge */}
                          {badge && (
                            <div
                              className={`absolute top-3 left-3 px-2 py-1 text-[9px] font-black uppercase tracking-widest ${
                                badge === "BESTSELLER"
                                  ? "bg-[#590d0d] text-[#ffe088]"
                                  : badge === "NEW ARRIVAL"
                                  ? "bg-[#1a5c1a] text-white"
                                  : badge === "EXCLUSIVE"
                                  ? "bg-[#1a3a5c] text-white"
                                  : "bg-white/90 text-[#590d0d] backdrop-blur-sm"
                              }`}
                            >
                              {badge}
                            </div>
                          )}

                          {/* Category top-right */}
                          {saree.category && (
                            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider rounded-sm">
                              {saree.category}
                            </div>
                          )}

                          {/* Sold Out overlay */}
                          {saree.quantity === 0 && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="bg-white text-[#590d0d] text-xs font-black uppercase tracking-widest px-4 py-2">
                                Sold Out
                              </span>
                            </div>
                          )}

                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-[#590d0d]/0 group-hover:bg-[#590d0d]/10 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                            <span className="bg-[#590d0d] text-[#ffe088] text-[10px] font-black uppercase tracking-widest px-5 py-2.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              View Details
                            </span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <h3 className="font-display text-sm font-bold text-[#2a1a0a] line-clamp-1 group-hover:text-[#590d0d] transition-colors mb-1">
                            {saree.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[#590d0d]">
                              ৳{saree.price.toLocaleString()}
                            </span>
                            <StarRating count={stars} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* ── Pagination ── */}
                {totalPages > 1 && (
                  <div className="mt-14 flex flex-col items-center gap-4">
                    {/* Page info */}
                    <p className="text-xs text-[#9d8070] tracking-wide">
                      Page {currentPage} of {totalPages} — showing{" "}
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                      {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of{" "}
                      {totalCount} pieces
                    </p>
                    {/* Buttons */}
                    <div className="flex items-center gap-1.5">
                      {/* Prev */}
                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-widest border border-[#d8c9b5] text-[#590d0d] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#590d0d] hover:text-white hover:border-[#590d0d] transition-all duration-200"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        Prev
                      </button>

                      {/* Page numbers */}
                      <div className="flex items-center gap-1">
                        {getPageNumbers().map((page, i) =>
                          page === "..." ? (
                            <span
                              key={`dots-${i}`}
                              className="w-9 h-9 flex items-center justify-center text-xs text-[#9d8070]"
                            >
                              …
                            </span>
                          ) : (
                            <button
                              key={page}
                              onClick={() => {
                                setCurrentPage(page as number);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className={`w-9 h-9 text-xs font-bold border transition-all duration-200 ${
                                currentPage === page
                                  ? "bg-[#590d0d] text-[#ffe088] border-[#590d0d]"
                                  : "border-[#d8c9b5] text-[#590d0d] hover:bg-[#f1ebe0]"
                              }`}
                            >
                              {page}
                            </button>
                          )
                        )}
                      </div>

                      {/* Next */}
                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-widest border border-[#d8c9b5] text-[#590d0d] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#590d0d] hover:text-white hover:border-[#590d0d] transition-all duration-200"
                      >
                        Next
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
