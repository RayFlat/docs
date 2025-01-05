function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://docs.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://docs.w3.org/1999/xhtml">
    <url>
        <loc>https://docs.rayflat.com/en</loc>
        <xhtml:link
            rel="alternate"
            hreflang="es"
            href="https://docs.rayflat.com/es" />
        <xhtml:link
            rel="alternate"
            hreflang="en"
            href="https://docs.rayflat.com/en" />
        <lastmod>2025-01-05T20:10:25.788Z</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
    </url>
</urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
