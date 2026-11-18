import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Wait for lazy route content before navigating to a hash target. */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    let targetId: string;
    try {
      targetId = decodeURIComponent(hash.slice(1));
    } catch {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    let observer: MutationObserver | undefined;
    let timeout: number | undefined;
    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) return false;
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      observer?.disconnect();
      if (timeout !== undefined) window.clearTimeout(timeout);
      return true;
    };

    // React.lazy pages may not have mounted within the old fixed 50ms delay.
    if (!scrollToTarget()) {
      observer = new MutationObserver(() => { scrollToTarget(); });
      observer.observe(document.getElementById("root") ?? document.body, { childList: true, subtree: true });
      timeout = window.setTimeout(() => {
        observer?.disconnect();
        if (!document.getElementById(targetId)) window.scrollTo({ top: 0, behavior: "auto" });
      }, 2500);
    }
    return () => {
      observer?.disconnect();
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;
