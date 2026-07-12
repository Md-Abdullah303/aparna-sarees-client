"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="bg-surface text-on-surface overflow-x-hidden font-plusJakartaSans">
      
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            alt="Heritage Saree Display" 
            className="w-full h-full object-cover brightness-[0.85]" 
            src="https://lh3.googleusercontent.com/aida/AP1WRLuFRjsnh0h82v1t_9eidpkxsk9M3IP38j9ogxTWXWLuDrfeqGl_4eBIxhJzj6qim5G_7bxyQLohii4ln3DlQjA1woq55uECv73mfoZRQCovAToWX1qCTwqDGXDIrimkhHNKlN74MNdMrqlywaqZP6MVnhTwFICjYK58omNraS3jfxqLnRcKvqtUkRRzZwAqlkj4XlNTAQtMPGnn_fmSRmzXM_hW7AGJImnC6Ev4GmA5mMglKFSqW670NY0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 px-6 sm:px-16 max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="text-sm uppercase tracking-[0.3em] mb-6 block text-secondary-fixed font-bold">Woven Legacies</span>
            <h1 className="font-ebGaramond text-5xl md:text-[64px] leading-tight mb-8 font-semibold">The Soul of Indian Craftsmanship</h1>
            <p className="text-lg md:text-xl mb-10 opacity-90 leading-relaxed max-w-lg">
              Preserving the intricate art of hand-woven sarees for three generations. A journey through the looms of Banaras to the temples of Kanchipuram.
            </p>
            <button className="bg-maroon text-gold px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-maroon/80 transition-all duration-300">
              Explore Collection
            </button>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="px-6 sm:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-48 h-48 border-[12px] border-gold/10 z-0 hidden md:block"></div>
            <div className="relative z-10 border-[1px] border-maroon/10 p-4 bg-white shadow-[0_4px_30px_rgba(128,0,0,0.05)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt="A vintage-style black and white photograph of an elderly Indian master weaver working on a traditional wooden loom" 
                className="w-full h-[400px] md:h-[600px] object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhaajXBww6FXh7QVe-P1Lqx9ijSGJlrW3ISUlWDAKKJAd6Gs-ZFWnv4yALx9SyyLtFppCW5CtKxvMEmlbwYWpDdiv4WhVGPnEZihk3y5rGE0uvu-mJ8SzHuWqG5Y9OB3u93zzrUn93PoINnypxntkNclpwbm-o8mv1R9l2mhN_FR9sjJ7lrryu8FqD66DL19O-uwo2kqLlEzgLJUoCF4giOybNkDtYSqcCkXGjALaJ3iGVYutvc0-1"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-ebGaramond text-4xl text-maroon mb-12 font-semibold relative inline-block">
              Our Story
              <span className="absolute -bottom-2 left-0 w-16 h-[2px] bg-gold"></span>
            </h2>
            <p className="text-lg text-on-surface-variant mb-6 leading-relaxed">
              Aparna began in a small workshop in 1954, fueled by a singular passion: to ensure that the exquisite artistry of Indian handlooms never faded into memory. What started with a handful of master weavers in Banaras has grown into a prestigious house of heritage textiles.
            </p>
            <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
              Each Aparna saree is more than just six yards of fabric; it is a canvas of history. Our founder, Aparna Devi, traveled across the subcontinent to document dying weaving patterns, bringing them back to life with a contemporary touch that honors their royal roots.
            </p>
            <blockquote className="border-l-4 border-gold pl-6 py-2 italic font-ebGaramond text-2xl text-maroon/80 mb-8 font-medium">
              "We don't just sell sarees; we pass on an heirloom that carries the heartbeat of the artisan."
            </blockquote>
          </motion.div>
          
        </div>
      </section>

      {/* The Craft Section */}
      <section className="py-24 bg-surface">
        <div className="px-6 sm:px-16 max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-sm font-bold text-gold uppercase tracking-widest mb-4 block">Artistry in Every Thread</span>
            <h2 className="font-ebGaramond text-4xl text-maroon font-semibold">The Craft</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Banarasi */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  alt="Banarasi silk saree detail" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRk2cGEnW1mverwOIKpuDmAbn5wxCQnLSxLwdAwn1vQe_4G6xEiPNRG6UmTVXCSdWE_1mOxo4iRQGxt9JuCTdEQALPaFAMvR7EaFQb-Aks0fedt5Rf-V1taXy2Osal5vxd4IoMHbxETCV0fxPQIlhFueh2LdRyeJQuYqQumf2bk9win6UjR2mEHGJIoC3oJzRr_6ikdlEy2CpiQbRp0HB2_-2JSO7vx7YIzIFLUIFmJKnp1OYxWziG"
                />
                <div className="absolute inset-0 bg-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-gold text-sm font-bold tracking-widest border border-gold px-6 py-2">DISCOVER</span>
                </div>
              </div>
              <h3 className="font-ebGaramond text-2xl text-maroon mb-2 font-semibold">Banarasi Silk</h3>
              <p className="text-on-surface-variant opacity-80">Opulent gold and silver brocade work, hand-woven in the sacred city of Varanasi.</p>
            </motion.div>

            {/* Kanjivaram */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group cursor-pointer mt-0 md:mt-12"
            >
              <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  alt="Kanjivaram silk saree detail" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKgWSI14tzRYlRwrddpbSg8dcUeDLD5K41K1KIRqNYTU7ATf2zCpjZotarq7taoin6FLMjj5ZphQ60RNkiCEv7XNn1xyBb4rcSdIWHLXPJ3NJZEUdX620fxBgX1QbZKSQEJM10kzPWJNhqL6USAaBoVlTO5HqP9Qbk_Ckjh8sV0E7yGCfA70nMkYCEhoXEk-sbetbN1Yfg2Z7ATMkUZxPMy2jhnMHQP398lv9X6vqvt7S8pr25RC60"
                />
                <div className="absolute inset-0 bg-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-gold text-sm font-bold tracking-widest border border-gold px-6 py-2">DISCOVER</span>
                </div>
              </div>
              <h3 className="font-ebGaramond text-2xl text-maroon mb-2 font-semibold">Kanjivaram</h3>
              <p className="text-on-surface-variant opacity-80">Traditional 'Temple' borders and heavy silk weights from the looms of Kanchipuram.</p>
            </motion.div>

            {/* Zari Work */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group cursor-pointer mt-0 md:mt-24"
            >
              <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  alt="Zari weaving process" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD46L8-6tjByH_E8AssokycYRPnSTbgfbSJgO_8L4yUOfUEBZOX5DMX-RXxxfrPFH8tlplMGzvYbTDqlRXyAhPiVlAqPoNzZlHeafav8vtsICSvHNJf2DGaWdyD8n66NnHCxLnZYXKaHIr5PzgjXY327fb3j_SlEgRsjJbSLfsVeUr-oG1W_UKihFvXA59RW7pD3v5G8pgeXHJxGlRalCdcgSPCqAe29u6RrsRlMSuRJq0wiIDjo2pn"
                />
                <div className="absolute inset-0 bg-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-gold text-sm font-bold tracking-widest border border-gold px-6 py-2">DISCOVER</span>
                </div>
              </div>
              <h3 className="font-ebGaramond text-2xl text-maroon mb-2 font-semibold">Zari Artistry</h3>
              <p className="text-on-surface-variant opacity-80">The hallmark of our collection: genuine gold and silver threads woven with unmatched precision.</p>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-24 bg-maroon text-surface relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none">
          <svg className="w-full h-full fill-gold" viewBox="0 0 100 100">
            <path d="M50 0 L100 50 L50 100 L0 50 Z"></path>
          </svg>
        </div>
        
        <div className="px-6 sm:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-ebGaramond text-4xl text-gold mb-10 font-semibold">Our Mission</h2>
            <div className="max-w-3xl">
              <p className="font-ebGaramond text-4xl md:text-[48px] mb-8 leading-tight font-semibold">
                To preserve, protect, and promote the legacy of the Indian handloom weaver.
              </p>
              <p className="text-lg opacity-80 mb-12 leading-relaxed text-[#FFF9D0]">
                We are committed to fair trade practices, ensuring that our master artisans receive the recognition and reward their skill deserves. By bridging the gap between rural looms and global luxury, we ensure that these centuries-old traditions remain vibrant for generations to come.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div>
                  <span className="font-ebGaramond text-[40px] text-gold block mb-2 font-semibold">300+</span>
                  <span className="text-sm uppercase tracking-widest opacity-60 font-bold text-[#FFF9D0]">Master Weavers</span>
                </div>
                <div>
                  <span className="font-ebGaramond text-[40px] text-gold block mb-2 font-semibold">15+</span>
                  <span className="text-sm uppercase tracking-widest opacity-60 font-bold text-[#FFF9D0]">States Covered</span>
                </div>
                <div>
                  <span className="font-ebGaramond text-[40px] text-gold block mb-2 font-semibold">70 Yrs</span>
                  <span className="text-sm uppercase tracking-widest opacity-60 font-bold text-[#FFF9D0]">Of Heritage</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship Details / Mini Bento */}
      <section className="py-24 bg-surface-container-low">
        <div className="px-6 sm:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-1 lg:col-span-8 h-[400px] lg:h-full relative overflow-hidden group rounded-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt="Courtyard" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxrbezFW0OI_1ryBxJHSCLBvBrWo6wuMlHhAaNUi_WD3fTqsmNlq_NBlLQ50yXH_qkL9nzfXdXrf0TP4bsO1trqTTbMYlCV0JHjEGaZPqd5FGKjpPEdIoohD5_8aJ__UJxgnGnRKe4eaYjaWr2MFafVtbz1RjpHGLEnyjrMaeQ8klUUXVCLhKDxFbs0JbeqBsDZYX8T74C9vA90T55nJ4py0aIIwE2fmcvCMEYvWibKzGI_WlJAkHi"
              />
              <div className="absolute bottom-8 left-8 p-8 bg-white/90 backdrop-blur-md max-w-md shadow-[0_4px_30px_rgba(128,0,0,0.05)]">
                <h4 className="font-ebGaramond text-2xl text-maroon mb-4 font-semibold">Ethically Sourced Silk</h4>
                <p className="text-on-surface-variant">We partner directly with silk farms that prioritize sustainable practices, ensuring the finest quality starting from the very thread.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-1 lg:col-span-4 flex flex-col gap-8"
            >
              <div className="flex-1 bg-cream p-10 border-b-4 border-gold relative group overflow-hidden rounded-sm">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-maroon mb-6 block" style={{ fontSize: "40px" }}>auto_awesome</span>
                  <h4 className="font-ebGaramond text-2xl text-maroon mb-4 font-semibold">Quality Guarantee</h4>
                  <p className="text-on-surface-variant">Every Aparna saree undergoes a rigorous 12-point inspection for weave density, zari purity, and color fastness.</p>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined" style={{ fontSize: "200px" }}>verified</span>
                </div>
              </div>
              
              <div className="flex-1 bg-maroon p-10 relative group overflow-hidden rounded-sm">
                <div className="relative z-10 text-white">
                  <span className="material-symbols-outlined text-gold mb-6 block" style={{ fontSize: "40px" }}>package_2</span>
                  <h4 className="font-ebGaramond text-2xl text-gold mb-4 font-semibold">Heritage Packaging</h4>
                  <p className="opacity-80">Delivered in handmade wooden chests with breathable silk pouches to preserve your heirloom for a lifetime.</p>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-white" style={{ fontSize: "200px" }}>inventory_2</span>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

    </div>
  );
}
