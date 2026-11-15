import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import original from "@/assets/salman-cutout.webp";
import "@/styles/hero-portraits.css";

const slides = [
  { src: original, alt: "Salman Sana" },
  { src: "/portraits/salman-01.webp", alt: "Salman Sana, seated portrait" },
  { src: "/portraits/salman-02.webp", alt: "Salman Sana, seated with crossed legs" },
  { src: "/portraits/salman-03.webp", alt: "Salman Sana, close-up portrait" },
  { src: "/portraits/salman-04.webp", alt: "Salman Sana wearing his BELI lanyard" },
  { src: "/portraits/salman-05.webp", alt: "Salman Sana, standing portrait" },
];

/**
 * Only display actual color photographs. CSS cannot restore real colors to a
 * grayscale source image, so monochrome source files are excluded from the
 * slideshow until a genuine color replacement is available.
 */
function isColorPhotograph(image: HTMLImageElement): boolean {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 36;
    canvas.height = 36;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return true;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let visible = 0;
    let colorPixels = 0;
    for (let index = 0; index < data.length; index += 4) {
      if (data[index + 3] < 90) continue;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      visible++;
      if (Math.max(r, g, b) - Math.min(r, g, b) > 17) colorPixels++;
    }
    return visible === 0 || colorPixels / visible > 0.07;
  } catch {
    // Avoid breaking the image when a browser blocks canvas pixel reads.
    return true;
  }
}

export default function HeroPortraitSlideshow() {
  const [active, setActive] = useState<number | null>(null);
  const [colorSlides, setColorSlides] = useState<number[]>([]);
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
    if (!autoplay || !inView || !pageVisible || colorSlides.length < 2) return;
    const timer = window.setInterval(() => {
      setActive(current => {
        const index = colorSlides.indexOf(current ?? colorSlides[0]);
        return colorSlides[(Math.max(index, 0) + 1) % colorSlides.length];
      });
    }, 4000);
    return () => window.clearInterval(timer);
  }, [autoplay, inView, pageVisible, colorSlides]);

  const onPortraitLoaded = (image: HTMLImageElement, index: number) => {
    if (!isColorPhotograph(image)) return;
    setColorSlides(previous =>
      previous.includes(index) ? previous : [...previous, index].sort((a, b) => a - b)
    );
    setActive(current => current ?? index);
  };

  return <div className="ref-portrait hero-portrait-slideshow" ref={root}
    role="region" aria-roledescription="carousel" aria-label="Salman Sana color portrait slideshow">
    {slides.map((slide, index) =>
      <img key={slide.src} src={slide.src}
        alt={active === index ? slide.alt : ""}
        aria-hidden={active !== index}
        className={`hero-portrait-slide ${active === index && colorSlides.includes(index) ? "is-active" : ""}`}
        loading="eager" decoding="async"
        onLoad={event => onPortraitLoaded(event.currentTarget, index)}
      />
    )}
    {colorSlides.length > 1 && <div className="hero-portrait-controls" aria-label="Portrait controls">
      {colorSlides.map(index =>
        <button key={slides[index].src} type="button" className="hero-portrait-dot"
          aria-label={`Show color portrait ${index + 1}`} aria-pressed={active === index}
          onClick={() => setActive(index)}><span/></button>
      )}
      <button className="hero-portrait-pause" type="button"
        aria-label={autoplay ? "Pause portrait slideshow" : "Play portrait slideshow"}
        onClick={() => {
          if (autoplay) setPaused(true);
          else { setPaused(false); setMotionOptIn(true); }
        }}>{autoplay ? <Pause size={12}/> : <Play size={12}/>}</button>
    </div>}
  </div>;
}
