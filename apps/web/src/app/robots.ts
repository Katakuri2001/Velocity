import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/inventory', '/category', '/compare', '/favorites', '/contact'],
      disallow: ['/admin', '/api/admin'],
    },
    sitemap: 'https://velocity.showroom/sitemap.xml',
  }
}
