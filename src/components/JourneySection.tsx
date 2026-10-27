import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
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

const years: Year[] = [
  {
    no: "1", label: "First Year", hand: "where it all began", range: "2023 – 2024",
    status: "done", accent: "#6366f1", tint: "#eff1ff", deco: "Misc_02.svg", sticker: "33.svg",
    events: [
      { month: "Aug 2023", title: "Started B.Tech CSE",         type: "milestone",     img: "/images/IMG_20241209_075612~2.jpg" },
      { month: "Nov 2023", title: "Buildathon – RITH Vizag",    type: "hackathon",     img: "/images/1760863321410.jpeg"         },
      { month: "Jan 2024", title: "DSA Competition Prize",      type: "achievement",   img: "/images/learn.png"                  },
      { month: "Apr 2024", title: "Devfest 2024 – GDG Vizag",  type: "event",         img: "/images/image.png"                  },
    ],
  },
  {
    no: "2", label: "Second Year", hand: "finding my stride", range: "2024 – 2025",
    status: "done", accent: "#10b981", tint: "#eafaf2", deco: "Misc_03.svg", sticker: "10.svg",
    events: [
      { month: "Aug 2024", title: "Meeting Developers",         type: "participation", img: "/images/IMG_20241208_172556~2.jpg"  },
      { month: "Dec 2024", title: "Networking Events",          type: "event",         img: "/images/IMG_20250823_195228.jpg"    },
      { month: "Feb 2025", title: "AI for Vizag Meetup",        type: "event",         img: "/images/aifor.jpeg"                 },
      { month: "Apr 2025", title: "Techmates Team",             type: "launch",        img: "/images/IMG_20250914_084343.jpg"    },
    ],
  },
  {
    no: "3", label: "Third Year", hand: "going all-in on AI", range: "2025 – 2026",
    status: "done", accent: "#ec4899", tint: "#fdeef6", deco: "Misc_01.svg", sticker: "50.svg",
    events: [
      { month: "Jul 2025", title: "Hackathon – VIIT Vizag",     type: "hackathon",     img: "/images/IMG_20250914_030725.jpg"    },
      { month: "Aug 2025", title: "Building Connections",       type: "participation", img: "/images/IMG_20250914_035115.jpg"    },
      { month: "Sep 2025", title: "Tech Influencer",            type: "invitation",    img: "/images/IMG_20250927_191458~2.jpg"  },
      { month: "Sep 2025", title: "Creators Summit – T-Hub",   type: "event",         img: "/images/IMG_20250928_175548.jpg"    },
      { month: "Nov 2025", title: "OpenMic – WeHub Hyd",        type: "invitation",    img: "/images/wehub.jpeg"                 },
    ],
  },
  {
    no: "4", label: "Final Year", hand: "the home stretch", range: "2026 – 2027",
    status: "current", accent: "#f59e0b", tint: "#fff6e6", deco: "Misc_05.svg", sticker: "90.svg",
    events: [
      { month: "Jan 2026", title: "Tech Influencers Meet",      type: "participation", img: "/images/IMG_20250927_191626.jpg"    },
      { month: "Mar 2026", title: "Panel – Creators Summit",    type: "invitation",    img: "/images/creators.jpeg"              },
      { month: "May 2026", title: "SDE – Student Tribe Hyd",    type: "internship",    img: "/images/IMG_20250929_161411~2.jpg"  },
      { month: "Jul 2026", title: "Founded Student Tribe",      type: "milestone",     img: "/images/IMG_20250929_163728~2.jpg"  },
    ],
  },
];

/* ─── Doodle (recolors black SVG via CSS mask) ─── */
const Doodle: React.FC<{ src: string; className?: string; style?: React.CSSProperties }> = ({ src, className, style }) => (
  <span aria-hidden="true" className={`doodle ${className || ""}`} style={{ ["--m" as string]: `url(/svgs/${src})`, ...style }} />
);

/* ─── Flatten every year into one chronological slide list ─── */
type Slide = JEvent & { year: Year };
const slides: Slide[] = years.flatMap((y) => y.events.map((e) => ({ ...e, year: y })));

