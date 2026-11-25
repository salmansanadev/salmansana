import { articles } from "./portfolio-data";

export const siteOrigin = "https://www.salmansana.me";
export const socialImage = `${siteOrigin}/portraits/salman-01.webp`;

export const mainPages = [
  {
    path: "/",
    label: "Home",
    title: "Salman Sana | Web Developer & Entrepreneur in Turbat",
    description: "Salman Sana is a web developer, entrepreneur, and BBA student at the University of Turbat. Explore his projects, credentials, and business journal.",
  },
  {
    path: "/about",
    label: "About Salman Sana",
    title: "About Salman Sana | Web Developer & BBA Student",
    description: "Meet Salman Sana, a University of Turbat BBA student, founder of Learnoa, and co-founder of JASA Solutions in Balochistan, Pakistan.",
  },
  {
    path: "/portfolio",
    label: "Web Development Projects",
    title: "Web Development Projects | Salman Sana",
    description: "Explore Salman Sana’s selected web development and digital product projects, including the problems they address and the tools used to build them.",
  },
  {
    path: "/blog",
    label: "Journal",
    title: "Business & Entrepreneurship Journal | Salman Sana",
    description: "Read Salman Sana’s journal on finance, marketing, and entrepreneurship, with practical examples from business school and his projects.",
  },
  {
    path: "/credentials",
    label: "Certificates & Achievements",
    title: "Certificates & Achievements | Salman Sana",
    description: "See Salman Sana’s education, certificates, and awards, including his second-place finish in the Kech Academic Gala Business Idea Competition.",
  },
];

export const publicPages = [
  ...mainPages,
  ...articles.map(({ slug, title, excerpt }) => ({
    path: `/blog/${slug}`,
    label: title,
    title: `${title} | Salman Sana`,
    description: excerpt,
  })),
];

export const adminPage = { path: "/admin", title: "Site Admin | Salman Sana", description: "" };
export const missingPage = { path: "/404", title: "Page Not Found | Salman Sana", description: "" };

export function getPageMetadata(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const page = publicPages.find((candidate) => candidate.path === path);
  return {
    ...(page || (path === adminPage.path ? adminPage : missingPage)),
    canonical: page ? `${siteOrigin}${page.path}` : undefined,
  };
}

export function getHeadMetadata(pathname: string) {
  const { title, description, canonical, path } = getPageMetadata(pathname);
  const meta = canonical ? [
    { name: "description", content: description },
    { property: "og:site_name", content: "Salman Sana" },
    { property: "og:type", content: path.startsWith("/blog/") ? "article" : "website" },
    { property: "og:url", content: canonical },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: socialImage },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: socialImage },
  ] : [{ name: "robots", content: "noindex,follow" }];
  return { title, canonical, meta };
}
