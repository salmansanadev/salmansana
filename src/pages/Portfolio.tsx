import { Helmet } from "react-helmet";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import ProjectShowcase from "@/components/ProjectShowcase";
import { projects } from "@/lib/portfolio-data";
import "./portfolio-phase2.css";

export default function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Selected Work — Web Development & Ventures | Salman Sana</title>
        <meta name="description" content="Explore Salman Sana's web development work, digital products, and founder-led ventures including JASA Solutions, Roshin, Inspiration Lab, Karbaar, and Learnoa." />
        <link rel="canonical" href="https://www.salmansana.me/portfolio" />
      </Helmet>
      <Navbar />
      <main className="ps-portfolio-page">
        <section className="ps-page-hero" aria-labelledby="ps-page-title">
          <div className="site-container ps-page-hero-inner">
            <p className="ps-page-eyebrow"><span /> PORTFOLIO / 2026</p>
            <div className="ps-page-hero-grid">
              <div>
                <h1 id="ps-page-title">Selected <em>work.</em></h1>
                <p>Digital products, websites, and ventures that bring technology and business together. A closer look at what I design, develop, and help build.</p>
              </div>
              <div className="ps-page-hero-aside">
                <span className="ps-page-total">{String(projects.length).padStart(2, "0")} <small>PROJECTS</small></span>
                <span>Founder-led ventures<br/>and client development</span>
                <a href="#projects">Explore projects <ArrowDownRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="ps-page-deco" aria-hidden="true"><ArrowUpRight /></div>
          </div>
        </section>
        <section className="ps-page-section" id="projects" aria-label="Project case studies">
          <div className="site-container">
            <div className="ps-page-section-intro">
              <span>01 / CASE STUDIES</span>
              <p>Every project has a purpose. Explore the work, my role, and the outcome.</p>
            </div>
            <ProjectShowcase variant="full" />
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
