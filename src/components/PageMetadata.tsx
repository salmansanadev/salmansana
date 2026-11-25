import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { getHeadMetadata } from "@/lib/page-metadata";

export default function PageMetadata() {
  const { pathname } = useLocation();
  const { title, canonical, meta } = getHeadMetadata(pathname);
  return <Helmet title={title} link={canonical ? [{ rel: "canonical", href: canonical }] : []} meta={meta} />;
}
