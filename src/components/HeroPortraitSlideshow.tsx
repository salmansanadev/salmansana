import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import salmanCutout from "@/assets/salman-cutout.webp";
import aboutMain from "@/assets/about-main.jpg";
import aboutSmallOne from "@/assets/about-sm1.jpg";
import aboutSmallTwo from "@/assets/about-sm2.jpg";
import heroPhoto from "@/assets/hero-photo.png";
import salmanPortrait from "@/assets/salman-portrait.jpg";
import "@/styles/hero-portraits.css";

/**
 * Real full-color images already present in the repository.
 * The old /portraits/salman-01.webp ... salman-05.webp files are
 * genuinely grayscale and must not appear in the public slideshow.
 */
const slides = [
  { src: salmanCutout, alt: "Salman Sana, full-color portrait" },
  { src: aboutMain, alt: "Salman Sana, portrait photograph" },
  { src: aboutSmallOne, alt: "Salman Sana, personal photograph" },
  { src: aboutSmallTwo, alt: "Salman Sana, personal photograph" },
  { src: heroPhoto, alt: "Salman Sana, portrait photograph" },
  { src: salmanPortrait, alt: "Salman Sana, close-up photograph" },
];

export default function HeroPortraitSlideshow() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([0]);
  const [paused, setPaused] = useState(false);
  const [motionOptIn, setMotionOptIn] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const autoplay = !paused && (!reduced || motionOptIn);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => setReduced(media.matches);
    preference();
    media.addEventListener("change", preference);

    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);

    const observer = new IntersectionObserver(
      entries => setInView(entries.some(entry => entry.isIntersecting)),
      { threshold: 0.15 }
    );
    if (root.current) observer.observe(root.current);

    return () => {
      media.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!autoplay || !inView || !pageVisible || loaded.length < 2) return;
    const timer = window.setInterval(() => setActive(current => {
      const next = loaded.find(index => index > current);
      return next ?? loaded[0];
    }), 4200);
    return () => window.clearInterval(timer);
  }, [autoplay, inView, pageVisible, loaded]);

  return (
    <div className="ref-portrait hero-portrait-slideshow" ref={root}
      role="region" aria-roledescription="carousel" aria-label="Salman Sana color portrait slideshow">
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={active === index ? slide.alt : ""}
          aria-hidden={active !== index}
          className={`hero-portrait-slide ${active === index ? "is-active" : ""}`}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(previous =>
            previous.includes(index) ? previous : [...previous, index].sort((a,b) => a-b)
          )}
          onError={() => setLoaded(previous => previous.filter(value => value !== index))}
        />
      ))}
      <div className="hero-portrait-controls" aria-label="Portrait controls">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className="hero-portrait-dot"
            aria-label={`Show color portrait ${index + 1}`}
            aria-pressed={active === index}
            disabled={!loaded.includes(index)}
            onClick={() => setActive(index)}
          ><span/></button>
        ))}
        <button
          className="hero-portrait-pause"
          type="button"
          aria-label={autoplay ? "Pause portrait slideshow" : "Play portrait slideshow"}
          onClick={() => {
            if (autoplay) setPaused(true);
            else { setPaused(false); setMotionOptIn(true); }
          }}
        >{autoplay ? <Pause size={12}/> : <Play size={12}/>}</button>
      </div>
    </div>
  );
}
