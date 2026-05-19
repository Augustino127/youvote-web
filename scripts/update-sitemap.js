import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const today = new Date().toISOString().split('T')[0]
const BASE_URL = 'https://youvote-web.vercel.app'

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/youvote.apk</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`

const distPath = join(__dirname, '..', 'dist', 'sitemap.xml')
writeFileSync(distPath, sitemap, 'utf8')
console.log(`✅ sitemap.xml généré (${today})`)
