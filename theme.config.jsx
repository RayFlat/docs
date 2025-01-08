import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";

export default {
  logo: (
    <span
      style={{
        fontWeight: 600,
        fontSize: "1.5rem",
      }}
    >
      RayFlat
    </span>
  ),
  project: {
    link: "https://github.com/RayFlat",
  },
  i18n: [
    { locale: "en", name: "English" },
    { locale: "es", name: "Español" },
  ],
  head() {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();

    const url =
      "https://docs.rayflat.com" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    return (
      <>
        <link rel="icon" type="image/icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        {/* OG METADATA */}
        <meta charset="utf-8" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description} />

        <title>{frontMatter.title}</title>
        <meta name="description" content={frontMatter.description} />
      </>
    );
  },
};
