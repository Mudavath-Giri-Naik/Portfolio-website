import developerImage from "@/assets/developer-person.png";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Highlighter } from "@/components/ui/highlighter";
import { BackgroundLines } from "@/components/ui/background-lines";
import SocialIcon from "./SocialIcon";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GravityStarsBackground } from "@/components/animate-ui/backgrounds/gravity-stars";

const EASE = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease: EASE },
});

const HeroSection = () => {
  const socialIcons = [
    {
      type: "github",
      title: "GitHub",
      iconPath: "/github.png",
      href: "https://github.com/Mudavath-Giri-Naik",
    },
    {
      type: "linkedin",
      title: "LinkedIn",
      iconPath: "/linkedin.png",
      href: "https://www.linkedin.com/in/giri-naik/",
    },
    {
      type: "email",
      title: "Email",
      iconPath: "/gmail.png",
      href: "mailto:yourgirinaik@gmail.com",
    },
    {
      type: "leetcode",
      title: "LeetCode",
      iconPath: "/leetcode.png",
      href: "https://leetcode.com/u/Mudavathgirinaik/",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-8 md:pt-28 lg:pt-32 px-4 pb-24 md:pb-32">
      {/* Drifting stars */}
      <GravityStarsBackground
        className="absolute inset-0 z-0 text-blue-500/80 pointer-events-none"
        starsCount={55}
        starsSize={2}
        starsOpacity={0.55}
        glowIntensity={10}
        movementSpeed={0.22}
        mouseGravity="attract"
      />

      {/* Background Text - behind image */}
      <motion.div style={{ y: bgTextY, opacity: bgTextOpacity }} className="absolute inset-0 z-0 pointer-events-none">
      <BackgroundLines className="absolute inset-0 z-0 pointer-events-none select-none -mt-32 md:-mt-8 lg:mt-0">
        <div className="flex flex-col items-center justify-center px-2 h-full pt-0 -mt-10 md:pt-48 lg:pt-60">
          <h1 className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem] font-black leading-none tracking-tight text-hero-primary text-center dark:font-extrabold dark:tracking-[-0.02em]">
            Student
          </h1>
          <h1 className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem] font-black leading-none tracking-tight text-hero-secondary -mt-4 sm:-mt-6 md:-mt-10 lg:-mt-14 text-center dark:font-extrabold dark:tracking-[-0.02em]">
            Developer
          </h1>
        </div>
      </BackgroundLines>
      </motion.div>

      {/* Text Content Section - Top */}
      <motion.div {...rise(0.15)} className="relative z-20 w-full max-w-7xl mx-auto px-4">
        {/* First Paragraph - above image (all screens) */}
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto mt-0 md:mt-0 mb-2 md:mb-3">
          <p className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed text-center">
            Final Year{" "}
            <Highlighter action="underline" color="#ff0022">
              <span className="font-bold text-black dark:text-black">  Computer Science  </span>
            </Highlighter>
            {" "}student with full-stack experience, 12+{" "}
            <Highlighter action="highlight" color="#16a34a">
              <span className="font-bold">  hackathons  </span>
            </Highlighter>
            {", "}6K+ LinkedIn{" "}
            <Highlighter action="highlight" color="#2563eb">
              <span className="font-bold">  followers  </span>
            </Highlighter>
            {" "}currently learning AI using{" "}
            <Highlighter action="underline" color="#eab308">
              <span className="font-bold"> Python  </span>
            </Highlighter>
            .
          </p>
        </div>

        {/* Second and Third Paragraphs - below first paragraph (large screens only) */}
        <div className="hidden lg:flex items-start justify-between w-full mb-2 md:mb-3 px-8 gap-8">
          {/* Second Paragraph - Left */}
          <div className="flex-1 max-w-md">
            <p className="text-base lg:text-lg text-foreground leading-relaxed text-left">
              obsessed with understanding how{" "}
              <Highlighter action="highlight" color="#2563eb">
                <span className="font-bold">  things work  </span>
              </Highlighter>
              {" "}under the hood, from{" "}
              <Highlighter action="underline" color="#16a34a">
                <span className="font-bold text-black dark:text-black">  system internals  </span>
              </Highlighter>
              {" "}to{" "}
              <Highlighter action="highlight" color="#dc2626">
                <span className="font-bold">  intelligent software  </span>
              </Highlighter>
              .
            </p>
          </div>

          {/* Third Paragraph - Right */}
          <div className="flex-1 max-w-md">
            <p className="text-base lg:text-lg text-foreground leading-relaxed text-right">
              <span className="whitespace-nowrap">
                Learning in public through{" "}
                <Highlighter action="underline" color="#16a34a">
                  <span className="font-bold text-black dark:text-black">  open-source contributions  </span>
                </Highlighter>
              </span>
              {", "}
              <span className="whitespace-nowrap">
                <Highlighter action="highlight" color="#2563eb">
                  <span className="font-bold">  docs-first development  </span>
                </Highlighter>
                {", "}and{" "}
                <Highlighter action="underline" color="#dc2626">
                  <span className="font-bold text-black dark:text-black">  hands-on system building  </span>
                </Highlighter>
              </span>
              .
            </p>
          </div>
        </div>
      </motion.div>

      {/* Developer Image - on top of background text */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
        className="relative z-20 flex items-center justify-center w-full mt-4 md:-mt-12 lg:-mt-24"
      >
        <motion.div style={{ y: imageY, scale: imageScale }} className="will-change-transform">
          <img
            src={developerImage}
            alt="Student Developer working on laptop"
            className="h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] object-contain"
          />
        </motion.div>
      </motion.div>

      {/* Mobile view - show paragraphs below image */}
      <motion.div {...rise(0.55)} className="lg:hidden flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 mt-4 md:mt-6 space-y-3 md:space-y-4">
        <p className="text-sm md:text-base text-foreground leading-relaxed text-center">
          obsessed with understanding how{" "}
          <Highlighter action="highlight" color="#2563eb">
            <span className="font-bold">  things work  </span>
          </Highlighter>
          {" "}under the hood, from{" "}
          <Highlighter action="underline" color="#16a34a">
            <span className="font-bold text-black dark:text-black">  system internals  </span>
          </Highlighter>
          {" "}to{" "}
          <Highlighter action="highlight" color="#dc2626">
            <span className="font-bold">  intelligent software  </span>
          </Highlighter>
          .
        </p>
        <div className="text-sm md:text-base text-foreground leading-relaxed text-center flex flex-col">
          <span>
            Learning in public through{" "}
            <Highlighter action="underline" color="#16a34a">
              <span className="font-bold text-black dark:text-black">  open-source  </span>
            </Highlighter>
          </span>
          <span>
            <Highlighter action="underline" color="#16a34a">
              <span className="font-bold text-black dark:text-black">  contributions  </span>
            </Highlighter>
            <span className="hidden md:inline">{", "}</span>
            <span className="md:hidden">.</span>
          </span>
          <span className="hidden md:contents">
            <span>
              <Highlighter action="highlight" color="#2563eb">
                <span className="font-bold">  docs-first development  </span>
              </Highlighter>
              {", "}and{" "}
              <Highlighter action="underline" color="#dc2626">
                <span className="font-bold text-black dark:text-black">  hands-on  </span>
              </Highlighter>
            </span>
            <span>
              <Highlighter action="underline" color="#dc2626">
                <span className="font-bold text-black dark:text-black">  system building  </span>
              </Highlighter>
              .
            </span>
          </span>
        </div>
      </motion.div>

      {/* Social Icons - Mobile (original layout) */}
      <motion.div {...rise(0.7)} className="relative z-30 flex items-center justify-center flex-wrap gap-3 md:gap-4 mt-12 px-4 md:hidden">
        <SocialIcon type="github" url="https://github.com/Mudavath-Giri-Naik" />
        <SocialIcon type="linkedin" url="https://www.linkedin.com/in/giri-naik/" />
        <SocialIcon type="email" url="https://example.com/email" />
        <SocialIcon type="leetcode" url="https://leetcode.com/u/Mudavathgirinaik/" />
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-2 text-xs font-medium tracking-widest uppercase text-muted-foreground"
      >
        Scroll
        <span className="relative block w-px h-10 overflow-hidden bg-border">
          <motion.span
            className="absolute left-0 top-0 w-px h-4 bg-foreground"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>

      {/* Social Icons - Desktop (Magic UI Dock) */}
      <div className="hidden md:block">
        <Dock
          direction="top"
          className="top-4 z-[60] [&>div]:px-3 [&>div]:pb-2 [&>div]:pt-2 [&>div]:gap-3"
          iconSize={30}
          iconMagnification={42}
          iconDistance={140}
        >
          {socialIcons.map((item, idx) => (
            <DockIcon key={idx} href={item.href}>
              {item.iconPath ? (
                <img src={item.iconPath} alt={`${item.title} icon`} className="w-4 h-4 object-contain scale-[1.35]" />
              ) : (
                <span className="text-[10px] font-bold leading-none">R</span>
              )}
            </DockIcon>
          ))}
        </Dock>
      </div>

    </section>
  );
};

export default HeroSection;
