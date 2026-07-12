import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1f1510] text-[#e5d5c5] border-t border-[#590d0d]/30">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-3xl font-bold tracking-wider text-[#d9c9a8]">
              Aparna Sarees
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#cbbba0]/80">
              Preserving the ancient loom and weaving the future. Discover handcrafted sarees that carry the timeless legacy of our heritage in every thread.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3a2a1a] text-[#d9c9a8] transition-colors hover:bg-[#590d0d]">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3a2a1a] text-[#d9c9a8] transition-colors hover:bg-[#590d0d]">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-display text-lg font-semibold tracking-wide text-white">
              Collections
            </h3>
            <ul className="space-y-4 text-sm text-[#cbbba0]/80">
              <li><Link href="/browse-sarees?category=Silk Sarees" className="hover:text-[#d9c9a8] hover:underline">Silk Sarees</Link></li>
              <li><Link href="/browse-sarees?category=Jamdani" className="hover:text-[#d9c9a8] hover:underline">Jamdani</Link></li>
              <li><Link href="/browse-sarees?category=Cotton" className="hover:text-[#d9c9a8] hover:underline">Cotton</Link></li>
              <li><Link href="/browse-sarees?category=Georgette" className="hover:text-[#d9c9a8] hover:underline">Georgette</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-display text-lg font-semibold tracking-wide text-white">
              Company
            </h3>
            <ul className="space-y-4 text-sm text-[#cbbba0]/80">
              <li><Link href="/about" className="hover:text-[#d9c9a8] hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#d9c9a8] hover:underline">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-[#d9c9a8] hover:underline">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#d9c9a8] hover:underline">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="mb-6 font-display text-lg font-semibold tracking-wide text-white">
              Get in Touch
            </h3>
            <ul className="space-y-4 text-sm text-[#cbbba0]/80">
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 shrink-0 text-[#d9c9a8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>123 Heritage Loom Street,<br />Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 shrink-0 text-[#d9c9a8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>support@aparnasarees.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-6 sm:flex-row sm:px-10">
          <p className="text-xs text-[#cbbba0]/60">
            © {new Date().getFullYear()} Aparna Sarees. All rights reserved.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-[#cbbba0]/60 sm:mt-0">
            <span>Designed with ♥ for Saree Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
