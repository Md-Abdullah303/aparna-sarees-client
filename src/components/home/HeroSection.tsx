"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { HERO_SLIDES } from "@/lib/hero-slides";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function HeroSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-[var(--color-hero-bg)] pt-28 pb-16 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(197,160,89,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(90,55,30,0.35),transparent_60%)]" />

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={1}
        loop
        speed={800}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          el: ".hero-pagination",
          bulletClass: "hero-bullet",
          bulletActiveClass: "hero-bullet-active",
        }}
        className="relative h-full w-full"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.image}>
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16">
              <div className="z-10 flex flex-col gap-8">
                <div>
                  <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[var(--color-primary)]">
                    Aparna Sarees
                  </p>
                  <h1 className="max-w-xl">
                    <span className="font-hero block text-4xl leading-[1.1] text-[var(--color-text)] sm:text-5xl lg:text-[3.5rem]">
                      {slide.title}
                    </span>
                    <span className="font-hero mt-1 block text-4xl italic leading-[1.1] text-[var(--color-primary)] sm:text-5xl lg:text-[3.75rem]">
                      {slide.accent}
                    </span>
                  </h1>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
                    {slide.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/browse-sarees"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-8 py-3.5 text-sm font-semibold text-[var(--color-primary-foreground)] shadow-lg shadow-[var(--color-primary)]/25 transition-transform hover:scale-[1.02] hover:brightness-110"
                  >
                    Shop Now
                  </Link>
                  <Link
                    href="/browse-sarees"
                    className="inline-flex items-center justify-center rounded-full border border-[var(--color-primary)] px-8 py-3.5 text-sm font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-primary)]/10"
                  >
                    View Collection
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-[var(--color-primary)]/10 blur-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl shadow-black/40">
                  <Image
                    src={slide.image}
                    alt={`${slide.title} ${slide.accent}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full p-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)] sm:left-6 md:flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-8 w-8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full p-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)] sm:right-6 md:flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-8 w-8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="hero-pagination absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2" />
    </section>
  );
}
