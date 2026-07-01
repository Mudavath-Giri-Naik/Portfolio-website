import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  IconSchool,
  IconTrophy,
  IconStar,
  IconMicrophone,
  IconUsers,
  IconCalendarEvent,
  IconRocket,
  IconBriefcase,
  IconCertificate,
} from "@tabler/icons-react";

/* ══════════════════════════════════════════════════════════════
   EDIT ME  →  Replace the placeholder `img` (certificate / email
   screenshot), `title`, `month` and `type` for each event.
   type: milestone | hackathon | achievement | invitation |
         participation | event | launch | internship | certificate
   ══════════════════════════════════════════════════════════════ */

type EventType =
  | "milestone"
  | "hackathon"
  | "achievement"
  | "invitation"
  | "participation"
  | "event"
  | "launch"
  | "internship"
  | "certificate";

type JEvent = { month: string; title: string; type: EventType; img: string; upcoming?: boolean };

type Year = {
  no: string;
  label: string;
  hand: string;
  range: string;
  status: "done" | "current";
  accent: string;
  tint: string;
  deco: string;
  sticker: string;
  events: JEvent[];
};

const typeMeta: Record<EventType, { icon: React.ReactNode; color: string; light: string }> = {
  milestone: { icon: <IconSchool size={13} />, color: "#6366f1", light: "#eef0ff" },
  hackathon: { icon: <IconTrophy size={13} />, color: "#f59e0b", light: "#fff4e0" },
  achievement: { icon: <IconStar size={13} />, color: "#ec4899", light: "#fdeaf4" },
  invitation: { icon: <IconMicrophone size={13} />, color: "#0ea5e9", light: "#e6f6fe" },
  participation: { icon: <IconUsers size={13} />, color: "#10b981", light: "#e6fbf2" },
  event: { icon: <IconCalendarEvent size={13} />, color: "#8b5cf6", light: "#f1ebfe" },
  launch: { icon: <IconRocket size={13} />, color: "#ef4444", light: "#fdeaea" },
  internship: { icon: <IconBriefcase size={13} />, color: "#0d9488", light: "#e4f7f5" },
  certificate: { icon: <IconCertificate size={13} />, color: "#6366f1", light: "#eef0ff" },
};

/* placeholder pool → swap each with your real certificate / screenshot */
const imgPool = [
  "/images/aifor.jpeg",
  "/images/creators.jpeg",
  "/images/wehub.jpeg",
  "/images/learn.png",
  "/images/image.png",
  "/images/1760863321410.jpeg",
  "/techmates.png",
  "/ambox.png",
  "/naik.jpeg",
  "/hug.png",
  "/girish.png",
];
const ph = (seed: string) => imgPool[(parseInt(seed.split("-")[1], 10) - 1) % imgPool.length];

const years: Year[] = [
  {
    no: "1", label: "First Year", hand: "where it all began", range: "2023 – 2024",
    status: "done", accent: "#6366f1", tint: "#eff1ff", deco: "Misc_02.svg", sticker: "33.svg",
    events: [
      { month: "Aug 2023", title: "Started B.Tech", type: "milestone", img: ph("giri-1") },
      { month: "Nov 2023", title: "First Hackathon", type: "hackathon", img: ph("giri-2") },
      { month: "Feb 2024", title: "Web Dev Workshop", type: "event", img: ph("giri-3") },
      { month: "Apr 2024", title: "Coding Contest", type: "achievement", img: ph("giri-4") },
    ],
  },
  {
    no: "2", label: "Second Year", hand: "finding my stride", range: "2024 – 2025",
    status: "done", accent: "#10b981", tint: "#eafaf2", deco: "Misc_03.svg", sticker: "10.svg",
    events: [
      { month: "Jul 2024", title: "24-Hour Hackathon", type: "hackathon", img: ph("giri-5") },
      { month: "Oct 2024", title: "Open Source", type: "participation", img: ph("giri-6") },
      { month: "Jan 2025", title: "Guest Session", type: "invitation", img: ph("giri-7") },
      { month: "Mar 2025", title: "Techmates Launch", type: "launch", img: ph("giri-8") },
    ],
  },
  {
    no: "3", label: "Third Year", hand: "going all-in on AI", range: "2025 – 2026",
    status: "done", accent: "#ec4899", tint: "#fdeef6", deco: "Misc_01.svg", sticker: "50.svg",
    events: [
      { month: "Jun 2025", title: "AI Hackathon", type: "hackathon", img: ph("giri-9") },
      { month: "Sep 2025", title: "Intentify Released", type: "launch", img: ph("giri-10") },
      { month: "Dec 2025", title: "Tech Talk", type: "invitation", img: ph("giri-11") },
      { month: "Mar 2026", title: "Doxy Released", type: "achievement", img: ph("giri-12") },
    ],
  },
  {
    no: "4", label: "Final Year", hand: "the home stretch", range: "2026 – 2027",
    status: "current", accent: "#f59e0b", tint: "#fff6e6", deco: "Misc_05.svg", sticker: "90.svg",
    events: [
      { month: "Jul 2026", title: "Final Year Begins", type: "milestone", img: ph("giri-13") },
      { month: "Soon", title: "Internship", type: "internship", img: ph("giri-14"), upcoming: true },
      { month: "Soon", title: "Capstone Project", type: "event", img: ph("giri-15"), upcoming: true },
      { month: "2027", title: "Graduation", type: "certificate", img: ph("giri-16"), upcoming: true },
    ],
  },
];

