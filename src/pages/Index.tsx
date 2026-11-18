import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Github, GraduationCap, Lightbulb, Linkedin, Mail, MapPin, Menu, MoveUpRight, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";
import HeroPortraitSlideshow from "@/components/HeroPortraitSlideshow";
import BrandMark from "@/components/BrandMark";
import Certificates from "@/components/Certificates";
import { projects } from "@/lib/portfolio-data";
import ProjectShowcase from "@/components/ProjectShowcase";
import DeveloperExpertise from "@/components/DeveloperExpertise";
import "./phase3-profile.css";
import { useSiteContent } from "@/lib/site-content";
import "./reference-portfolio.css";
import "./studio-portfolio.css";
import "@/styles/brand-white-orange-black.css";

const expertise = [
  { num: "01", icon: Code2, title: "Digital experiences", text: "Websites and products that look considered, work smoothly, and help people get things done.", detail: "Web development · UI/UX" },
  { num: "02", icon: Lightbulb, title: "Ideas to products", text: "Taking early ideas through research, thoughtful experimentation, and real-world launches.", detail: "Entrepreneurship · Strategy" },
  { num: "03", icon: Sparkles, title: "AI & digital skills", text: "Making new technology approachable through practical tools, education, and experimentation.", detail: "AI literacy · Learning" },
  { num: "04", icon: BriefcaseBusiness, title: "Business thinking", text: "Connecting marketing, financial thinking, and customer problems to build useful solutions.", detail: "Business · Marketing" },
];

const journey = [
  { role: "Founder & CEO", name: "Learnoa", period: "Present", note: "Digital learning & entrepreneurship" },
  { role: "Co-Founder", name: "JASA Solutions", period: "Present", note: "Web, app development & digital solutions" },
  { role: "Assistant Director", name: "BELI — Centre for AI & Digital Skills", period: "2026–27", note: "Digital literacy & youth programs" },
  { role: "Web Developer & Website Manager", name: "Inspiration Lab", period: "Present", note: "Website development & management" },
  { role: "BBA Student", name: "University of Turbat", period: "4th semester", note: "Finance, marketing & entrepreneurship" },
];

