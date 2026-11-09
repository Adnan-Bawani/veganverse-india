import { MetadataRoute } from 'next';
import { getCategories, getProducts, getStores } from '@/lib/data-service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const [categories, { products }, stores] = await Promise.all([
    getCategories(),
    getProducts(),
    getStores(),
  ]);

  const staticRoutes = [
    '',
    '/shop',
    '/categories',
    '/brands',
    '/sell',
    '/seller/apply',
    '/about',
    '/how-it-works',
    '/journal',
    '/contact',
    '/faq',
    '/policies/privacy',
    '/policies/terms',
    '/policies/returns',
    '/policies/seller-agreement',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const brandRoutes = stores.map((store) => ({
    url: `${baseUrl}/brand/${store.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const productRoutes = products.map((prod) => ({
    url: `${baseUrl}/product/${prod.slug}`,
    lastModified: new Date(prod.updated_at || prod.created_at),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...brandRoutes, ...productRoutes];
}

