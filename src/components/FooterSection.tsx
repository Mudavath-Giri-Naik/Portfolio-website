import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MessageSquare } from "lucide-react";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Certifications", href: "#certifications" },
  { label: "Open Source", href: "#open-source" },
  { label: "Blogs", href: "#blogs" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/GiriNaik10",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.021C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/giri-naik",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/girinaik",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:yourgirinaik@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
      </svg>
    ),
  },
];

const footerStyles = `
  .footer-social {
    color: #888;
    display: flex;
    transition: color 0.2s, transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
  }
  .footer-social:hover {
    color: #111;
    transform: translateY(-5px) scale(1.18);
  }
  .footer-avatar {
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
  }
  .footer-avatar:hover {
    transform: scale(1.08) rotate(3deg);
    box-shadow: 0 8px 24px -8px rgba(0,0,0,0.22);
  }
  .footer-cta {
    display: inline-flex; align-items: center; gap: 8px;
    background: #111; color: #fff; border-radius: 100px;
    padding: 12px 24px; font-weight: 600; font-size: 15px;
    text-decoration: none; letter-spacing: -0.01em;
    transition: background 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
    position: relative; overflow: hidden;
  }
  .footer-cta::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0s;
  }
  .footer-cta:hover { background: #222; transform: translateY(-2px); box-shadow: 0 8px 22px -8px rgba(0,0,0,0.32); }
  .footer-cta:hover::after { transform: translateX(200%); transition: transform 0.5s ease; }
`;

export default function FooterSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <footer
      ref={ref}
      style={{
        background: "#fff",
        borderTop: "1px solid #e8e8e8",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <style>{footerStyles}</style>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 40px", textAlign: "center" }}>

        {/* ── profile picture + name ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 28 }}
        >
          <div
            className="footer-avatar"
            style={{
              width: 64, height: 64,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #111",
              flexShrink: 0,
            }}>
            <img
              src="/naik.jpeg"
              alt="Giri Naik"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
          </div>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#111",
          }}>
            Giri Naik
          </span>
        </motion.div>

        {/* ── thin divider ── */}
        <div style={{ height: 1, background: "#e8e8e8", marginBottom: 36 }} />

        {/* ── headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 28 }}
        >
          <h2 style={{
            fontSize: "clamp(28px, 6vw, 46px)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
            color: "#111",
            margin: 0,
          }}>
            Let's collaborate<br />and build something great
          </h2>
        </motion.div>

        {/* ── CTA button ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginBottom: 44 }}
        >
          <a href="mailto:yourgirinaik@gmail.com" className="footer-cta">
            Let's talk
            <span style={{
              width: 28, height: 28,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MessageSquare style={{ width: 14, height: 14 }} />
            </span>
          </a>
        </motion.div>

        {/* ── thin divider ── */}
        <div style={{ height: 1, background: "#e8e8e8", marginBottom: 28 }} />

        {/* ── nav links ── */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "4px 0",
            marginBottom: 28,
          }}
        >
          {navLinks.map((link, i) => (
            <span key={link.label} style={{ display: "flex", alignItems: "center" }}>
              <a
                href={link.href}
                style={{
                  color: "#555",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "2px 14px",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#111")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555")}
              >
                {link.label}
              </a>
              {i < navLinks.length - 1 && (
                <span style={{ color: "#ddd", fontSize: 14, userSelect: "none" }}>|</span>
              )}
            </span>
          ))}
        </motion.nav>

        {/* ── social icons ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.38 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginBottom: 36 }}
        >
          {socials.map((s, i) => (
            <span key={s.label} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="footer-social"
              >
                {s.icon}
              </a>
              {i < socials.length - 1 && (
                <span style={{ color: "#ddd", fontSize: 18, userSelect: "none" }}>|</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* ── copyright ── */}
        <p style={{
          fontSize: 12,
          color: "#aaa",
          fontWeight: 500,
          margin: 0,
          letterSpacing: "0.02em",
        }}>
          © {new Date().getFullYear()} Giri Naik · Built with passion
        </p>

      </div>
    </footer>
  );
}
