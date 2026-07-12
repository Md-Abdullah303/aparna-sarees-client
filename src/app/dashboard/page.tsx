"use client";

import { useSession, authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Saree = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  fabric: string;
  color: string;
  quantity: string;
};

const EMPTY_FORM: Omit<Saree, "id"> = {
  name: "",
  description: "",
  price: "",
  category: "",
  fabric: "",
  color: "",
  quantity: "",
};

type Tab = "manage" | "add";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("manage");
  const [sarees, setSarees] = useState<Saree[]>([
    {
      id: "1",
      name: "Banarasi Silk Saree",
      description: "Exquisite handwoven Banarasi silk with golden zari work.",
      price: "12500",
      category: "Silk",
      fabric: "Pure Silk",
      color: "Red & Gold",
      quantity: "5",
    },
    {
      id: "2",
      name: "Jamdani Muslin Saree",
      description: "Delicate Jamdani weave on finest muslin fabric.",
      price: "8900",
      category: "Muslin",
      fabric: "Muslin",
      color: "White & Blue",
      quantity: "3",
    },
  ]);

  const [form, setForm] = useState<Omit<Saree, "id">>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");

  const user = session?.user;
  const avatarInitial = user?.name?.charAt(0).toUpperCase() ?? "U";

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError("");
  };

  const handleAddOrEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price.trim()) {
      setFormError("Name and price are required.");
      return;
    }
    if (editingId) {
      setSarees((prev) =>
        prev.map((s) => (s.id === editingId ? { ...form, id: editingId } : s))
      );
      setEditingId(null);
    } else {
      const newSaree: Saree = { ...form, id: Date.now().toString() };
      setSarees((prev) => [newSaree, ...prev]);
    }
    setForm(EMPTY_FORM);
    setActiveTab("manage");
  };

  const handleEdit = (saree: Saree) => {
    const { id, ...rest } = saree;
    setEditingId(id);
    setForm(rest);
    setActiveTab("add");
  };

  const handleDelete = (id: string) => {
    setSarees((prev) => prev.filter((s) => s.id !== id));
    setDeleteConfirmId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setActiveTab("manage");
  };

  const navItems: { tab: Tab; label: string; icon: React.ReactNode }[] = [
    {
      tab: "manage",
      label: "Manage Sarees",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
        </svg>
      ),
    },
    {
      tab: "add",
      label: "Add Saree",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#FFF9D0]">
      {/* ─── SIDEBAR ─── */}
      <aside className="flex w-64 flex-shrink-0 flex-col border-r border-[#590d0d]/10 bg-white/70 backdrop-blur-sm">
        {/* Brand */}
        <div className="border-b border-[#590d0d]/10 px-6 py-5">
          <a href="/" className="flex items-center gap-2 text-[#590d0d]">
            <span className="text-xl">🧣</span>
            <span className="font-display text-lg font-bold tracking-tight">Aparna Sarees</span>
          </a>
        </div>

        {/* User Profile Card */}
        <div className="border-b border-[#590d0d]/10 px-6 py-6">
          <div className="flex items-center gap-3">
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name ?? "User"}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-[#590d0d]/20"
              />
            ) : (
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#590d0d] to-[#8b1a1a] text-lg font-bold text-white shadow-md">
                {avatarInitial}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#590d0d]">
                {user?.name ?? "User"}
              </p>
              <p className="truncate text-xs text-[#590d0d]/60">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-[#590d0d]/40">
            Menu
          </p>
          <ul className="space-y-1">
            {navItems.map(({ tab, label, icon }) => (
              <li key={tab}>
                <button
                  onClick={() => {
                    if (tab === "add") {
                      setEditingId(null);
                      setForm(EMPTY_FORM);
                      setFormError("");
                    }
                    setActiveTab(tab);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
                    activeTab === tab
                      ? "bg-[#590d0d] text-white shadow-md"
                      : "text-[#590d0d]/70 hover:bg-[#590d0d]/8 hover:text-[#590d0d]"
                  }`}
                >
                  {icon}
                  {label}
                  {tab === "manage" && (
                    <span
                      className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        activeTab === "manage"
                          ? "bg-white/20 text-white"
                          : "bg-[#590d0d]/10 text-[#590d0d]"
                      }`}
                    >
                      {sarees.length}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom: Sign Out + Back to Home */}
        <div className="border-t border-[#590d0d]/10 px-3 py-4 space-y-1">
          <a
            href="/"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#590d0d]/60 hover:bg-[#590d0d]/5 hover:text-[#590d0d] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Back to Home
          </a>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500/80 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="border-b border-[#590d0d]/10 bg-white/50 px-8 py-4 backdrop-blur-sm">
          <h1 className="text-xl font-bold text-[#590d0d]">
            {activeTab === "manage" ? "Manage Sarees" : editingId ? "Edit Saree" : "Add New Saree"}
          </h1>
          <p className="text-xs text-[#590d0d]/50 mt-0.5">
            {activeTab === "manage"
              ? `You have ${sarees.length} saree${sarees.length !== 1 ? "s" : ""} listed.`
              : editingId
              ? "Update the details of your saree listing."
              : "Fill in the details to list a new saree for sale."}
          </p>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {/* ── MANAGE TAB ── */}
          {activeTab === "manage" && (
            <div>
              {sarees.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#590d0d]/20 bg-white/40 py-24">
                  <span className="text-6xl">🧣</span>
                  <p className="mt-5 text-base font-semibold text-[#590d0d]/60">
                    No sarees listed yet
                  </p>
                  <p className="mt-1 text-sm text-[#590d0d]/40">
                    Get started by adding your first saree.
                  </p>
                  <button
                    onClick={() => setActiveTab("add")}
                    className="mt-6 rounded-lg bg-[#590d0d] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
                  >
                    + Add Your First Saree
                  </button>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-[#590d0d]/10 bg-white/70 shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#590d0d]/10 bg-[#590d0d]/5 text-left">
                        <th className="px-5 py-3.5 font-bold text-[#590d0d]">Name</th>
                        <th className="px-5 py-3.5 font-bold text-[#590d0d]">Category</th>
                        <th className="px-5 py-3.5 font-bold text-[#590d0d]">Color</th>
                        <th className="px-5 py-3.5 font-bold text-[#590d0d]">Price</th>
                        <th className="px-5 py-3.5 font-bold text-[#590d0d]">Stock</th>
                        <th className="px-5 py-3.5 font-bold text-[#590d0d]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sarees.map((saree, idx) => (
                        <tr
                          key={saree.id}
                          className={`border-b border-[#590d0d]/5 transition-colors hover:bg-[#590d0d]/5 ${
                            idx % 2 !== 0 ? "bg-white/40" : ""
                          }`}
                        >
                          <td className="px-5 py-4">
                            <p className="font-semibold text-[#590d0d]">{saree.name}</p>
                            <p className="mt-0.5 max-w-xs truncate text-xs text-[#590d0d]/50">
                              {saree.description}
                            </p>
                          </td>
                          <td className="px-5 py-4 text-[#590d0d]/70">{saree.category || "—"}</td>
                          <td className="px-5 py-4 text-[#590d0d]/70">{saree.color || "—"}</td>
                          <td className="px-5 py-4 font-semibold text-[#590d0d]">
                            ৳{parseInt(saree.price || "0").toLocaleString()}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                parseInt(saree.quantity || "0") > 0
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {parseInt(saree.quantity || "0") > 0
                                ? `${saree.quantity} in stock`
                                : "Out of Stock"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEdit(saree)}
                                className="rounded-md border border-[#590d0d]/20 px-3 py-1.5 text-xs font-semibold text-[#590d0d] transition-colors hover:bg-[#590d0d] hover:text-white"
                              >
                                Edit
                              </button>
                              {deleteConfirmId === saree.id ? (
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleDelete(saree.id)}
                                    className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-50"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirmId(saree.id)}
                                  className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50"
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── ADD / EDIT FORM TAB ── */}
          {activeTab === "add" && (
            <div className="mx-auto max-w-2xl rounded-xl border border-[#590d0d]/10 bg-white/70 p-8 shadow-sm">
              <form onSubmit={handleAddOrEdit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                    Saree Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Banarasi Silk Saree"
                    required
                    className="w-full rounded-lg border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] placeholder:text-[#590d0d]/30 focus:border-[#590d0d] focus:outline-none focus:ring-2 focus:ring-[#590d0d]/10"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    placeholder="Brief product description..."
                    rows={3}
                    className="w-full resize-none rounded-lg border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] placeholder:text-[#590d0d]/30 focus:border-[#590d0d] focus:outline-none focus:ring-2 focus:ring-[#590d0d]/10"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                    Price (BDT) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleFormChange}
                    placeholder="e.g. 5000"
                    required
                    min={0}
                    className="w-full rounded-lg border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] placeholder:text-[#590d0d]/30 focus:border-[#590d0d] focus:outline-none focus:ring-2 focus:ring-[#590d0d]/10"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                    Available Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleFormChange}
                    placeholder="e.g. 10"
                    min={0}
                    className="w-full rounded-lg border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] placeholder:text-[#590d0d]/30 focus:border-[#590d0d] focus:outline-none focus:ring-2 focus:ring-[#590d0d]/10"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] focus:border-[#590d0d] focus:outline-none focus:ring-2 focus:ring-[#590d0d]/10"
                  >
                    <option value="">Select category</option>
                    <option>Silk</option>
                    <option>Cotton</option>
                    <option>Jamdani</option>
                    <option>Muslin</option>
                    <option>Georgette</option>
                    <option>Chiffon</option>
                    <option>Linen</option>
                    <option>Net</option>
                  </select>
                </div>

                {/* Fabric */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                    Fabric Type
                  </label>
                  <input
                    type="text"
                    name="fabric"
                    value={form.fabric}
                    onChange={handleFormChange}
                    placeholder="e.g. Pure Silk"
                    className="w-full rounded-lg border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] placeholder:text-[#590d0d]/30 focus:border-[#590d0d] focus:outline-none focus:ring-2 focus:ring-[#590d0d]/10"
                  />
                </div>

                {/* Color */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={form.color}
                    onChange={handleFormChange}
                    placeholder="e.g. Red & Gold"
                    className="w-full rounded-lg border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] placeholder:text-[#590d0d]/30 focus:border-[#590d0d] focus:outline-none focus:ring-2 focus:ring-[#590d0d]/10"
                  />
                </div>

                {formError && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-semibold text-red-600">{formError}</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 md:col-span-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-lg bg-[#590d0d] px-8 py-2.5 text-sm font-bold tracking-widest text-white transition-opacity hover:opacity-90"
                  >
                    {editingId ? "SAVE CHANGES" : "ADD SAREE"}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded-lg border border-[#590d0d]/20 px-6 py-2.5 text-sm font-semibold text-[#590d0d] transition-colors hover:bg-[#590d0d]/5"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
