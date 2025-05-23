const SITE_URL =
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: 'public',
  
  // Exclude paths that shouldn't be in sitemap
  exclude: [
    '/admin/*',
    '/api/*',
    '/_next/*',
    '/static/*',
    '/404',
    '/500',
    '/sitemap.xml',
    '/robots.txt',
    '/favicon.ico',
    '/manifest.json',
    '/sw.js',
    '/workbox-*.js',
    '/fallback-*.js',
    '/precache-*.js',
    '/service-worker.js',
    '/offline',
    '/_error',
    '/_document',
    '/_app',
  ],

  // Default settings for all pages
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,

  // Custom settings for specific paths
  transform: async (config, path) => {
    // Custom priority for homepage
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // Custom priority for blog posts
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    // Default transformation
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/*',
          '/api/*',
          '/_next/*',
          '/static/*',
          '/private/*',
          '/dashboard/*',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/sitemap.xml`,
    ],
    host: SITE_URL,
  },
}
