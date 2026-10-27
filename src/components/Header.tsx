import { Menu, X, Mail, ArrowUpRight, FolderKanban, GitFork, BookOpenText, Route } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { cn } from "@/lib/utils";
import { scrollToTarget } from "@/components/SmoothScroll";

const navItems = [
  { name: "Projects", href: "#projects", icon: <FolderKanban className="w-4 h-4" /> },
  { name: "Journey", href: "#journey", icon: <Route className="w-4 h-4" /> },
  { name: "Open Source", href: "#open-source", icon: <GitFork className="w-4 h-4" /> },
  { name: "Blogs", href: "#blogs", icon: <BookOpenText className="w-4 h-4" /> },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useEffect(() => {
    const sections = navItems.map((item) => item.href.substring(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const matched = navItems.find((item) => item.href === `#${entry.target.id}`);
          if (matched) setActiveTab(matched.name);
        });
        if (window.scrollY < 100) setActiveTab("");
      },
      { root: null, rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 80) setIsVisible(false);
      else if (y < lastScrollY.current) setIsVisible(true);
      lastScrollY.current = y;
      if (y < 100) setActiveTab("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        aria-hidden="true"
        style={{
          scaleX: progress,
          transformOrigin: "0 50%",
          position: "fixed", top: 0, left: 0, right: 0,
          height: 3, zIndex: 9999, pointerEvents: "none",
          background: "linear-gradient(90deg,#6366f1,#06b6d4,#f59e0b)",
        }}
      />

      {/* Mobile menu backdrop — kept outside <header> so its transform doesn't clip the blur */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-30 backdrop-blur-md bg-background/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: isVisible || mobileMenuOpen ? 0 : -110, opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between py-4 px-4 md:px-6 md:pointer-events-none"
      >
        {/* Name */}
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget(0, 0);
          }}
          whileHover={{ scale: 1.05, rotate: -1.5 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 md:pointer-events-auto"
          aria-label="Back to top"
        >
          <span className="text-3xl md:text-4xl signature-name">
            <span className="text-blue-600 dark:text-blue-500">Giri</span>{" "}
            <span className="text-black dark:text-white">Naik</span>
          </span>
        </motion.a>

        <div className="flex items-center gap-2">
          {/* Email (desktop) */}
          <motion.div
            className="hidden md:block pointer-events-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <RainbowButton
              onClick={() => (window.location.href = "mailto:yourgirinaik@gmail.com")}
              className="flex items-center gap-2 h-10 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
              <ArrowUpRight className="w-3 h-3" />
            </RainbowButton>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen((o) => !o)}
            whileTap={{ scale: 0.88 }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? "x" : "menu"}
                className="block"
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-muted-foreground" />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              key="mobile-nav"
              initial={{ opacity: 0, y: -14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{ transformOrigin: "top right" }}
              className="absolute top-full left-4 right-4 mt-2 flex flex-col items-stretch gap-1 bg-background/95 backdrop-blur-xl rounded-2xl px-4 py-4 shadow-xl border border-border md:hidden z-40"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 + i * 0.05, ease: EASE }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-xl transition-colors",
                    activeTab === item.name
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                  onClick={() => {
                    setActiveTab(item.name);
                    closeMenu();
                  }}
                >
                  {item.icon}
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3, ease: EASE }}
              >
                <RainbowButton
                  onClick={() => {
                    window.location.href = "mailto:yourgirinaik@gmail.com";
                    closeMenu();
                  }}
                  className="flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium w-full mt-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                  <ArrowUpRight className="w-3 h-3" />
                </RainbowButton>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
