import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Ethical Living Journal & Guides',
  description: 'Articles, maker spotlights, and ingredient deep-dives on the cruelty-free vegan movement.',
};

const ARTICLES = [
  {
    slug: 'demystifying-vegan-cheese-traditional-cashew-fermentation',
    title: 'The Alchemy of Cultured Nut Cheese: How Indian Artisans are Replacing Dairy',
    summary: 'A deep-dive with the bio-chemists and culinary makers behind stone-ground cashew fermentation, probiotical culturing, and cruelty-free aging in Bengaluru.',
    date: 'February 2026',
    author: 'Editorial Desk',
    category: 'Food & Nutrition',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'the-coconut-leather-revolution-circular-materials-kerala',
    title: 'From Coconut Waste to Luxury Bags: Inside Malai Studio’s Circular Bio-Composite',
    summary: 'How agricultural wastewater from Kerala’s coconut harvest is transformed into water-resistant, flexible bio-composites that outperform traditional animal hide.',
    date: 'January 2026',
    author: 'Materials Innovation',
    category: 'Sustainable Fashion',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'understanding-the-fssai-vegan-food-regulations-2022',
    title: 'Consumer Guide: What Does India’s Official FSSAI Vegan Logo Actually Guarantee?',
    summary: 'An explanation of the statutory standards, testing protocols, and certification criteria mandated under the Food Safety and Standards (Vegan Foods) Regulations.',
    date: 'January 2026',
    author: 'Regulatory Compliance Team',
    category: 'Standards & Law',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
];

export default function JournalPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs text-charcoal-muted flex items-center gap-2">
            <Link href="/" className="hover:text-forest">Home</Link>
            <span>/</span>
            <span className="text-forest font-semibold">Journal</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            The Ethical Living Journal
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Spotlights on founding artisans, investigations into bio-materials, and transparent guides to cruelty-free consumer choices in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-lg border border-sand hover:border-forest/50 overflow-hidden shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand/30">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-forest/90 text-ivory text-[10px] uppercase tracking-wider font-semibold">
                  {article.category}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-charcoal-light">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>
                  <h2 className="font-serif font-bold text-lg text-forest hover:text-forest-light transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-xs text-charcoal-muted line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-sand flex items-center justify-between text-xs font-semibold text-forest">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
