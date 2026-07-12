"use client";

import { useSession } from "@/lib/auth-client";
import { useState } from "react";

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

export default function DashboardPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"manage" | "add">("manage");
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

  const user = session?.user;

  return (
    <div className="min-h-screen bg-[#FFF9D0]">
      {/* Top Bar */}
      <header className="border-b border-[#590d0d]/10 bg-white/60 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#590d0d] text-sm font-bold text-white">
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#590d0d]">
                {user?.name ?? "User"}
              </p>
              <p className="text-xs text-[#590d0d]/60">{user?.email}</p>
            </div>
          </div>
          <a
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#590d0d]/70 hover:text-[#590d0d]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-[#590d0d]">
            My Dashboard
          </h1>
          <p className="mt-1 text-sm text-[#590d0d]/60">
            Manage your saree listings — add, edit, or remove products.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg border border-[#590d0d]/10 bg-white/50 p-1 w-fit">
          <button
            onClick={() => { setActiveTab("manage"); cancelEdit(); }}
            className={`rounded-md px-5 py-2 text-sm font-semibold transition-all ${
              activeTab === "manage"
                ? "bg-[#590d0d] text-white shadow"
                : "text-[#590d0d]/70 hover:text-[#590d0d]"
            }`}
          >
            My Sarees ({sarees.length})
          </button>
          <button
            onClick={() => { setEditingId(null); setForm(EMPTY_FORM); setFormError(""); setActiveTab("add"); }}
            className={`rounded-md px-5 py-2 text-sm font-semibold transition-all ${
              activeTab === "add"
                ? "bg-[#590d0d] text-white shadow"
                : "text-[#590d0d]/70 hover:text-[#590d0d]"
            }`}
          >
            + Add Saree
          </button>
        </div>

        {/* Manage Tab */}
        {activeTab === "manage" && (
          <div>
            {sarees.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#590d0d]/20 bg-white/40 py-20">
                <span className="text-5xl">🧣</span>
                <p className="mt-4 text-base font-semibold text-[#590d0d]/60">
                  No sarees listed yet
                </p>
                <button
                  onClick={() => setActiveTab("add")}
                  className="mt-4 rounded-md bg-[#590d0d] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90"
                >
                  Add Your First Saree
                </button>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[#590d0d]/10 bg-white/60 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#590d0d]/10 bg-[#590d0d]/5 text-left">
                      <th className="px-5 py-3.5 font-bold text-[#590d0d]">Name</th>
                      <th className="px-5 py-3.5 font-bold text-[#590d0d]">Category</th>
                      <th className="px-5 py-3.5 font-bold text-[#590d0d]">Color</th>
                      <th className="px-5 py-3.5 font-bold text-[#590d0d]">Price (BDT)</th>
                      <th className="px-5 py-3.5 font-bold text-[#590d0d]">Stock</th>
                      <th className="px-5 py-3.5 font-bold text-[#590d0d]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sarees.map((saree, idx) => (
                      <tr
                        key={saree.id}
                        className={`border-b border-[#590d0d]/5 transition-colors hover:bg-[#590d0d]/5 ${
                          idx % 2 === 0 ? "" : "bg-white/30"
                        }`}
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-[#590d0d]">{saree.name}</p>
                          <p className="mt-0.5 max-w-xs truncate text-xs text-[#590d0d]/50">
                            {saree.description}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-[#590d0d]/80">{saree.category}</td>
                        <td className="px-5 py-4 text-[#590d0d]/80">{saree.color}</td>
                        <td className="px-5 py-4 font-semibold text-[#590d0d]">
                          ৳{parseInt(saree.price).toLocaleString()}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              parseInt(saree.quantity) > 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {parseInt(saree.quantity) > 0
                              ? `${saree.quantity} in stock`
                              : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(saree)}
                              className="rounded-md border border-[#590d0d]/20 px-3 py-1.5 text-xs font-semibold text-[#590d0d] hover:bg-[#590d0d] hover:text-white transition-colors"
                            >
                              Edit
                            </button>
                            {deleteConfirmId === saree.id ? (
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleDelete(saree.id)}
                                  className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirmId(saree.id)}
                                className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
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

        {/* Add / Edit Form Tab */}
        {activeTab === "add" && (
          <div className="rounded-xl border border-[#590d0d]/10 bg-white/60 p-8 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-[#590d0d]">
              {editingId ? "Edit Saree" : "Add New Saree"}
            </h2>

            <form onSubmit={handleAddOrEdit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                  Saree Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="e.g. Banarasi Silk Saree"
                  required
                  className="w-full rounded-md border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] placeholder:text-[#590d0d]/40 focus:border-[#590d0d] focus:outline-none"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  placeholder="Brief product description..."
                  rows={3}
                  className="w-full resize-none rounded-md border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] placeholder:text-[#590d0d]/40 focus:border-[#590d0d] focus:outline-none"
                />
              </div>

              {/* Price */}
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                  Price (BDT) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleFormChange}
                  placeholder="e.g. 5000"
                  required
                  min={0}
                  className="w-full rounded-md border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] placeholder:text-[#590d0d]/40 focus:border-[#590d0d] focus:outline-none"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                  Available Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleFormChange}
                  placeholder="e.g. 10"
                  min={0}
                  className="w-full rounded-md border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] placeholder:text-[#590d0d]/40 focus:border-[#590d0d] focus:outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  className="w-full rounded-md border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] focus:border-[#590d0d] focus:outline-none"
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
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                  Fabric Type
                </label>
                <input
                  type="text"
                  name="fabric"
                  value={form.fabric}
                  onChange={handleFormChange}
                  placeholder="e.g. Pure Silk"
                  className="w-full rounded-md border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] placeholder:text-[#590d0d]/40 focus:border-[#590d0d] focus:outline-none"
                />
              </div>

              {/* Color */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#590d0d]">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={form.color}
                  onChange={handleFormChange}
                  placeholder="e.g. Red & Gold"
                  className="w-full rounded-md border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] placeholder:text-[#590d0d]/40 focus:border-[#590d0d] focus:outline-none"
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
                  className="flex items-center gap-2 rounded-md bg-[#590d0d] px-8 py-3 text-sm font-bold tracking-widest text-white transition-opacity hover:opacity-90"
                >
                  {editingId ? "SAVE CHANGES" : "ADD SAREE"}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-md border border-[#590d0d]/20 px-6 py-3 text-sm font-semibold text-[#590d0d] hover:bg-[#590d0d]/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
