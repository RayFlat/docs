import "../styles/font.css";
import "../styles/global.css";
import "nextra-theme-docs/style.css";
import { Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.rayflat.com"),
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  openGraph: {
    images: [
      {
        url: "/preview.webp",
        width: 5009,
        height: 2500,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: "/preview.webp",
    site: "@rayflatapp",
  },
};

const logo = (
  <span
    style={{
      fontWeight: 600,
      fontSize: "1.5rem",
    }}
  >
    RayFlat
  </span>
);

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pageMap = await getPageMap();
  
  return (
    <html lang="es" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="📚" />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={logo}
              projectLink="https://github.com/RayFlat"
            />
          }
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