/* ─── Doodle (recolors black SVG via CSS mask) ─── */
const Doodle: React.FC<{ src: string; className?: string; style?: React.CSSProperties }> = ({ src, className, style }) => (
  <span aria-hidden="true" className={`doodle ${className || ""}`} style={{ ["--m" as string]: `url(/svgs/${src})`, ...style }} />
);

/* ─── Event image card ─── */
const EventCard: React.FC<{ ev: JEvent }> = ({ ev }) => {
  const m = typeMeta[ev.type];
  return (
    <div className={`evcard ${ev.upcoming ? "is-upcoming" : ""}`}>
      <div className="evcard__frame">
        <img src={ev.img} alt={ev.title} loading="lazy" />
        <span className="evcard__badge" style={{ color: m.color, background: m.light }}>
          {m.icon}
        </span>
      </div>
      <h4 className="evcard__title">{ev.title}</h4>
      <span className="evcard__month">{ev.month}</span>
    </div>
  );
};

/* ─── Year chapter ─── */
const Chapter: React.FC<{ year: Year; index: number; last: boolean }> = ({ year, index, last }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 36 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
        transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
        className="jband"
        style={{ "--accent": year.accent, background: year.tint } as React.CSSProperties}
      >
        <Doodle src={year.deco} className="jband__deco" style={{ color: year.accent }} />
        <img src={`/stickers/${year.sticker}`} alt="" aria-hidden="true" className="jband__sticker" />

        <div className="jband__head">
          <span className="jband__num">
            {year.no}
            <Doodle src="Highlight_09.svg" className="jband__num-ring" style={{ color: year.accent }} />
          </span>
          <div className="jband__titles">
            <div className="jband__title-row">
              <h3 className="jband__title">{year.label}</h3>
              <span className={`jband__status ${year.status === "current" ? "is-now" : "is-done"}`}>
                {year.status === "current" ? "in progress" : "done"}
              </span>
            </div>
            <span className="jband__hand">{year.hand}</span>
          </div>
          <span className="jband__range">{year.range}</span>
        </div>

        <div className="jgrid">
          {year.events.map((ev) => (
            <EventCard key={ev.title} ev={ev} />
          ))}
        </div>
      </motion.div>

      {!last && (
        <div className="jconnector" aria-hidden="true">
          <Doodle src="Arrow_03.svg" className="jconnector__arrow" />
        </div>
      )}
    </>
  );
};

