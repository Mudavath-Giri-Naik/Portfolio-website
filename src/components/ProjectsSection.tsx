import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  IconBrandGithub,
  IconArrowUpRight,
  IconWorld,
  IconBrandAndroid,
} from "@tabler/icons-react";

/* ── encode SVG paths with spaces/commas for CSS mask ── */
const enc = (p: string) =>
  p.split("/").map((seg, i) => (i === 0 ? seg : encodeURIComponent(seg))).join("/");

/* ── Doodle span: CSS mask recoloring (black SVG → currentColor) ── */
const D = ({
  src,
  style,
  className,
}: {
  src: string;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <span
    aria-hidden="true"
    className={className}
    style={{
      display: "block",
      backgroundColor: "currentColor",
      WebkitMask: `url('${enc(src)}') no-repeat center/contain`,
      mask: `url('${enc(src)}') no-repeat center/contain`,
      flexShrink: 0,
      ...style,
    }}
  />
);

/* ── SVG library shortcuts ── */
const SVG = {
  sp1:    "/svgs/spark, sparkle, 26.svg",
  sp2:    "/svgs/spark, sparks, sparkle, stars, 30.svg",
  arrow7: "/svgs/Arrow_07.svg",
  chat:   "/svgs/speech bubble, chat, chat bubble, talk, speak, message,  2.svg",
  leaf:   "/svgs/plant, leaves, leaf, branch, plants, nature, green, 52.svg",
  swirl6: "/svgs/swirl, arrow, hand drawn, scribble, doodle, 6.svg",
  cloud:  "/svgs/cloud, fluff, clouds, 32.svg",
  spiral: "/svgs/swirl, spiral, twist, loops, doodles, doodle, 23.svg",
  m1: "/svgs/Misc_01.svg", m2: "/svgs/Misc_02.svg", m3: "/svgs/Misc_03.svg",
  m4: "/svgs/Misc_04.svg", m5: "/svgs/Misc_05.svg", m6: "/svgs/Misc_06.svg",
  u1: "/svgs/Underline_01.svg", u3: "/svgs/Underline_03.svg",
  u5: "/svgs/Underline_05.svg", u7: "/svgs/Underline_07.svg",
  u9: "/svgs/Underline_09.svg", u2: "/svgs/Underline_02.svg",
};

/* ── Project data ── */
type Project = {
  name: string; tagline: string; category: string; year: string;
  platform: "web" | "android";
  description: string; github: string; live: string;
  accent: string; gradient: string; ink: string; tags: string[];
  dA: string; dB: string; misc: string; underline: string;
};

const projects: Project[] = [
  {
    name: "Intentify", tagline: "AI Assessment Generator",
    category: "Generative AI", year: "2025", platform: "web",
    description: "Turns simple prompts into ready-to-use coding assessments for recruiters — powered by LLMs and structured evaluation.",
    github: "https://github.com/Mudavath-Giri-Naik/Intentify-v2",
    live: "https://intentify-v2.vercel.app/",
    accent: "#4f7cf6",
    gradient: "linear-gradient(140deg,#dce8ff 0%,#b9ceff 50%,#94b2fe 100%)",
    ink: "#2a46b6",
    tags: ["Generative AI", "For Recruiters"],
    dA: SVG.arrow7, dB: SVG.sp2, misc: SVG.m1, underline: SVG.u1,
  },
  {
    name: "Doxy", tagline: "AI Resume Editor",
    category: "Generative AI", year: "2025", platform: "web",
    description: "An AI document editor — prepare your resume in seconds by pasting a JD and download instantly.",
    github: "https://github.com/Mudavath-Giri-Naik/Doxy.git",
    live: "https://doxy-two.vercel.app/",
    accent: "#db2777",
    gradient: "linear-gradient(140deg,#ffe3f2 0%,#ffaed4 50%,#ff80bb 100%)",
    ink: "#b31567",
    tags: ["Generative AI", "For Applicants"],
    dA: SVG.chat, dB: SVG.sp1, misc: SVG.m2, underline: SVG.u3,
  },
  {
    name: "Techmates", tagline: "Campus Network App",
    category: "Full Stack", year: "2024", platform: "android",
    description: "An all-in-one campus network app to discover internships, hackathons, events, and connect with students.",
    github: "https://github.com/Mudavath-Giri-Naik/Techmates.git",
    live: "https://play.google.com/store/apps/details?id=com.techmates.app",
    accent: "#1f9d55",
    gradient: "linear-gradient(140deg,#c2f5d8 0%,#7ee8a8 50%,#47d983 100%)",
    ink: "#0c7a43",
    tags: ["Full Stack", "For Students"],
    dA: SVG.leaf, dB: SVG.m3, misc: SVG.m3, underline: SVG.u5,
  },
  {
    name: "Ambox", tagline: "Creator Collaboration",
    category: "Full Stack", year: "2025", platform: "web",
    description: "A collaboration platform for creators and editors to manage projects, review versions, and ship content faster.",
    github: "https://github.com/Mudavath-Giri-Naik/ambox.git",
    live: "https://ambox-t6yf.vercel.app/",
    accent: "#d97706",
    gradient: "linear-gradient(140deg,#fff0cc 0%,#ffd060 50%,#ffbb20 100%)",
    ink: "#b0640a",
    tags: ["Full Stack", "For Creators"],
    dA: SVG.swirl6, dB: SVG.sp2, misc: SVG.m4, underline: SVG.u7,
  },
  {
    name: "Swaseekh", tagline: "GATE Prep Platform",
    category: "Ed-Tech", year: "2025", platform: "web",
    description: "A dedicated platform for GATE aspirants — structured resources, practice, and everything needed to crack the exam.",
    github: "https://github.com/Mudavath-Giri-Naik/Swaseekh.git",
    live: "https://swaseekh.in/",
    accent: "#7c3aed",
    gradient: "linear-gradient(140deg,#ede9fe 0%,#c4b5fd 50%,#a082f9 100%)",
    ink: "#5b21b6",
    tags: ["Ed-Tech", "For Students"],
    dA: SVG.cloud, dB: SVG.sp1, misc: SVG.m5, underline: SVG.u9,
  },
  {
    name: "Engram", tagline: "Network Incident Memory",
    category: "Dev Tool", year: "2025", platform: "web",
    description: "A network-specific incident memory layer — remembers how issues were actually fixed, so hard-won fixes never leave with the engineer.",
    github: "https://github.com/Mudavath-Giri-Naik/Engram.git",
    live: "https://engram-self.vercel.app/",
    accent: "#0891b2",
    gradient: "linear-gradient(140deg,#cffafe 0%,#5ee6f8 50%,#06b6d4 100%)",
    ink: "#0e7490",
    tags: ["Dev Tool", "For Engineers"],
    dA: SVG.spiral, dB: SVG.m1, misc: SVG.m6, underline: SVG.u2,
  },
];

/* ── Card ── */
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 13;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 13;
    el.style.setProperty("--tx", `${x}deg`);
    el.style.setProperty("--ty", `${-y}deg`);
  };

  const handleMouseLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--tx", "0deg");
    el.style.setProperty("--ty", "0deg");
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <div
      ref={tiltRef}
      className="pcard-outer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="pcard"
      style={{ "--accent": project.accent, "--grad": project.gradient, "--ink": project.ink } as React.CSSProperties}
    >
      {/* ── Hero ── */}
      <div className="pcard__hw">
        <a href={project.live} target="_blank" rel="noopener noreferrer"
          ref={heroRef}
          className="pcard__hero" aria-label={`Open ${project.name}`}
          onMouseMove={handleHeroMouseMove}>

          {/* base layers */}
          <span className="pcard__tex" aria-hidden="true" />
          <span className="pcard__glow" aria-hidden="true" />

          {/* hover shine */}
          <span className="pcard__shine" aria-hidden="true" />

          {/* Misc watermark — ink, large, faint, top-right */}
          <D src={project.misc} style={{
            position:"absolute", top:"6%", right:"-4%",
            width:80, height:80, zIndex:1,
            color: project.ink, opacity:0.11,
          }} />

          {/* doodle A — thematic, ACCENT color, bottom-left → floats up on hover */}
          <D src={project.dA} className="pcard__dA" style={{
            position:"absolute", bottom:14, left:14,
            width:54, height:54, zIndex:3,
            color: project.accent, opacity:0.55,
          }} />

          {/* doodle B — secondary, ink color, mid-right → rotates on hover */}
          <D src={project.dB} className="pcard__dB" style={{
            position:"absolute", top:"28%", right:12,
            width:30, height:30, zIndex:3,
            color: project.ink, opacity:0.45,
          }} />

          {/* sparkle A — upper-left, accent color, twinkles */}
          <D src={SVG.sp1} className="pcard__sp" style={{
            position:"absolute", top:44, left:14,
            width:19, height:19, zIndex:3,
            color: project.accent, opacity:0.5,
          }} />
          {/* sparkle B — lower-right, ink color, twinkles offset */}
          <D src={SVG.sp2} className="pcard__sp pcard__sp2" style={{
            position:"absolute", bottom:18, right:16,
            width:14, height:14, zIndex:3,
            color: project.ink, opacity:0.38,
          }} />
          {/* sparkle C — center-top, accent */}
          <D src={SVG.sp1} className="pcard__sp pcard__sp3" style={{
            position:"absolute", top:"18%", left:"44%",
            width:11, height:11, zIndex:3,
            color: project.accent, opacity:0.28,
          }} />

          {/* category chip */}
          <span className="pcard__cat">{project.category}</span>

          {/* center: name + wavy underline */}
          <span className="pcard__center">
            <span className="pcard__name">{project.name}</span>
            <D src={project.underline} style={{
              width:"118%", height:7,
              color: project.ink, opacity:0.35, marginTop:7,
            }} />
          </span>
        </a>

        {/* GitHub button sits outside hero so it's above isolation boundary */}
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          className="pcard__git" aria-label={`${project.name} on GitHub`}>
          <IconBrandGithub size={14} />
        </a>
      </div>

      {/* ── Body ── */}
      <div className="pcard__body">
        <div className="pcard__divider" />
        <div className="pcard__tr">
          <h3 className="pcard__title">{project.tagline}</h3>
          <span className="pcard__pill">
            {project.platform === "android"
              ? <IconBrandAndroid size={11} /> : <IconWorld size={11} />}
            {project.year}
          </span>
        </div>
        <p className="pcard__desc">{project.description}</p>
        <div className="pcard__tags">
          {project.tags.map(t => <span key={t} className="pcard__tag">{t}</span>)}
        </div>
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="pcard__cta">
          {project.platform === "android" ? "Get the App" : "View Project"}
          <IconArrowUpRight size={15} />
        </a>
      </div>
    </motion.div>
    </div>
  );
};

