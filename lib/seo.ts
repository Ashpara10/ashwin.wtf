// Single source of truth for the site's canonical domain
// Read from environment variable, fallback to placeholder if not set
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ashwinn.vercel.app';

// Default export for convenience (allows `import BASE_URL from '@/lib/seo'`)
export default BASE_URL;
