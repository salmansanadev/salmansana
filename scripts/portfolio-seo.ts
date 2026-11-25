import type { Plugin } from "vite";
import {
  adminPage,
  getHeadMetadata,
  getPageMetadata,
  mainPages,
  missingPage,
  publicPages,
  siteOrigin,
} from "../src/lib/page-metadata";

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function renderHead(pathname: string) {
  const { title, canonical, meta } = getHeadMetadata(pathname);
  const tags = [`<title>${escapeHtml(title)}</title>`];
  if (canonical) tags.push(`<link data-react-helmet="true" rel="canonical" href="${canonical}" />`);

  for (const { name, property, content } of meta) {
    const key = name ? `name="${name}"` : `property="${property}"`;
    tags.push(`<meta data-react-helmet="true" ${key} content="${escapeHtml(content)}" />`);
  }
  return tags.join("\n");
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...publicPages.map(({ path }) => `  <url><loc>${siteOrigin}${path}</loc></url>`),
  "</urlset>",
  "",
].join("\n");

function renderPage(template: string, pathname: string) {
  const { title, description, canonical } = getPageMetadata(pathname);
  const links = mainPages.filter(({ path }) => path !== pathname)
    .map(({ path, label }) => `<li><a href="${path}">${escapeHtml(label)}</a></li>`)
    .join("");
  const fallback = canonical
    ? `<noscript><main><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p><nav aria-label="Portfolio pages"><ul>${links}</ul></nav></main></noscript>`
    : "";

  return template.replace("<!-- page-metadata -->", () => renderHead(pathname))
    .replace("<!-- portfolio-navigation -->", () => fallback);
}

export function portfolioSeo(): Plugin {
  return {
    name: "portfolio-seo",
    configureServer(server) {
      server.middlewares.use("/sitemap.xml", (_request, response) => {
        response.setHeader("Content-Type", "application/xml");
        response.end(sitemap);
      });
    },
    transformIndexHtml(html, context) {
      return context.server
        ? renderPage(html, new URL(context.originalUrl || "/", siteOrigin).pathname)
        : html;
    },
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const index = bundle["index.html"];
        if (index?.type !== "asset" || typeof index.source !== "string") {
          this.error("Could not find the portfolio HTML template.");
        }

        const template = index.source;
        for (const { path } of [...publicPages.slice(1), adminPage, missingPage]) {
          this.emitFile({ type: "asset", fileName: `${path.slice(1)}.html`, source: renderPage(template, path) });
        }
        this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
        index.source = renderPage(template, "/");
      },
    },
  };
}
