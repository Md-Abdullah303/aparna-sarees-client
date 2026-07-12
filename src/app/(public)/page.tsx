import { HeroSection } from "@/components/home/HeroSection";
import { TopSareesSection } from "@/components/home/TopSareesSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { TopSellersSection } from "@/components/home/TopSellersSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <TopSareesSection />
      <TopSellersSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
