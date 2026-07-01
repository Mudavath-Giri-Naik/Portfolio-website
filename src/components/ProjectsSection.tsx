import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  IconBrandGithub,
  IconArrowUpRight,
  IconWorld,
  IconBrandAndroid,
} from "@tabler/icons-react";

/* ─── project data (names & links are accurate) ─── */
type Project = {
  name: string;
  tagline: string;
  category: string;
  year: string;
  platform: "web" | "android";
  description: string;
  github: string;
  live: string;
  accent: string;
  gradient: string;
  ink: string;
  tags: string[];
};

const projects: Project[] = [
  {
    name: "Intentify",
    tagline: "AI Assessment Generator",
    category: "Generative AI",
    year: "2025",
    platform: "web",
    description:
      "Turns simple prompts into ready-to-use coding assessments for recruiters — powered by LLMs and structured evaluation.",
    github: "https://github.com/Mudavath-Giri-Naik/Intentify-v2",
    live: "https://intentify-v2.vercel.app/",
    accent: "#4f7cf6",
    gradient: "linear-gradient(150deg, #e6edff 0%, #d0deff 52%, #bcd0ff 100%)",
    ink: "#2a46b6",
    tags: ["Generative AI", "For Recruiters"],
  },
  {
    name: "Doxy",
    tagline: "AI Resume Editor",
    category: "Generative AI",
    year: "2025",
    platform: "web",
    description:
      "An AI document editor — prepare your resume in seconds by pasting a JD and download instantly.",
    github: "https://github.com/Mudavath-Giri-Naik/Doxy.git",
    live: "https://doxy-two.vercel.app/",
    accent: "#db2777",
    gradient: "linear-gradient(150deg, #ffe3f1 0%, #ffcbe3 52%, #ffb6d7 100%)",
    ink: "#b31567",
    tags: ["Generative AI", "For Applicants"],
  },
  {
    name: "Techmates",
    tagline: "Campus Network App",
    category: "Full Stack",
    year: "2024",
    platform: "android",
    description:
      "An all-in-one campus network app to discover internships, hackathons, events, and connect with students.",
    github: "https://github.com/Mudavath-Giri-Naik/Techmates.git",
    live: "https://play.google.com/store/apps/details?id=com.techmates.app",
    accent: "#1f9d55",
    gradient: "linear-gradient(150deg, #d8f7e6 0%, #c0f0d4 52%, #a8e9c3 100%)",
    ink: "#0c7a43",
    tags: ["Full Stack", "For Students"],
  },
  {
    name: "Ambox",
    tagline: "Creator Collaboration",
    category: "Full Stack",
    year: "2025",
    platform: "web",
    description:
      "A collaboration platform for creators and editors to manage projects, review versions, and ship content faster.",
    github: "https://github.com/Mudavath-Giri-Naik/ambox.git",
    live: "https://ambox-t6yf.vercel.app/",
    accent: "#d97706",
    gradient: "linear-gradient(150deg, #ffedcc 0%, #ffe0a6 52%, #ffd487 100%)",
    ink: "#b0640a",
    tags: ["Full Stack", "For Creators"],
  },
];

/* ─── Project Card ─── */
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="pcard"
      style={{ "--accent": project.accent, "--grad": project.gradient, "--ink": project.ink } as React.CSSProperties}
    >
      {/* Typographic hero */}
      <div className="pcard__hero-wrap">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="pcard__hero"
          aria-label={`Open ${project.name}`}
        >
          <span className="pcard__hero-texture" aria-hidden="true" />
          <span className="pcard__hero-glow" aria-hidden="true" />
          <span className="pcard__hero-mono" aria-hidden="true">{project.name.charAt(0)}</span>

          <span className="pcard__hero-cat">{project.category}</span>

          <span className="pcard__hero-center">
            <span className="pcard__hero-name">{project.name}</span>
          </span>
        </a>

        {/* github floating button */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="pcard__git"
          aria-label={`${project.name} source on GitHub`}
        >
          <IconBrandGithub size={15} />
        </a>
      </div>

      {/* Body */}
      <div className="pcard__body">
        <div className="pcard__title-row">
          <h3 className="pcard__title">{project.tagline}</h3>
          <span className="pcard__pill">
            {project.platform === "android" ? <IconBrandAndroid size={12} /> : <IconWorld size={12} />}
            {project.year}
          </span>
        </div>

        <p className="pcard__desc">{project.description}</p>

        <div className="pcard__tags">
          {project.tags.map((t) => (
            <span key={t} className="pcard__tag">{t}</span>
          ))}
        </div>

        <a href={project.live} target="_blank" rel="noopener noreferrer" className="pcard__cta">
          {project.platform === "android" ? "Get the App" : "View Project"}
          <IconArrowUpRight size={16} />
        </a>
      </div>
    </motion.div>
  );
};

