export * from './database';

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  veganStatus?: string;
  countryOfOrigin?: string;
  availableOnly?: boolean;
  query?: string;
  sort?: 'relevance' | 'newest' | 'price_asc' | 'price_desc';
  page?: number;
  limit?: number;
}
