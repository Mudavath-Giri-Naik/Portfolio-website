import { Menu, X, Mail, ArrowUpRight, FolderKanban, GitFork, BookOpenText, Award, Route } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { CoolMode } from "@/components/ui/cool-mode";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);

  const navItems = [
    { name: "Projects", href: "#projects", icon: <FolderKanban className="w-4 h-4" /> },
    { name: "Journey", href: "#journey", icon: <Route className="w-4 h-4" /> },
    { name: "Open Source", href: "#open-source", icon: <GitFork className="w-4 h-4" /> },
    { name: "Blogs", href: "#blogs", icon: <BookOpenText className="w-4 h-4" /> },
    { name: "Certifications", href: "#certifications", icon: <Award className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const sections = navItems.map((item) => item.href.substring(1));
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Focus on the upper middle of the viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const matchedItem = navItems.find((item) => item.href === `#${sectionId}`);
          if (matchedItem) {
            setActiveTab(matchedItem.name);
          }
        }
      });

      // Special check: if no tracked section is intersecting and scroll is at the top, clear activeTab
      if (window.scrollY < 100) {
        setActiveTab("");
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Handle initial scroll position, scroll direction, or scroll back to top
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0);

      // Determine visibility based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false); // Scrolling down -> hide
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true); // Scrolling up -> show
      }

      lastScrollY.current = currentScrollY;

      // Handle active tab clear at very top
      if (currentScrollY < 100) {
        setActiveTab("");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0,
          height: 2, zIndex: 9999, pointerEvents: "none",
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg,#6366f1,#06b6d4,#f59e0b)",
          transition: "width 0.08s linear",
          borderRadius: "0 2px 2px 0",
        }}
      />
      <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 flex items-center justify-between py-4 px-4 md:px-6 md:pointer-events-none transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* Name - Left Corner with Signature Style */}
      <div className="flex items-center gap-2">
        <span className="text-3xl md:text-4xl signature-name">
          <span className="text-blue-600 dark:text-blue-500">Giri</span>{" "}
          <span className="text-black dark:text-white">Naik</span>
        </span>
      </div>

      {/* Navigation Links - (Moved outside header to preserve fixed positioning) */}

      {/* Right Section - Email Button */}
      <div className="flex items-center gap-2">
        {/* Email Button */}
        <div className="hidden md:block pointer-events-auto">
          <RainbowButton
            onClick={() => (window.location.href = "mailto:yourgirinaik@gmail.com")}
            className="flex items-center gap-2 h-10 px-4 py-2 rounded-full text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
            <ArrowUpRight className="w-3 h-3" />
          </RainbowButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="absolute top-full left-4 right-4 mt-2 flex flex-col items-center gap-2 bg-background rounded-2xl px-6 py-4 shadow-lg border border-border md:hidden animate-fade-in">
          {navItems.map((item) => (
            <CoolMode key={item.name + "-mobile"}>
              <a
                href={item.href}
                className={cn(
                  "transition-all text-sm font-medium w-full text-center py-1 rounded-lg",
                  activeTab === item.name
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                onClick={() => {
                  setActiveTab(item.name);
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </a>
            </CoolMode>
          ))}
          <RainbowButton
            onClick={() => {
              window.location.href = "mailto:yourgirinaik@gmail.com";
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium w-full mt-2"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
            <ArrowUpRight className="w-3 h-3" />
          </RainbowButton>
        </nav>
      )}
    </header>


    </>
  );
};

export default Header;