/* ─── Main Section ─── */
const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="projects" ref={sectionRef} className="psection">
      <div className="psection__inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="psection__header"
        >
          <div className="psection__eyebrow">
            <span className="psection__eyebrow-dot" />
            Featured Work
          </div>
          <h2 className="psection__title">Selected Projects</h2>
          <p className="psection__subtitle">
            A curated collection of things I've built — from full-stack apps to AI-powered tools.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="psection__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>

      {/* ── Scoped Styles ── */}
      <style>{`
        .psection {
          padding: 40px 24px 64px;
          background: transparent;
          font-family: 'Inter', -apple-system, sans-serif;
          position: relative;
          width: 100%;
          max-width: 1120px;
          margin: 96px auto 0;
        }
        .psection__inner {
          max-width: 940px;
          margin: 0 auto;
        }

        /* ─── Header ─── */
        .psection__header {
          text-align: center;
          margin-bottom: 42px;
        }
        .psection__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #6366f1;
          margin-bottom: 14px;
        }
        .psection__eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #6366f1;
          box-shadow: 0 0 0 4px rgba(99,102,241,0.16);
        }
        .psection__title {
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin: 0;
          color: #18181b;
          line-height: 1.02;
        }
        .psection__subtitle {
          font-size: 15px;
          color: #71717a;
          margin: 14px auto 0;
          line-height: 1.55;
          max-width: 440px;
          font-weight: 400;
        }

        /* ─── Grid ─── */
        .psection__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 26px;
          align-items: stretch;
        }

        /* ─── Card ─── */
        .pcard {
          background: #ffffff;
          border: 1px solid #ececee;
          border-radius: 24px;
          padding: 12px 12px 14px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s ease;
        }
        .pcard:hover {
          border-color: #d9d9dd;
        }

        /* ─── Typographic hero ─── */
        .pcard__hero-wrap {
          position: relative;
        }
        .pcard__hero {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          background: var(--grad);
          aspect-ratio: 5 / 4;
          isolation: isolate;
        }
        /* fine dotted texture */
        .pcard__hero-texture {
          position: absolute;
          inset: 0;
          z-index: 1;
          background-image: radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1.4px);
          background-size: 14px 14px;
          opacity: 0.7;
          mask-image: linear-gradient(180deg, rgba(0,0,0,0.9), transparent 78%);
          -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0.9), transparent 78%);
        }
        /* soft top sheen */
        .pcard__hero-glow {
          position: absolute;
          top: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 130%;
          height: 90%;
          z-index: 1;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.65), transparent 62%);
          opacity: 0.9;
          pointer-events: none;
        }
        /* giant watermark initial */
        .pcard__hero-mono {
          position: absolute;
          right: -6%;
          bottom: -26%;
          z-index: 1;
          font-size: 190px;
          font-weight: 900;
          line-height: 1;
          color: var(--ink);
          opacity: 0.1;
          letter-spacing: -0.05em;
          pointer-events: none;
          user-select: none;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pcard:hover .pcard__hero-mono {
          transform: translate(-4px, -6px) scale(1.04);
        }
        .pcard__hero-cat {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 3;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink);
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .pcard__hero-center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 18px;
        }
        .pcard__hero-name {
          font-size: clamp(30px, 6vw, 42px);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1;
          text-align: center;
          color: var(--ink);
          text-shadow: 0 1px 0 rgba(255,255,255,0.45);
        }

        /* github floating button */
        .pcard__git {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 4;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 9px;
          color: #fff;
          background: rgba(0,0,0,0.28);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.25);
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .pcard__git:hover {
          background: rgba(0,0,0,0.5);
          transform: translateY(-1px);
        }

        /* ─── Body ─── */
        .pcard__body {
          display: flex;
          flex-direction: column;
          padding: 14px 6px 4px;
          flex: 1;
        }
        .pcard__title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .pcard__title {
          margin: 0;
          font-size: 17px;
          font-weight: 750;
          letter-spacing: -0.02em;
          color: #18181b;
          line-height: 1.15;
        }
        .pcard__pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          color: #ffffff;
          background: var(--accent);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .pcard__desc {
          margin: 10px 0 0;
          font-size: 13px;
          line-height: 1.6;
          color: #71717a;
          font-weight: 400;
        }
        .pcard__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 13px;
          margin-bottom: 16px;
        }
        .pcard__tag {
          font-size: 11px;
          font-weight: 600;
          padding: 5px 11px;
          border-radius: 8px;
          background: #f4f4f5;
          color: #52525b;
          border: 1px solid #ececee;
        }
        .pcard__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: auto;
          padding: 13px 16px;
          border-radius: 14px;
          background: #18181b;
          color: #ffffff;
          font-size: 14px;
          font-weight: 650;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.2s ease;
        }
        .pcard__cta:hover {
          background: #000000;
          transform: translateY(-1px);
        }
        .pcard__cta svg {
          transition: transform 0.25s ease;
        }
        .pcard__cta:hover svg {
          transform: translate(2px, -2px);
        }

        /* ─── Desktop: 3 per row ─── */
        @media (min-width: 1024px) {
          .psection__inner { max-width: 1060px; }
          .psection__grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 22px;
          }
          .pcard__hero-name { font-size: clamp(28px, 3vw, 36px); }
          .pcard__hero-mono { font-size: 160px; }
          .pcard__title { font-size: 16px; }
          .pcard__desc { font-size: 12.5px; }
          .pcard__cta { font-size: 13.5px; padding: 12px 16px; }
        }

        /* ─── Tablet ─── */
        @media (min-width: 640px) and (max-width: 1023px) {
          .psection {
            margin-top: 72px;
            padding: 34px 22px 56px;
          }
          .psection__title { font-size: 34px; }
          .psection__grid { gap: 22px; }
        }

        /* ─── Mobile ─── */
        @media (max-width: 639px) {
          .psection {
            margin-top: 56px;
            padding: 28px 18px 44px;
          }
          .psection__header { margin-bottom: 28px; }
          .psection__title { font-size: 30px; }
          .psection__subtitle { font-size: 14px; }
          .psection__grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .pcard__hero { aspect-ratio: 16 / 10; }
          .pcard__hero-name { font-size: clamp(34px, 12vw, 46px); }
          .pcard__hero-mono { font-size: 210px; }
          .pcard__title { font-size: 18px; }
          .pcard__desc { font-size: 13.5px; }
          .pcard__cta { padding: 14px 16px; font-size: 14.5px; }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
