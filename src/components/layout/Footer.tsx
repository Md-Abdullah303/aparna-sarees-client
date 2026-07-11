import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 sm:px-10 lg:flex-row lg:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-2xl text-[var(--color-primary)]">
            Aparna Sarees
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
            Discover handcrafted sarees woven with tradition, elegance, and
            timeless beauty for every occasion.
          </p>
        </div>

        <div className="flex flex-wrap gap-10 text-sm">
          <div>
            <p className="mb-3 font-semibold text-[var(--color-text)]">Shop</p>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              <li>
                <Link href="/browse-sarees" className="hover:text-[var(--color-primary)]">
                  Browse Sarees
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[var(--color-primary)]">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-[var(--color-text)]">Company</p>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              <li>
                <Link href="/about" className="hover:text-[var(--color-primary)]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--color-primary)]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-[var(--color-text-muted)] sm:px-10">
        © {new Date().getFullYear()} Aparna Sarees. All rights reserved.
      </div>
    </footer>
  );
}
