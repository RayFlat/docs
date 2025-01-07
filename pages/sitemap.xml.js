function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
        <loc>https://docs.rayflat.com/es</loc>
        <xhtml:link
            rel="alternate"
            hreflang="es"
            href="https://docs.rayflat.com/es" />
        <xhtml:link
            rel="alternate"
            hreflang="en"
            href="https://docs.rayflat.com/en" />
        <lastmod>2025-01-07T17:00:51.499Z</lastmod>
        <changefreq>daily</changefreq>
    </url>
     <url>
        <loc>https://docs.rayflat.com/es/Facturacion/suscripcion</loc>
        <xhtml:link
            rel="alternate"
            hreflang="es"
            href="https://docs.rayflat.com/es/Facturacion/suscripcion" />
        <xhtml:link
            rel="alternate"
            hreflang="en"
            href="https://docs.rayflat.com/en/Billing/subscription" />
        <lastmod>2025-01-07T17:49:43.877Z</lastmod>
        <changefreq>daily</changefreq>
    </url>
</urlset>`;
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
