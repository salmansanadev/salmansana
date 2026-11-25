import { useEffect } from "react";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import BrandMark from "@/components/BrandMark";

/** Public route fallback. Keep it independent of authenticated pages. */
export default function NotFound() {
  const location = useLocation();
  useEffect(() => {
    console.info("Requested route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-white px-5 py-14 text-[#171717]">
      <div className="mx-auto flex min-h-[80dvh] w-full max-w-2xl flex-col items-center justify-center text-center">
        <Link to="/" className="mb-12 inline-flex items-center gap-3 rounded-xl p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316]" aria-label="Salman Sana home">
          <BrandMark className="h-12 w-12" />
          <span className="font-display text-lg font-extrabold">SALMAN SANA</span>
        </Link>
        <div className="mb-7 grid h-16 w-16 place-items-center rounded-2xl border border-[#FFD8BB] bg-[#FFF3EA] text-[#A94308]">
          <SearchX size={29} aria-hidden="true" />
        </div>
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[.22em] text-[#A94308]">404 / Route not found</p>
        <h1 className="font-display text-[clamp(2.5rem,7vw,4.4rem)] font-extrabold leading-tight tracking-[-.06em]">This page doesn't exist.</h1>
        <p className="mt-5 max-w-md text-base leading-8 text-[#525252]">The address may have changed or the page may have been removed. You can return to the homepage or explore the portfolio.</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#171717] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#C4510C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316]"><Home size={17} /> Home</Link>
          <Link to="/portfolio" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#E5E5E5] px-5 py-3 text-sm font-bold transition-colors hover:border-[#F97316] hover:bg-[#FFF3EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316]">Explore projects <ArrowLeft className="rotate-180" size={17} /></Link>
        </div>
      </div>
    </main>
  );
}