const INTERVAL = 2000;
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Section ─── */
const JourneySection: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boxRef, { margin: "-15% 0px -15% 0px" });
  const reduce = useReducedMotion();

  const [[index, dir], setPage] = useState<[number, number]>([0, 1]);
  const [hovered, setHovered] = useState(false);

  const paginate = useCallback((d: number) => {
    setPage(([i]) => [(i + d + slides.length) % slides.length, d]);
  }, []);

  const playing = inView && !hovered && !reduce;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => paginate(1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [playing, index, paginate]);

  // Warm the cache so slides never pop in
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.img;
    });
  }, []);

  const slide = slides[index];
  const accent = slide.year.accent;

  return (
    <section id="journey" className="jsection">
      <img src="/stickers/5.svg" alt="" aria-hidden="true" className="jsection__sticker jsection__sticker--1" />
      <img src="/stickers/70.svg" alt="" aria-hidden="true" className="jsection__sticker jsection__sticker--2" />

      <div className="jsection__inner">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
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

        <motion.div
          ref={boxRef}
          initial={{ opacity: 0, y: 56, scale: 0.96, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="jbox"
          style={{ "--accent": accent } as React.CSSProperties}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="B.Tech journey slideshow"
        >
          {/* ambient accent glow that follows the current slide */}
          <motion.div
            aria-hidden="true"
            className="jbox__glow"
            animate={{ background: `radial-gradient(60% 80% at 20% 0%, ${accent}33 0%, transparent 70%)` }}
            transition={{ duration: 0.8 }}
          />

          <div className="jbox__stage">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={index}
                custom={dir}
                className="jbox__photo"
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 1.04 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.97 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.65, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) paginate(1);
                  else if (info.offset.x > 50) paginate(-1);
                }}
              >
                <motion.img
                  src={slide.img}
                  alt={slide.title}
                  draggable={false}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.6, ease: "easeOut" }}
                />
              </motion.div>
            </AnimatePresence>

            {/* caption — bottom of the photo */}
            <div className="jbox__cap">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="jbox__text"
                  aria-live="polite"
                >
                  <h3 className="jbox__title">{slide.title}</h3>
                  <span className="jbox__meta">
                    <span>{slide.month}</span>
                    <i aria-hidden="true" />
                    <span className="jbox__hand">{slide.year.hand}</span>
                  </span>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </motion.div>
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

        .jsection__header { text-align: center; margin-bottom: 40px; }
        .jsection__title {
          position: relative; display: inline-block;
          font-size: 42px; font-weight: 800; letter-spacing: -0.04em;
          margin: 0; color: #18181b; line-height: 1.05;
        }
        .jsection__title-ul { position: absolute; left: -3%; bottom: -18px; width: 106%; height: 15px; color: #6366f1; }
        .jsection__subtitle { font-size: 15px; color: #71717a; margin: 28px auto 0; line-height: 1.6; max-width: 460px; }
        .jsection__subtitle strong { color: #18181b; font-weight: 700; }

        /* ── The one box ── */
        .jbox {
          position: relative; overflow: hidden;
          border-radius: 28px; padding: 18px;
          background: #fff;
          border: 1px solid #ececf1;
          box-shadow: 0 30px 70px -30px rgba(24,24,27,0.28), 0 4px 14px -6px rgba(24,24,27,0.08);
        }
        .jbox__glow { position: absolute; inset: 0; pointer-events: none; }
        .jbox__stage {
          position: relative; z-index: 1; overflow: hidden;
          aspect-ratio: 16 / 9; border-radius: 20px;
          background: #f1f1f4;
          box-shadow: 0 0 0 1px rgba(24,24,27,0.06);
        }
        .jbox__photo { position: absolute; inset: 0; cursor: grab; touch-action: pan-y; }
        .jbox__photo:active { cursor: grabbing; }
        .jbox__photo img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          user-select: none; -webkit-user-drag: none;
        }
        .jbox__stage::after {
          content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 2;
          background: linear-gradient(180deg, rgba(0,0,0,0.22) 0%, transparent 22%, transparent 42%, rgba(8,8,14,0.86) 100%);
        }
        .jbox__cap {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 3;
          display: flex; align-items: flex-end; justify-content: space-between; gap: 16px;
          padding: 24px 22px 20px; pointer-events: none;
        }
        .jbox__cap > * { pointer-events: auto; }
        .jbox__text { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; min-width: 0; }
        .jbox__year {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 700; color: #fff;
          background: rgba(255,255,255,0.16); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.28);
          padding: 4px 12px 4px 4px; border-radius: 999px;
        }
        .jbox__yearno {
          width: 22px; height: 22px; border-radius: 50%;
          display: grid; place-items: center;
          background: var(--accent); color: #fff; font-size: 11px;
        }
        .jbox__title {
          margin: 0; font-size: clamp(22px, 3.4vw, 36px);
          font-weight: 800; letter-spacing: -0.035em; line-height: 1.1; color: #fff;
          text-wrap: balance; text-shadow: 0 2px 14px rgba(0,0,0,0.35);
        }
        .jbox__meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.85); font-variant-numeric: tabular-nums; }
        .jbox__meta i { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.6); }
        .jbox__hand { font-family: 'Dancing Script', cursive; font-size: 20px; font-weight: 600; color: #fff; }


        /* ── Tablet ── */
        @media (min-width: 640px) and (max-width: 1023px) {
          .jsection { padding: 30px 22px 56px; }
          .jsection__title { font-size: 36px; }
          .jbox__stage { aspect-ratio: 3 / 2; }
        }

        /* ── Mobile ── */
        @media (max-width: 639px) {
          .jsection { padding: 24px 16px 44px; margin-top: 24px; }
          .jsection__sticker { display: none; }
          .jsection__header { margin-bottom: 30px; }
          .jsection__title { font-size: 31px; }
          .jsection__subtitle { font-size: 14px; margin-top: 24px; }

          .jbox { border-radius: 22px; padding: 10px; }
          .jbox__stage { border-radius: 16px; aspect-ratio: 4 / 5; }
          .jbox__cap { flex-direction: column; align-items: stretch; gap: 14px; padding: 18px 16px 16px; }
          .jbox__title { font-size: 24px; }
        }

      `}</style>
    </section>
  );
};

export default JourneySection;
