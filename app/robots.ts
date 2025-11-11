import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration for search engine crawlers
 * Optimized for both traditional search engines (Google, Bing)
 * and AI search engines (Perplexity, ChatGPT Search, etc.)
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mortgage-crm-production-7a9a.up.railway.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      // Specific rules for AI crawlers
      {
        userAgent: [
          'GPTBot',           // OpenAI's ChatGPT
          'ChatGPT-User',     // ChatGPT browsing
          'CCBot',            // Common Crawl (used by many AI)
          'anthropic-ai',     // Anthropic (Claude)
          'ClaudeBot',        // Claude's web crawler
          'PerplexityBot',    // Perplexity AI
          'Bytespider',       // ByteDance (TikTok)
          'Diffbot',          // Diffbot AI
        ],
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      // Google-specific optimizations
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Bing-specific optimizations
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