/* ── Section ── */
const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section id="projects" ref={sectionRef} className="psection">
      <div className="psection__inner">
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
          className="psection__hd"
        >
          <div className="psection__ey">
            <span className="psection__dot" />Featured Work
          </div>
          <h2 className="psection__title">Selected Projects</h2>
          <p className="psection__sub">
            A curated collection of things I've built — from full-stack apps to AI-powered tools.
          </p>
        </motion.div>
        <div className="psection__grid">
          {projects.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
        </div>
      </div>

      <style>{`
        /* ─── Section ─── */
        .psection {
          padding: 40px 24px 64px;
          font-family: 'Inter', -apple-system, sans-serif;
          position: relative; width: 100%;
          max-width: 1120px; margin: 96px auto 0;
        }
        .psection__inner { max-width: 940px; margin: 0 auto; }

        /* header */
        .psection__hd { text-align: center; margin-bottom: 42px; }
        .psection__ey {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.14em; color: #6366f1; margin-bottom: 14px;
        }
        .psection__dot {
          width: 6px; height: 6px; border-radius: 999px;
          background: #6366f1; box-shadow: 0 0 0 4px rgba(99,102,241,0.16);
        }
        .psection__title {
          font-size: 40px; font-weight: 800; letter-spacing: -0.04em;
          margin: 0; color: #18181b; line-height: 1.02;
        }
        .psection__sub {
          font-size: 15px; color: #71717a; margin: 14px auto 0;
          line-height: 1.55; max-width: 440px;
        }

        /* pulsing dot */
        .psection__dot { animation: pulse-ring 2.2s ease infinite; }

        /* grid */
        .psection__grid {
          display: grid; grid-template-columns: repeat(2,1fr);
          gap: 26px; align-items: stretch;
        }

        /* ─── Tilt outer (3-D perspective wrapper) ─── */
        .pcard-outer {
          --tx: 0deg; --ty: 0deg;
          transform: perspective(750px) rotateX(var(--ty)) rotateY(var(--tx));
          transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
          border-radius: 24px;
        }

        /* ─── Card ─── */
        .pcard {
          background: #fff; border: 1px solid #e8e8ec;
          border-radius: 24px; padding: 10px 10px 12px;
          display: flex; flex-direction: column;
          transition: border-color 0.3s, box-shadow 0.35s;
          height: 100%;
        }
        .pcard:hover { border-color: #ccc; box-shadow: 0 16px 44px -14px rgba(0,0,0,0.18); }

        /* ─── Hero wrap + hero ─── */
        .pcard__hw { position: relative; }
        .pcard__hero {
          display: flex; align-items: center; justify-content: center;
          position: relative; border-radius: 17px; overflow: hidden;
          background: var(--grad); aspect-ratio: 5/4;
          isolation: isolate; text-decoration: none;
        }

        /* dot grain texture */
        .pcard__tex {
          position: absolute; inset: 0; z-index: 1;
          background-image: radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1.5px);
          background-size: 13px 13px;
          mask-image: linear-gradient(180deg,rgba(0,0,0,0.8),transparent 82%);
          -webkit-mask-image: linear-gradient(180deg,rgba(0,0,0,0.8),transparent 82%);
        }
        /* top radial glow */
        .pcard__glow {
          position: absolute; top: -36%; left: 50%; transform: translateX(-50%);
          width: 140%; height: 88%; z-index: 1;
          background: radial-gradient(ellipse,rgba(255,255,255,0.65),transparent 62%);
          pointer-events: none;
        }
        /* hover shine overlay — follows cursor via --mx/--my */
        .pcard__shine {
          position: absolute; inset: 0; z-index: 2; border-radius: inherit;
          background: radial-gradient(circle at var(--mx, 68%) var(--my, 32%), rgba(255,255,255,0.38), transparent 52%);
          opacity: 0; transition: opacity 0.4s;
          pointer-events: none;
        }
        .pcard:hover .pcard__shine { opacity: 1; }

        /* category chip */
        .pcard__cat {
          position: absolute; top: 10px; left: 10px; z-index: 6;
          padding: 3px 9px; border-radius: 999px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--ink);
          background: rgba(255,255,255,0.62); border: 1px solid rgba(255,255,255,0.78);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        }

        /* center name block */
        .pcard__center {
          position: relative; z-index: 4;
          display: flex; flex-direction: column; align-items: center;
          padding: 0 14px;
        }
        .pcard__name {
          font-size: clamp(30px, 6vw, 44px); font-weight: 900;
          letter-spacing: -0.04em; line-height: 1; text-align: center;
          color: var(--ink);
          text-shadow: 0 1px 0 rgba(255,255,255,0.55), 0 3px 10px rgba(0,0,0,0.08);
        }

        /* ─── Doodle hover animations ─── */

        /* Doodle A — thematic (large, accent) → floats up + rotates */
        .pcard__dA { transition: transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s; }
        .pcard:hover .pcard__dA {
          transform: translateY(-12px) rotate(22deg) scale(1.08);
          opacity: 0.8 !important;
        }

        /* Doodle B — secondary (ink) → spins */
        .pcard__dB { transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.35s; }
        .pcard:hover .pcard__dB {
          transform: rotate(45deg) scale(1.12);
          opacity: 0.68 !important;
        }

        /* Sparkles — twinkle pulse on hover */
        @keyframes twinkle {
          0%,100% { transform: scale(1) rotate(0deg); }
          40%     { transform: scale(1.45) rotate(28deg); }
          70%     { transform: scale(0.9) rotate(-10deg); }
        }
        .pcard__sp { transition: opacity 0.3s; }
        .pcard:hover .pcard__sp  { animation: twinkle 1.5s ease-in-out infinite; opacity: 0.75 !important; }
        .pcard:hover .pcard__sp2 { animation-delay: 0.42s; animation-duration: 1.9s; }
        .pcard:hover .pcard__sp3 { animation-delay: 0.85s; animation-duration: 1.2s; }

        /* GitHub button */
        .pcard__git {
          position: absolute; top: 10px; right: 10px; z-index: 7;
          display: inline-flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 8px; color: #fff;
          background: rgba(0,0,0,0.26);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.22);
          transition: background 0.25s, transform 0.2s; text-decoration: none;
        }
        .pcard__git:hover { background: rgba(0,0,0,0.5); transform: translateY(-1px); }

        /* ─── Body ─── */
        .pcard__body { display: flex; flex-direction: column; padding: 12px 5px 3px; flex: 1; }
        .pcard__divider {
          height: 2px;
          background: linear-gradient(90deg, var(--accent), transparent);
          border-radius: 999px; opacity: 0.22; margin-bottom: 11px;
        }
        .pcard__tr { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .pcard__title { margin:0; font-size:15px; font-weight:750; letter-spacing:-0.02em; color:#18181b; line-height:1.2; }
        .pcard__pill {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700;
          color: #fff; background: var(--accent); white-space: nowrap; flex-shrink: 0;
        }
        .pcard__desc { margin: 8px 0 0; font-size: 12.5px; line-height: 1.6; color: #71717a; }
        .pcard__tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:11px; margin-bottom:13px; }
        .pcard__tag {
          font-size: 10.5px; font-weight: 600; padding: 4px 10px; border-radius: 7px;
          background: #f4f4f5; color: #52525b; border: 1px solid #e8e8ec;
        }
        .pcard__cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; justify-content: center;
          gap: 6px; margin-top: auto; padding: 11px 14px; border-radius: 12px;
          background: #18181b; color: #fff; font-size: 13px; font-weight: 650;
          text-decoration: none; transition: background 0.2s, transform 0.22s, box-shadow 0.22s;
        }
        .pcard__cta::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0s;
        }
        .pcard__cta:hover { background: #111; transform: translateY(-2px); box-shadow: 0 6px 18px -6px rgba(0,0,0,0.4); }
        .pcard__cta:hover::after { transform: translateX(200%); transition: transform 0.55s ease; }
        .pcard__cta svg { transition: transform 0.22s; }
        .pcard__cta:hover svg { transform: translate(2px,-2px); }

        /* ─── Desktop 3-col compact ─── */
        @media (min-width: 1024px) {
          .psection__inner { max-width: 860px; }
          .psection__grid { grid-template-columns: repeat(3,1fr); gap: 16px; }
          .pcard-outer { border-radius: 18px; }
          .pcard { padding: 8px 8px 10px; border-radius: 18px; }
          .pcard__hero { aspect-ratio: 4/3; border-radius: 13px; }
          .pcard__name { font-size: clamp(20px, 2vw, 26px); }
          .pcard__cat { font-size: 8px; padding: 2.5px 7px; }
          .pcard__git { width: 26px; height: 26px; border-radius: 7px; }
          .pcard__dA { width: 44px !important; height: 44px !important; }
          .pcard__dB { width: 24px !important; height: 24px !important; }
          .pcard__body { padding: 10px 4px 2px; }
          .pcard__title { font-size: 13.5px; }
          .pcard__desc { font-size: 11.5px; }
          .pcard__tags { margin-top: 9px; margin-bottom: 10px; gap: 5px; }
          .pcard__tag { font-size: 10px; padding: 3px 8px; }
          .pcard__cta { font-size: 12.5px; padding: 10px 12px; border-radius: 10px; }
        }

        /* ─── Tablet ─── */
        @media (min-width: 640px) and (max-width: 1023px) {
          .psection { margin-top: 72px; padding: 34px 22px 56px; }
          .psection__title { font-size: 34px; }
          .psection__grid { gap: 22px; }
        }

        /* ─── Mobile ─── */
        @media (max-width: 639px) {
          .psection { margin-top: 56px; padding: 28px 18px 44px; }
          .psection__hd { margin-bottom: 28px; }
          .psection__title { font-size: 30px; }
          .psection__sub { font-size: 14px; }
          .psection__grid { grid-template-columns: 1fr; gap: 20px; }
          .pcard__hero { aspect-ratio: 16/10; }
          .pcard__name { font-size: clamp(34px, 12vw, 48px); }
          .pcard__title { font-size: 16px; }
          .pcard__desc { font-size: 13px; }
          .pcard__cta { padding: 13px 16px; font-size: 14px; }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