export default function Index() {
  const { contact, gallery } = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  useEffect(() => {
    const ids = ["work", "about", "expertise", "experience"];
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: "-15% 0px -55% 0px", threshold: [0, 0.2, 0.5] });
    ids.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return <div className="ss-home" id="top">
    <a className="ss-skip" href="#work">Skip to selected work</a>
    <div className="ss-ambient" aria-hidden="true"><i/><i/></div>
    <div className="ss-shell">
      <header className="ss-header">
        <a className="ss-logo" href="#top" aria-label="Salman Sana home"><BrandMark className="ss-brand-mark" /><span>salman<span className="ss-logo-muted">sana</span></span></a>
        <nav className={`ss-nav ${menuOpen ? "ss-nav--open" : ""}`} aria-label="Main navigation" id="ss-navigation">
          <a href="#work" aria-current={activeSection === "work" ? "location" : undefined} onClick={closeMenu}>Work</a><a href="#about" aria-current={activeSection === "about" ? "location" : undefined} onClick={closeMenu}>About</a><a href="#expertise" aria-current={activeSection === "expertise" ? "location" : undefined} onClick={closeMenu}>Expertise</a><a href="#experience" aria-current={activeSection === "experience" ? "location" : undefined} onClick={closeMenu}>Experience</a><Link to="/blog" onClick={closeMenu}>Journal</Link>
        </nav>
        <a className="ss-header-cta" href={`mailto:${contact.email}`}>Let's talk <ArrowUpRight size={16}/></a>
        <button className="ss-mobile-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-controls="ss-navigation" aria-expanded={menuOpen} onClick={()=>setMenuOpen(value=>!value)}>{menuOpen?<X size={21}/>:<Menu size={21}/>}</button>
      </header>

      <main>

        <section className="ss-hero ss-hero-editorial" aria-labelledby="ss-hero-title">
          <div className="ss-editorial-kicker"><span><i/> AVAILABLE FOR FREELANCE & COLLABORATION</span><span>BASED IN BALOCHISTAN · PAKISTAN</span></div>
          <h1 className="ss-editorial-name" id="ss-hero-title"><span>SALMAN</span> SANA</h1>
          <div className="ss-editorial-orbit" aria-hidden="true"/>
          <div className="ss-dev-grid" aria-hidden="true"/>
          <div className="ss-dev-code" aria-hidden="true"><div className="ss-dev-code-head"><span/><span/><span/><small>salman.dev</small></div><div className="ss-dev-code-body"><span className="ss-dev-code-comment">// building what matters</span><span><b>const</b> developer = {"{"}</span><span>  craft: <em>"web & apps"</em>,</span><span>  mindset: <em>"build & ship"</em></span><span>{"}"};</span><span className="ss-dev-cursor">_</span></div></div>
          <div className="ss-editorial-portrait"><HeroPortraitSlideshow/></div>
          <div className="ss-editorial-note ss-editorial-note-top"><div className="ss-editorial-note-icon"><Code2 size={18}/></div><div><strong>Design-minded.</strong><small>Code-driven.</small></div></div>
          <div className="ss-editorial-note ss-editorial-note-bottom"><span className="ss-editorial-count">{String(projects.length).padStart(2,"0")}<em>+</em></span><div><strong>Featured projects</strong><small>Concept to creation</small></div></div>
          <div className="ss-editorial-copy">
            <p className="ss-eyebrow">DEVELOPER / FOUNDER / ENTREPRENEUR</p>
            <h2>I build for the <em>web.</em><br/>And beyond.</h2>
            <p>I'm Salman — a developer and founder turning complex ideas into fast, thoughtful digital products. From Balochistan, building for the world.</p>
            <div className="ss-actions"><a className="ss-button ss-button-primary" href="#work">Explore my work <ArrowUpRight size={18}/></a><a className="ss-editorial-contact" href={`mailto:${contact.email}`}>Let's collaborate <ArrowUpRight size={16}/></a></div>
          </div>
          <div className="ss-editorial-links"><a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16}/> LinkedIn</a><a href="https://github.com/salmansanadev" target="_blank" rel="noopener noreferrer"><Github size={16}/> GitHub</a><a href={`mailto:${contact.email}`}><Mail size={16}/> Email</a></div>
          <a className="ss-editorial-scroll" href="#work">SCROLL TO EXPLORE <ArrowDownRight size={18}/></a>
        </section>

        <div className="ss-trust-strip" aria-label="Areas of work"><span><i/> Product development</span><span><i/> Business & strategy</span><span><i/> AI & innovation</span><span><i/> Community impact</span></div>

        <section id="work" className="ss-section ss-work" aria-labelledby="ss-work-title">
          <div className="ss-section-head"><div><p className="ss-overline">01 / A SELECTION OF MY WORK</p><h2 id="ss-work-title">Selected <em>projects.</em></h2></div><p>Ideas brought to life through development, design, and a little persistence.</p></div>
          <ProjectShowcase variant="home" />
        </section>

        <section id="about" className="ss-about ss-section" aria-labelledby="ss-about-title">
          <div className="ss-about-intro"><p className="ss-overline">02 / A LITTLE ABOUT ME</p><h2 id="ss-about-title">Curiosity is<br/>my <em>superpower.</em></h2><p>I study business, build digital products, and connect technology with real human needs. For me, a good idea only becomes exciting when it makes someone's day a little better.</p><Link className="ss-text-link" to="/about">More about my story <ArrowUpRight size={18}/></Link></div>
          <div className="ss-about-bento">
            <div className="ss-bento ss-bento-blue"><GraduationCap size={25}/><span>Currently learning</span><strong>Business meets technology.</strong><small>University of Turbat · BBA</small></div>
            <div className="ss-bento ss-bento-white"><span className="ss-bento-symbol">↗</span><strong>Build.<br/>Learn.<br/><em>Repeat.</em></strong><small>A simple approach to meaningful work.</small></div>
            <div className="ss-bento ss-bento-wide"><div><span className="ss-bento-kicker">MY APPROACH</span><strong>Think clearly.<br/>Make it useful.</strong></div><span className="ss-bento-orbit" aria-hidden="true">✳</span><div className="ss-about-grid-art" aria-hidden="true"><span /><span /><span /></div></div>
          </div>
        </section>

        <section id="expertise" className="ss-section ss-expertise" aria-labelledby="ss-expertise-title">
          <div className="ss-section-head"><div><p className="ss-overline">03 / WHAT I BRING TO THE TABLE</p><h2 id="ss-expertise-title">Where ideas meet <em>execution.</em></h2></div><p>A combination of technology, business, and a healthy curiosity about what comes next.</p></div>
          <div className="ss-expertise-grid">{expertise.map(({num,icon:Icon,title,text,detail})=><article className="ss-expertise-card" key={num}><div className="ss-expertise-top"><span>{num} / 04</span><Icon size={23} strokeWidth={1.7}/></div><div><h3>{title}</h3><p>{text}</p></div><span className="ss-expertise-detail">{detail} <ArrowUpRight size={16}/></span></article>)}</div>
        </section>

        <div className="ss-section ss-tech-section"><DeveloperExpertise /></div>

        <section id="experience" className="ss-section ss-experience" aria-labelledby="ss-experience-title">
          <div className="ss-section-head"><div><p className="ss-overline">04 / THE JOURNEY SO FAR</p><h2 id="ss-experience-title">Experience & <em>growth.</em></h2></div><p>Still learning, always making progress.</p></div>
          <div className="ss-journey ss-journey--phase3">{journey.map((item,index)=><div className="ss-journey-row" key={item.name}><span className="ss-journey-index">0{index+1}</span><div><span className="ss-journey-role">{item.role}</span><h3>{item.name}</h3><p>{item.role} <span>·</span> {item.note}</p></div><span className="ss-journey-period">{item.period}</span><ArrowUpRight className="ss-journey-arrow" size={19}/></div>)}</div>
        </section>

        <section className="ss-presentation ss-section" id="presentation" aria-labelledby="ss-presentation-title">
          <div className="ss-section-head">
            <div>
              <p className="ss-overline">05 / PRESENTING IDEAS IN PRACTICE</p>
              <h2 id="ss-presentation-title">Business idea <em>presentation.</em></h2>
            </div>
            <p>A classroom pitch: sharing a business concept, presenting to an audience, and building confidence through practice.</p>
          </div>
          <div className="ss-presentation-feature">
            <div className="ss-presentation-details">
              <span className="ss-presentation-chip"><span aria-hidden="true" className="ss-presentation-chip-dot" /> CLASSROOM PRESENTATION</span>
              <h3>From idea to <em>the classroom.</em></h3>
              <p>A short moment from my business idea presentation. An opportunity to communicate an idea, explain its value and practise entrepreneurial thinking in front of an audience.</p>
              <div className="ss-presentation-facts">
                <span><strong>Format</strong> Business idea pitch</span>
                <span><strong>Setting</strong> Classroom presentation</span>
                <span><strong>Watch time</strong> 21 seconds</span>
              </div>
              <a href="https://d2ol7oe51mr4n9.cloudfront.net/user_3M5D7iuR4Q2ZFypzjwJPP6gX0OZ/04fa7d7f-12da-4635-8728-da71df60634e.mp4" target="_blank" rel="noopener noreferrer" className="ss-presentation-link" aria-label="Open the classroom business idea presentation video in a new tab">
                Open full video <ArrowUpRight size={18}/>
              </a>
            </div>
            <div className="ss-presentation-media">
              <div className="ss-presentation-frame">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster="https://d2ol7oe51mr4n9.cloudfront.net/user_3M5D7iuR4Q2ZFypzjwJPP6gX0OZ/3634c971-48e5-4154-ae32-4cb09f1b3334.jpg"
                  aria-label="Classroom business idea presentation video"
                  width="576"
                  height="1024"
                >
                  <source src="https://d2ol7oe51mr4n9.cloudfront.net/user_3M5D7iuR4Q2ZFypzjwJPP6gX0OZ/04fa7d7f-12da-4635-8728-da71df60634e.mp4" type="video/mp4" />
                  Your browser does not support embedded video playback.
                </video>
              </div>
              <p className="ss-presentation-caption"><span className="ss-presentation-caption-mark" aria-hidden="true" /> CLASSROOM MOMENT <span>·</span> BUSINESS IDEA PITCH</p>
            </div>
          </div>
        </section>

        <section className="ss-credentials" aria-label="Certificates and achievements"><Certificates/></section>
        {gallery.length > 0 && <section className="ss-section ss-gallery"><div className="ss-section-head"><div><p className="ss-overline">05 / BEHIND THE SCENES</p><h2>Moments & <em>stories.</em></h2></div></div><div className="ss-gallery-grid">{gallery.map((g,index)=><figure key={index}><img src={g.url} alt={g.alt || g.caption} loading="lazy"/><figcaption>{g.caption}</figcaption></figure>)}</div></section>}
        <section id="contact" className="ss-contact" aria-labelledby="ss-contact-title"><div className="ss-contact-glow" aria-hidden="true"/><div className="ss-contact-top"><span className="ss-overline">HAVE SOMETHING IN MIND?</span><span><span className="ss-status-dot"/> Open to collaborations</span></div><h2 id="ss-contact-title">Let's make something <em>remarkable.</em></h2><p>Whether you have an idea, a collaboration, or simply want to connect — I'd love to hear about it.</p><a className="ss-contact-button" href={`mailto:${contact.email}`}>Start a conversation <ArrowUpRight size={20}/></a><div className="ss-contact-bottom"><span>Good ideas start with a hello.</span><a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18}/> LinkedIn</a><a href="https://github.com/salmansanadev" target="_blank" rel="noopener noreferrer"><Github size={18}/> GitHub</a><a href={`mailto:${contact.email}`}><Mail size={18}/> Email</a></div></section>
      </main>

      <footer className="ss-footer"><a href="#top" className="ss-logo"><BrandMark className="ss-brand-mark" /><span>salman<span className="ss-logo-muted">sana</span></span></a><p>© {new Date().getFullYear()} Salman Sana. Made with intention.</p><div><Link to="/blog">Journal</Link><Link to="/credentials">Credentials</Link><a href="#top">Back to top ↑</a></div></footer>
    </div>
  </div>;
}
