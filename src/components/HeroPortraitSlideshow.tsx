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

/** Only used to apply a warm tint to monochrome source photos, never to hide them. */
function sourceIsMonochrome(image: HTMLImageElement): boolean {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 42;
    canvas.height = 42;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return false;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
    let visible = 0;
    let colorful = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 100) continue;
      visible++;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (Math.max(r, g, b) - Math.min(r, g, b) > 15) colorful++;
    }
    return visible > 80 && colorful / visible < 0.06;
  } catch {
    // A blocked canvas read should never prevent a portrait from being shown.
    return false;
  }
}

export default function HeroPortraitSlideshow() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([]);
  const [monochrome, setMonochrome] = useState<number[]>([]);
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

  const onLoaded = (image: HTMLImageElement, index: number) => {
    setLoaded(previous => previous.includes(index) ? previous : [...previous, index].sort((a,b) => a-b));
    if (sourceIsMonochrome(image)) {
      setMonochrome(previous => previous.includes(index) ? previous : [...previous, index]);
    }
  };

  return <div className="ref-portrait hero-portrait-slideshow" ref={root}
    role="region" aria-roledescription="carousel" aria-label="Salman Sana portrait slideshow">
    {slides.map((slide, index) =>
      <img key={slide.src} src={slide.src}
        alt={index === active ? slide.alt : ""}
        aria-hidden={index !== active}
        className={`hero-portrait-slide ${index === active ? "is-active" : ""} ${monochrome.includes(index) ? "is-monochrome-source" : ""}`}
        loading="eager" decoding="async"
        onLoad={event => onLoaded(event.currentTarget, index)}
      />
    )}
    <div className="hero-portrait-controls" aria-label="Portrait controls">
      {slides.map((slide,index) =>
        <button key={slide.src} type="button" className="hero-portrait-dot"
          aria-label={`Show portrait ${index+1}`} aria-pressed={active === index}
          disabled={!loaded.includes(index)}
          onClick={() => setActive(index)}><span/></button>
      )}
      <button className="hero-portrait-pause" type="button"
        aria-label={autoplay ? "Pause portrait slideshow" : "Play portrait slideshow"}
        onClick={() => {
          if (autoplay) setPaused(true);
          else { setPaused(false); setMotionOptIn(true); }
        }}>{autoplay ? <Pause size={12}/> : <Play size={12}/>}</button>
    </div>
  </div>;
}
