"use client";

import { useSession } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const API = "/api/server";

// ─── Types ────────────────────────────────────────────────────────────────────
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
  userId: string;
  createdAt: string;
};

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  category: "",
  fabric: "",
  color: "",
  size: "",
  quantity: "",
  imageInput: "",   // temp input for adding image URLs
  images: [] as string[],
  tagsInput: "",    // temp input for adding tags
  tags: [] as string[],
  isAvailable: true,
};

type Tab = "manage" | "add" | "profile";

// ─── Component ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("manage");
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [loadingSarees, setLoadingSarees] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ─── Profile State ────────────────────────────────────────────────────────
  const [profileName, setProfileName] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const user = session?.user;
  const avatarInitial = user?.name?.charAt(0).toUpperCase() ?? "U";

  useEffect(() => {
    if (user) {
      setProfileName(user.name ?? "");
      if (user.image && !profileImagePreview) {
        setProfileImagePreview(user.image);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // ─── Fetch my sarees ─────────────────────────────────────────────────────
  const fetchMySarees = async () => {
    setLoadingSarees(true);
    try {
      const res = await fetch(`${API}/api/sarees/my`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setSarees(data);
      }
    } catch (err) {
      console.error("Failed to fetch sarees:", err);
    } finally {
      setLoadingSarees(false);
    }
  };

  useEffect(() => {
    fetchMySarees();
  }, []);

  // ─── Profile Update ───────────────────────────────────────────────────────
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);
    let finalImageUrl = profileImagePreview;

    if (profileImageFile) {
      const formData = new FormData();
      formData.append("image", profileImageFile);
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      
      if (!apiKey) {
        toast.error("ImgBB API Key is missing. Check .env.local.");
        setUpdatingProfile(false);
        return;
      }

      try {
        const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        
        if (uploadData.success) {
          finalImageUrl = uploadData.data.url;
        } else {
          toast.error("Image upload failed.");
          setUpdatingProfile(false);
          return;
        }
      } catch (err) {
        toast.error("Network error during image upload.");
        setUpdatingProfile(false);
        return;
      }
    }

    try {
      const { data, error } = await authClient.updateUser({
        name: profileName,
        image: finalImageUrl,
      });
      
      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error("An error occurred while updating profile.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  // ─── Sign out ─────────────────────────────────────────────────────────────
  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  // ─── Form helpers ─────────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormError("");
  };

  const addImage = () => {
    const url = form.imageInput.trim();
    if (!url) return;
    setForm((prev) => ({ ...prev, images: [...prev.images, url], imageInput: "" }));
  };

  const removeImage = (idx: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const addTag = () => {
    const tag = form.tagsInput.trim().toLowerCase();
    if (!tag || form.tags.includes(tag)) return;
    setForm((prev) => ({ ...prev, tags: [...prev.tags, tag], tagsInput: "" }));
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  // ─── Submit (Add or Edit) ─────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) {
      setFormError("Name and price are required.");
      toast.error("Name and price are required.");
      return;
    }

    const finalImages = form.imageInput.trim() ? [...form.images, form.imageInput.trim()] : form.images;
    const finalTags = form.tagsInput.trim() ? [...form.tags, form.tagsInput.trim().toLowerCase()] : form.tags;

    setSubmitting(true);
    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      fabric: form.fabric,
      color: form.color,
      size: form.size,
      quantity: Number(form.quantity || 0),
      images: finalImages,
      tags: finalTags,
      isAvailable: form.isAvailable,
    };

    try {
      const url = editingId
        ? `${API}/api/sarees/${editingId}`
        : `${API}/api/sarees`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.message || "Something went wrong.");
        toast.error(data.message || "Something went wrong.");
        return;
      }

      // Refresh list
      toast.success(editingId ? "Saree updated successfully!" : "Saree added successfully!");
      await fetchMySarees();
      setForm(EMPTY_FORM);
      setEditingId(null);
      setActiveTab("manage");
    } catch (err) {
      setFormError("Network error. Is the server running?");
      toast.error("Network error. Is the server running?");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Edit ─────────────────────────────────────────────────────────────────
  const handleEdit = (saree: Saree) => {
    setEditingId(saree._id);
    setForm({
      name: saree.name,
      description: saree.description,
      price: String(saree.price),
      category: saree.category,
      fabric: saree.fabric,
      color: saree.color,
      size: saree.size,
      quantity: String(saree.quantity),
      images: saree.images || [],
      imageInput: "",
      tags: saree.tags || [],
      tagsInput: "",
      isAvailable: saree.isAvailable,
    });
    setActiveTab("add");
  };

  // ─── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API}/api/sarees/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setSarees((prev) => prev.filter((s) => s._id !== id));
      setDeleteConfirmId(null);
      toast.success("Saree deleted successfully!");
    } catch {
      alert("Delete failed. Is the server running?");
      toast.error("Delete failed. Is the server running?");
    }
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
    {
      tab: "profile",
      label: "Update Profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
  ];

  // ─── Input class reuse ────────────────────────────────────────────────────
  const inputCls =
    "w-full rounded-lg border border-[#590d0d]/20 bg-white px-4 py-2.5 text-sm text-[#590d0d] placeholder:text-[#590d0d]/30 focus:border-[#590d0d] focus:outline-none focus:ring-2 focus:ring-[#590d0d]/10 transition";
  const labelCls = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#590d0d]";

  return (
    <div className="flex min-h-screen bg-[#FFF9D0]">
      {/* ══════════ SIDEBAR ══════════ */}
      <aside className="flex w-64 flex-shrink-0 flex-col border-r border-[#590d0d]/10 bg-white/70 backdrop-blur-sm">
        {/* Brand */}
        <div className="border-b border-[#590d0d]/10 px-6 py-5">
          <a href="/" className="flex items-center gap-2 text-[#590d0d]">
            <span className="text-xl">🧣</span>
            <span className="font-display text-lg font-bold tracking-tight">Aparna Sarees</span>
          </a>
        </div>

        {/* User profile card */}
        <div className="border-b border-[#590d0d]/10 px-6 py-6">
          <div className="flex items-center gap-3">
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt={user.name ?? "User"} className="h-12 w-12 rounded-full object-cover ring-2 ring-[#590d0d]/20" />
            ) : (
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#590d0d] to-[#8b1a1a] text-lg font-bold text-white shadow-md">
                {avatarInitial}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#590d0d]">{user?.name ?? "User"}</p>
              <p className="truncate text-xs text-[#590d0d]/60">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-[#590d0d]/40">Menu</p>
          <ul className="space-y-1">
            {navItems.map(({ tab, label, icon }) => (
              <li key={tab}>
                <button
                  onClick={() => { if (tab === "add") { setEditingId(null); setForm(EMPTY_FORM); setFormError(""); } setActiveTab(tab); }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${activeTab === tab ? "bg-[#590d0d] text-white shadow-md" : "text-[#590d0d]/70 hover:bg-[#590d0d]/5 hover:text-[#590d0d]"}`}
                >
                  {icon}
                  {label}
                  {tab === "manage" && (
                    <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${activeTab === "manage" ? "bg-white/20 text-white" : "bg-[#590d0d]/10 text-[#590d0d]"}`}>
                      {sarees.length}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="border-t border-[#590d0d]/10 px-3 py-4 space-y-1">
          <a href="/" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#590d0d]/60 hover:bg-[#590d0d]/5 hover:text-[#590d0d] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Back to Home
          </a>
          <button onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500/80 hover:bg-red-50 hover:text-red-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="border-b border-[#590d0d]/10 bg-white/50 px-8 py-4 backdrop-blur-sm">
          <h1 className="text-xl font-bold text-[#590d0d]">
            {activeTab === "manage" ? "My Sarees" : editingId ? "Edit Saree" : "Add New Saree"}
          </h1>
          <p className="mt-0.5 text-xs text-[#590d0d]/50">
            {activeTab === "manage"
              ? `${sarees.length} saree${sarees.length !== 1 ? "s" : ""} listed.`
              : editingId ? "Update your saree details." : "Fill in the fields to list a new saree."}
          </p>
        </header>

        <main className="flex-1 overflow-y-auto p-8">

          {/* ── MANAGE TAB ──────────────────────────────────── */}
          {activeTab === "manage" && (
            <div>
              {loadingSarees ? (
                <div className="flex items-center justify-center py-24">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#590d0d]/20 border-t-[#590d0d]" />
                </div>
              ) : sarees.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#590d0d]/20 bg-white/40 py-24">
                  <span className="text-6xl">🧣</span>
                  <p className="mt-5 text-base font-semibold text-[#590d0d]/60">No sarees listed yet</p>
                  <button onClick={() => setActiveTab("add")} className="mt-6 rounded-lg bg-[#590d0d] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity">
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
                        <tr key={saree._id} className={`border-b border-[#590d0d]/5 transition-colors hover:bg-[#590d0d]/5 ${idx % 2 !== 0 ? "bg-white/40" : ""}`}>
                          <td className="px-5 py-4">
                            <p className="font-semibold text-[#590d0d]">{saree.name}</p>
                            <p className="mt-0.5 max-w-xs truncate text-xs text-[#590d0d]/50">{saree.description}</p>
                          </td>
                          <td className="px-5 py-4 text-[#590d0d]/70">{saree.category || "—"}</td>
                          <td className="px-5 py-4 text-[#590d0d]/70">{saree.color || "—"}</td>
                          <td className="px-5 py-4 font-semibold text-[#590d0d]">৳{saree.price.toLocaleString()}</td>
                          <td className="px-5 py-4">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${saree.quantity > 0 && saree.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                              {saree.isAvailable && saree.quantity > 0 ? `${saree.quantity} in stock` : "Out of Stock"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleEdit(saree)} className="rounded-md border border-[#590d0d]/20 px-3 py-1.5 text-xs font-semibold text-[#590d0d] transition-colors hover:bg-[#590d0d] hover:text-white">Edit</button>
                              {deleteConfirmId === saree._id ? (
                                <div className="flex items-center gap-1.5">
                                  <button onClick={() => handleDelete(saree._id)} className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors">Confirm</button>
                                  <button onClick={() => setDeleteConfirmId(null)} className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
                                </div>
                              ) : (
                                <button onClick={() => setDeleteConfirmId(saree._id)} className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors">Delete</button>
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

          {/* ── ADD / EDIT FORM TAB ─────────────────────────── */}
          {activeTab === "add" && (
            <div className="mx-auto max-w-2xl">
              <form onSubmit={handleSubmit} className="rounded-xl border border-[#590d0d]/10 bg-white/70 p-8 shadow-sm">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* ── Basic Info ── */}
                  <div className="md:col-span-2">
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#590d0d]/40">Basic Information</p>
                    <label className={labelCls}>Saree Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Banarasi Silk Saree" required className={inputCls} />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelCls}>Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the saree — weave, occasion, specialty..." rows={4} className={`${inputCls} resize-none`} />
                  </div>

                  {/* ── Pricing & Stock ── */}
                  <div className="md:col-span-2 pt-2">
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#590d0d]/40">Pricing & Stock</p>
                  </div>

                  <div>
                    <label className={labelCls}>Price (BDT) <span className="text-red-500">*</span></label>
                    <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 5000" required min={0} className={inputCls} />
                  </div>

                  <div>
                    <label className={labelCls}>Available Quantity</label>
                    <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 10" min={0} className={inputCls} />
                  </div>

                  <div className="md:col-span-2 flex items-center gap-3">
                    <input type="checkbox" name="isAvailable" id="isAvailable" checked={form.isAvailable} onChange={handleChange} className="h-4 w-4 rounded text-[#590d0d] focus:ring-[#590d0d]" />
                    <label htmlFor="isAvailable" className="text-sm font-semibold text-[#590d0d]">Mark as Available for Sale</label>
                  </div>

                  {/* ── Details ── */}
                  <div className="md:col-span-2 pt-2">
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#590d0d]/40">Saree Details</p>
                  </div>

                  <div>
                    <label className={labelCls}>Category</label>
                    <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
                      <option value="">Select category</option>
                      {["Silk", "Cotton", "Jamdani", "Muslin", "Georgette", "Chiffon", "Linen", "Net", "Katan", "Tant"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Fabric Type</label>
                    <input type="text" name="fabric" value={form.fabric} onChange={handleChange} placeholder="e.g. Pure Silk, Blended Cotton" className={inputCls} />
                  </div>

                  <div>
                    <label className={labelCls}>Color</label>
                    <input type="text" name="color" value={form.color} onChange={handleChange} placeholder="e.g. Red & Gold, Off-White" className={inputCls} />
                  </div>

                  <div>
                    <label className={labelCls}>Size / Length</label>
                    <input type="text" name="size" value={form.size} onChange={handleChange} placeholder="e.g. 6.5 meters, with blouse piece" className={inputCls} />
                  </div>

                  {/* ── Image URLs ── */}
                  <div className="md:col-span-2 pt-2">
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#590d0d]/40">Product Images (URLs)</p>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={form.imageInput}
                        onChange={(e) => setForm((p) => ({ ...p, imageInput: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                        placeholder="Paste image URL and press Enter or click Add"
                        className={inputCls}
                      />
                      <button type="button" onClick={addImage} className="shrink-0 rounded-lg bg-[#590d0d]/10 px-4 py-2.5 text-xs font-bold text-[#590d0d] hover:bg-[#590d0d]/20 transition-colors">
                        Add
                      </button>
                    </div>
                    {form.images.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {form.images.map((url, i) => (
                          <div key={i} className="flex items-center gap-1.5 rounded-md bg-[#590d0d]/5 px-3 py-1.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt="" className="h-6 w-6 rounded object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                            <span className="max-w-[120px] truncate text-xs text-[#590d0d]">{url}</span>
                            <button type="button" onClick={() => removeImage(i)} className="text-[#590d0d]/40 hover:text-red-500 transition-colors">✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── Tags ── */}
                  <div className="md:col-span-2">
                    <label className={labelCls}>Tags / Keywords</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={form.tagsInput}
                        onChange={(e) => setForm((p) => ({ ...p, tagsInput: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        placeholder="e.g. wedding, bridal, handwoven — press Enter"
                        className={inputCls}
                      />
                      <button type="button" onClick={addTag} className="shrink-0 rounded-lg bg-[#590d0d]/10 px-4 py-2.5 text-xs font-bold text-[#590d0d] hover:bg-[#590d0d]/20 transition-colors">
                        Add
                      </button>
                    </div>
                    {form.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {form.tags.map((tag) => (
                          <span key={tag} className="flex items-center gap-1 rounded-full bg-[#590d0d] px-3 py-1 text-xs font-semibold text-white">
                            #{tag}
                            <button type="button" onClick={() => removeTag(tag)} className="ml-1 opacity-70 hover:opacity-100">✕</button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── Error & Submit ── */}
                  {formError && (
                    <div className="md:col-span-2">
                      <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600">{formError}</p>
                    </div>
                  )}

                  <div className="flex gap-3 md:col-span-2 pt-2">
                    <button type="submit" disabled={submitting} className="flex items-center gap-2 rounded-lg bg-[#590d0d] px-8 py-2.5 text-sm font-bold tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-50">
                      {submitting ? "Saving..." : editingId ? "SAVE CHANGES" : "ADD SAREE"}
                      {!submitting && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      )}
                    </button>
                    <button type="button" onClick={cancelEdit} className="rounded-lg border border-[#590d0d]/20 px-6 py-2.5 text-sm font-semibold text-[#590d0d] transition-colors hover:bg-[#590d0d]/5">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {/* ── PROFILE TAB ─────────────────────────────────────────────── */}
          {activeTab === "profile" && (
            <div className="mx-auto max-w-xl">
              <form onSubmit={handleUpdateProfile} className="rounded-xl border border-[#590d0d]/10 bg-white/70 p-8 shadow-sm">
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-lg font-bold text-[#590d0d]">Update Profile</h2>
                    <p className="text-sm text-[#590d0d]/60">Customize your display name and profile picture.</p>
                  </div>
                  
                  {/* Name Input */}
                  <div>
                    <label className={labelCls}>Full Name</label>
                    <input 
                      type="text" 
                      value={profileName} 
                      onChange={(e) => setProfileName(e.target.value)} 
                      placeholder="Your name" 
                      required 
                      className={inputCls} 
                    />
                  </div>

                  {/* Image Drag and Drop */}
                  <div>
                    <label className={labelCls}>Profile Picture</label>
                    <div 
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed p-8 transition-colors ${
                        isDragging ? "border-[#590d0d] bg-[#590d0d]/5" : "border-[#590d0d]/20 hover:border-[#590d0d]/40"
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                      />
                      {profileImagePreview ? (
                        <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={profileImagePreview} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#590d0d]/10 text-[#590d0d]">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                          </svg>
                        </div>
                      )}
                      <p className="mt-4 text-sm font-semibold text-[#590d0d]">
                        {profileImagePreview ? "Click or drag to change image" : "Drag and drop or click to upload image"}
                      </p>
                      <p className="mt-1 text-xs text-[#590d0d]/50">SVG, PNG, JPG or GIF (max. 5MB)</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#590d0d]/10">
                    <button 
                      type="submit" 
                      disabled={updatingProfile} 
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#590d0d] px-8 py-3 text-sm font-bold tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                      {updatingProfile ? "UPDATING..." : "SAVE PROFILE"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
