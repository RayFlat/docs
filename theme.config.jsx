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
      {/* OG METADATA */}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description} />

        <title>{frontMatter.title}</title>
        <meta name="description" content={frontMatter.description} />
      </>
    );
  },
};
