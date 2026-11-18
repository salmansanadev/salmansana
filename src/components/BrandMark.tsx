import { useId } from "react";

/**
 * Salman Sana's original interlocking SS monogram.
 * Vector artwork remains sharp at every size and uses the portfolio brand colors.
 */
export default function BrandMark({ className = "" }: { className?: string }) {
  const titleId = useId();
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 64 64" role="img" aria-labelledby={titleId} xmlns="http://www.w3.org/2000/svg">
      <title id={titleId}>Salman Sana monogram</title>
      <rect width="64" height="64" rx="17" fill="#171717" />
      <path d="M13 19h30l-6 7H22l-3 4h19c6 0 10 4 10 9s-5 10-12 10H14l6-7h16c3 0 4-1 4-3s-2-3-5-3H19c-7 0-10-4-10-9 0-3 1-6 4-8Z" fill="#FFFFFF" />
      <path d="M45 14h10l-9 12h-9l8-12ZM47 42h9l-6 9h-9l6-9Z" fill="#F97316" />
      <circle cx="54" cy="31" r="3" fill="#F97316" />
    </svg>
  );
}
