import salmanCutout from "@/assets/salman-cutout.webp";
import "@/styles/hero-portraits.css";

/** Keep only the original full-color portrait shown in the reference screenshot. */
export default function HeroPortraitSlideshow() {
  return (
    <div className="ref-portrait hero-portrait-slideshow" role="img" aria-label="Salman Sana portrait">
      <img
        src={salmanCutout}
        alt="Salman Sana"
        className="hero-portrait-slide is-active"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}