/* ─── Section ─── */
const JourneySection: React.FC = () => {
  return (
    <section id="journey" className="jsection">
      <img src="/stickers/5.svg" alt="" aria-hidden="true" className="jsection__sticker jsection__sticker--1" />
      <img src="/stickers/70.svg" alt="" aria-hidden="true" className="jsection__sticker jsection__sticker--2" />

      <div className="jsection__inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="jsection__header"
        >
          <h2 className="jsection__title">
            B.Tech Journey
            <Doodle src="Underline_05.svg" className="jsection__title-ul" />
          </h2>
          <p className="jsection__subtitle">
            Four years, one story — from <strong>2023</strong> to <strong>2027</strong>.
          </p>
        </motion.div>

        {years.map((y, i) => (
          <Chapter key={y.label} year={y} index={i} last={i === years.length - 1} />
        ))}
      </div>

      <style>{`
        .doodle {
          display: inline-block;
          background-color: currentColor;
          -webkit-mask: var(--m) no-repeat center / contain;
          mask: var(--m) no-repeat center / contain;
          pointer-events: none; flex-shrink: 0;
        }

        .jsection {
          padding: 40px 24px 64px;
          font-family: 'Inter', -apple-system, sans-serif;
          width: 100%; max-width: 1120px; margin: 40px auto 0;
          position: relative; overflow: hidden;
        }
        .jsection__inner { max-width: 940px; margin: 0 auto; position: relative; z-index: 2; }

        .jsection__sticker { position: absolute; z-index: 1; opacity: 0.9; pointer-events: none; }
        .jsection__sticker--1 { width: 40px; top: 60px; left: 4%; transform: rotate(-12deg); }
        .jsection__sticker--2 { width: 52px; bottom: 8%; right: 3%; transform: rotate(10deg); }

        /* Header */
        .jsection__header { text-align: center; margin-bottom: 40px; }
        .jsection__title {
          position: relative; display: inline-block;
          font-size: 42px; font-weight: 800; letter-spacing: -0.04em;
          margin: 0; color: #18181b; line-height: 1.05;
        }
        .jsection__title-ul { position: absolute; left: -3%; bottom: -18px; width: 106%; height: 15px; color: #6366f1; }
        .jsection__subtitle { font-size: 15px; color: #71717a; margin: 28px auto 0; line-height: 1.6; max-width: 460px; }
        .jsection__subtitle strong { color: #18181b; font-weight: 700; }

        /* Year band */
        .jband {
          position: relative; border-radius: 26px;
          padding: 22px 26px 26px; margin-bottom: 6px; overflow: hidden;
        }
        .jband__deco { position: absolute; top: -16px; right: -12px; width: 120px; height: 120px; opacity: 0.07; transform: rotate(12deg); }
        .jband__sticker { position: absolute; top: 14px; right: 16px; width: 42px; z-index: 1; transform: rotate(8deg); opacity: 0.95; }

        .jband__head { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; flex-wrap: wrap; position: relative; z-index: 2; }
        .jband__num {
          position: relative; flex-shrink: 0; width: 46px; height: 46px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Dancing Script', cursive; font-size: 38px; font-weight: 700; color: var(--accent);
        }
        .jband__num-ring { position: absolute; inset: -12px -9px -10px -10px; width: auto; height: auto; opacity: 0.7; }
        .jband__titles { position: relative; }
        .jband__title-row { display: flex; align-items: center; gap: 10px; }
        .jband__title { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.03em; color: #18181b; }
        .jband__status { font-family: 'Dancing Script', cursive; font-size: 16px; font-weight: 600; transform: rotate(-4deg); }
        .jband__status.is-done { color: #16a34a; }
        .jband__status.is-now { color: #ea580c; }
        .jband__hand { display: block; font-family: 'Dancing Script', cursive; font-size: 17px; color: #9a9aa2; margin-top: -1px; }
        .jband__range {
          margin-left: auto; font-size: 12px; font-weight: 700; color: var(--accent);
          background: rgba(255,255,255,0.75); padding: 6px 12px; border-radius: 999px;
          font-variant-numeric: tabular-nums;
        }

        /* Event grid */
        .jgrid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
          position: relative; z-index: 2;
        }
        .evcard { display: flex; flex-direction: column; }

        /* professional matte frame */
        .evcard__frame {
          position: relative;
          background: #ffffff;
          padding: 5px;
          border-radius: 14px;
          border: 1px solid #e7e7ec;
          box-shadow: 0 5px 16px -8px rgba(24,24,27,0.22);
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
        }
        .evcard__frame:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 26px -10px rgba(24,24,27,0.3);
        }
        .evcard__frame img {
          display: block; width: 100%; aspect-ratio: 3 / 2;
          object-fit: cover; border-radius: 10px; background: #f1f1f4;
        }
        .is-upcoming .evcard__frame { border-style: dashed; }
        .is-upcoming .evcard__frame img { opacity: 0.72; filter: grayscale(0.15); }
        .evcard__badge {
          position: absolute; top: 11px; left: 11px;
          width: 24px; height: 24px; border-radius: 8px;
          display: grid; place-items: center;
          border: 1.5px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.14);
        }
        .evcard__title { margin: 11px 2px 0; font-size: 13.5px; font-weight: 750; letter-spacing: -0.01em; color: #18181b; line-height: 1.25; }
        .evcard__month { margin: 3px 2px 0; font-size: 11px; font-weight: 600; color: #8a8a93; font-variant-numeric: tabular-nums; }

        /* Connector */
        .jconnector { display: flex; justify-content: center; margin: 2px 0 8px; }
        .jconnector__arrow { width: 40px; height: 40px; color: #c4c4cc; transform: rotate(118deg); opacity: 0.7; }

        /* ── Tablet ── */
        @media (min-width: 640px) and (max-width: 1023px) {
          .jsection { padding: 30px 22px 56px; }
          .jsection__title { font-size: 36px; }
          .jband { padding: 20px 20px 24px; }
          .jgrid { grid-template-columns: repeat(3, 1fr); gap: 14px; }
        }

        /* ── Mobile ── */
        @media (max-width: 639px) {
          .jsection { padding: 24px 16px 44px; margin-top: 24px; }
          .jsection__sticker { display: none; }
          .jsection__header { margin-bottom: 30px; }
          .jsection__title { font-size: 31px; }
          .jsection__subtitle { font-size: 14px; margin-top: 24px; }

          .jband { padding: 20px 16px 22px; border-radius: 22px; }
          .jband__head { gap: 11px; margin-bottom: 16px; }
          .jband__num { width: 42px; height: 42px; font-size: 32px; }
          .jband__title { font-size: 20px; }
          .jband__range { margin-left: 0; }
          .jband__sticker { width: 36px; top: 12px; right: 12px; }

          .jgrid { grid-template-columns: repeat(2, 1fr); gap: 13px; }
          .evcard__title { font-size: 13px; }
          .jconnector__arrow { width: 32px; height: 32px; transform: rotate(128deg); }
        }
      `}</style>
    </section>
  );
};

export default JourneySection;
