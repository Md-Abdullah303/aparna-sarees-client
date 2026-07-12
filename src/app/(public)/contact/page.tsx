"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const getLabelColor = (inputId: string) => {
    return focusedInput === inputId ? "#570000" : "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill in your name, email, and message.");
      toast.error("Please fill in your name, email, and message.");
      setSubmitStatus("error");
      return;
    }

    setSubmitting(true);
    setSubmitStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/server/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitStatus("success");
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.message || "Failed to send message.");
        toast.error(data.message || "Failed to send message.");
        setSubmitStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      toast.error("Network error. Please try again.");
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-plusJakartaSans overflow-x-hidden">
      
      {/* Hero Section / Header */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-16 px-6 md:px-16 max-w-7xl mx-auto text-center"
      >
        <h1 className="font-ebGaramond text-5xl md:text-6xl text-primary mb-4 italic font-semibold">Get in Touch</h1>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
          Experience the artistry of centuries-old weaving traditions. Whether you seek a custom ensemble or have questions about our heritage collections, we are here to assist.
        </p>
      </motion.section>

      {/* Two Column Layout */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Left: Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-12"
          >
            <div>
              <h3 className="font-ebGaramond text-2xl text-primary mb-6 font-semibold">Our Boutique</h3>
              <div className="space-y-6 text-on-surface-variant">
                <div className="flex items-start space-x-4">
                  <span className="material-symbols-outlined text-secondary pt-1">location_on</span>
                  <div>
                    <p className="font-bold text-xl text-on-surface">Park Street Emporium</p>
                    <p className="leading-relaxed">
                      12B Heritage Row, Near Park Street Plaza<br/>
                      Kolkata, West Bengal 700016<br/>
                      India
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="material-symbols-outlined text-secondary">call</span>
                  <p>+91 33 2288 0000</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="material-symbols-outlined text-secondary">mail</span>
                  <p>concierge@aparnasarees.com</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-ebGaramond text-2xl text-primary mb-6 font-semibold">Store Hours</h3>
              <div className="space-y-2 text-on-surface-variant">
                <div className="flex justify-between border-b border-[#e2bfb9]/20 pb-2">
                  <span>Monday - Saturday</span>
                  <span>10:30 AM - 8:30 PM</span>
                </div>
                <div className="flex justify-between border-b border-[#e2bfb9]/20 pb-2">
                  <span>Sunday</span>
                  <span>11:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-ebGaramond text-2xl text-primary mb-6 font-semibold">Follow Our Journey</h3>
              <div className="flex space-x-6">
                <a className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all duration-300" href="#">
                  <span className="material-symbols-outlined">share</span>
                </a>
                <a className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all duration-300" href="#">
                  <span className="material-symbols-outlined">camera_indoor</span>
                </a>
                <a className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all duration-300" href="#">
                  <span className="material-symbols-outlined">video_library</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-12 border border-[#e2bfb9]/20 shadow-sm rounded-sm"
          >
            {/* Success Message */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 rounded-sm bg-green-50 border border-green-200 p-5 text-center"
              >
                <span className="text-3xl block mb-2">✉️</span>
                <p className="font-bold text-green-800 text-lg">Message Sent!</p>
                <p className="text-green-700 text-sm mt-1">
                  Thank you for reaching out. We&apos;ll get back to you soon.
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 rounded-sm bg-red-50 border border-red-200 p-4"
              >
                <p className="text-red-700 text-sm font-medium">{errorMsg}</p>
              </motion.div>
            )}

            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="relative">
                <input 
                  className="w-full py-2 bg-transparent border-0 border-b border-[#ffe088] transition-all duration-300 focus:outline-none focus:ring-0 focus:border-b-2 focus:border-[#570000] peer placeholder-transparent" 
                  id="name" 
                  placeholder="Full Name" 
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                  required
                />
                <label 
                  className="absolute left-0 -top-6 text-sm text-secondary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:text-[#5a413d]/60 peer-focus:-top-6 peer-focus:text-secondary peer-focus:text-sm" 
                  htmlFor="name"
                  style={{ color: getLabelColor("name") }}
                >
                  Full Name
                </label>
              </div>

              <div className="relative">
                <input 
                  className="w-full py-2 bg-transparent border-0 border-b border-[#ffe088] transition-all duration-300 focus:outline-none focus:ring-0 focus:border-b-2 focus:border-[#570000] peer placeholder-transparent" 
                  id="email" 
                  placeholder="Email Address" 
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  required
                />
                <label 
                  className="absolute left-0 -top-6 text-sm text-secondary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:text-[#5a413d]/60 peer-focus:-top-6 peer-focus:text-secondary peer-focus:text-sm" 
                  htmlFor="email"
                  style={{ color: getLabelColor("email") }}
                >
                  Email Address
                </label>
              </div>

              <div className="relative">
                <select 
                  className="w-full py-2 bg-transparent border-0 border-b border-[#ffe088] transition-all duration-300 focus:outline-none focus:ring-0 focus:border-b-2 focus:border-[#570000] appearance-none" 
                  id="subject"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("subject")}
                  onBlur={() => setFocusedInput(null)}
                >
                  <option disabled value="">Select Inquiry Type</option>
                  <option value="bridal">Bridal Consultation</option>
                  <option value="orders">Existing Order</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="other">General Question</option>
                </select>
                <label 
                  className="absolute left-0 -top-6 text-sm text-secondary" 
                  htmlFor="subject"
                  style={{ color: getLabelColor("subject") }}
                >
                  Subject
                </label>
              </div>

              <div className="relative">
                <textarea 
                  className="w-full py-2 bg-transparent border-0 border-b border-[#ffe088] transition-all duration-300 focus:outline-none focus:ring-0 focus:border-b-2 focus:border-[#570000] peer placeholder-transparent resize-none" 
                  id="message" 
                  placeholder="Message" 
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("message")}
                  onBlur={() => setFocusedInput(null)}
                  required
                ></textarea>
                <label 
                  className="absolute left-0 -top-6 text-sm text-secondary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:text-[#5a413d]/60 peer-focus:-top-6 peer-focus:text-secondary peer-focus:text-sm" 
                  htmlFor="message"
                  style={{ color: getLabelColor("message") }}
                >
                  How can we help you?
                </label>
              </div>

              <button 
                className="w-full bg-primary text-[#ffe088] py-5 px-8 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-60 disabled:cursor-not-allowed" 
                type="submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span>Sending…</span>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#ffe088]/30 border-t-[#ffe088]" />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="material-symbols-outlined scale-75">send</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Visit Our Boutique Section (Map) */}
      <section className="py-24 bg-[#f6f3f2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/3"
            >
              <h2 className="font-ebGaramond text-4xl md:text-5xl text-primary mb-6 font-semibold">Visit Our Boutique</h2>
              <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                Step into a world of timeless elegance. Our Kolkata boutique offers a curated experience where you can feel the textures of premium silk and witness the detail of hand-embroidered heritage pieces.
              </p>
              <a className="inline-flex items-center text-primary font-bold border-b-2 border-primary pb-1 group transition-all" href="#">
                Get Directions
                <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/3 w-full h-[500px] relative"
            >
              <div className="w-full h-full bg-[#eae7e7] relative overflow-hidden group rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  alt="Park Street Kolkata Map" 
                  className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-1000" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZYd_YPRrls4yqL68kCVSe_HbwYesYXfjQ8I4b12iN2SvyTvH_P1Dt_C19M_ZzYkApL2vS6OF8hAN4VweYDCIGwobyP3jE8ITbYZhWQqSzDIdyrKAXzBJXZ4QNwr7JThFdYkKR8WhRG7JD6CdHN2A2u-GOjHK6j9eE-NM_bHrxeiU0KXkr-2tmLS5Wtm4E3EmwPJJ4Vfc8KO7GhuRpiEKcDaMTB7Nypm3eOu_4qU6QtzZqaUkevto1"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-primary p-4 shadow-2xl animate-bounce rounded-full">
                    <span className="material-symbols-outlined text-[#ffe088] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Lifestyle Editorial Breakout */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[600px] max-w-none"
      >
        <div className="absolute inset-0 bg-primary/20 z-10"></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          alt="Legacy of Elegance" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcNuEyJhyilsktLDqRE4mjpRHOqAW7Bs-s810jTCx6f4ksdUVt8mfmUi4Rk31bv3HYz6ukWjnFhVMQPSgckDYDVqeSxr8_8y9S18vllVluijrFOSko0P_15JDSRTXQde7S_SbkgINlLC28FrdU7wL3QsdISV1y3IzEAVkMXjW13lE4okSJAB5ERHHklKPx6iotnWuB4uI1WSHSiV83MMmL-dIC7NukEpLX7O4B1TNyBaLN4__WfqOg"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white text-center px-6">
          <h2 className="font-ebGaramond text-4xl md:text-5xl italic mb-4 font-semibold">A Legacy of Elegance</h2>
          <p className="text-sm tracking-widest uppercase font-bold">Since 1924</p>
        </div>
      </motion.section>

    </div>
  );
}
