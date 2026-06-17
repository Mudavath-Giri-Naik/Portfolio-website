import developerImage from "@/assets/developer-person.png";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Highlighter } from "@/components/ui/highlighter";
import { BackgroundLines } from "@/components/ui/background-lines";
import SocialIcon from "./SocialIcon";

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
      type: "kaggle",
      title: "Kaggle",
      iconPath: "/kaggle.png",
      href: "https://www.kaggle.com/girish1133",
    },
    {
      type: "huggingface",
      title: "Hugging Face",
      iconPath: "/hug.png",
      href: "https://huggingface.co/GiriNaik",
    },
    {
      type: "leetcode",
      title: "LeetCode",
      iconPath: "/leetcode.png",
      href: "https://leetcode.com/u/nayakhh/",
    },
    {
      type: "vercel",
      title: "Vercel",
      iconPath: "/vercel.png",
      href: "https://vercel.com/giri-naiks-projects-9e92c779",
    },


    {
      type: "twitter",
      title: "Twitter",
      iconPath: "/twitter.png",
      href: "https://x.com/giri_nayakh",
    },
    {
      type: "researchgate",
      title: "ResearchGate",
      iconPath: "/researchgate.png",
      href: "https://www.researchgate.net/profile/Giri-Naik-2?ev=hdr_xprf",
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 md:pt-28 lg:pt-32 px-4">
      {/* Background Text - behind image */}
      <BackgroundLines className="absolute inset-0 z-0 pointer-events-none select-none -mt-24 md:-mt-8 lg:mt-0">
        <div className="flex flex-col items-center justify-center px-2 h-full pt-0 -mt-10 md:pt-48 lg:pt-60">
          <h1 className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem] font-black leading-none tracking-tight text-hero-primary text-center dark:font-extrabold dark:tracking-[-0.02em]">
            Student
          </h1>
          <h1 className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem] font-black leading-none tracking-tight text-hero-secondary -mt-4 sm:-mt-6 md:-mt-10 lg:-mt-14 text-center dark:font-extrabold dark:tracking-[-0.02em]">
            Developer
          </h1>
        </div>
      </BackgroundLines>

      {/* Text Content Section - Top */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4">
        {/* First Paragraph - above image (all screens) */}
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto -mt-8 md:mt-0 mb-2 md:mb-3">
          <p className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed text-center">
            Final Year{" "}
            <Highlighter action="underline" color="#ff0022">
              <span className="font-bold text-black dark:text-black">  Computer Science  </span>
            </Highlighter>
            {" "}student with full-stack experience, 12+{" "}
            <Highlighter action="highlight" color="#16a34a">
              <span className="font-bold">  hackathons  </span>
            </Highlighter>
            {", "}5K+ LinkedIn{" "}
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
                <Highlighter action="highlight" color="#16a34a">
                  <span className="font-bold">  open-source contributions  </span>
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
      </div>

      {/* Developer Image - on top of background text */}
      <div className="relative z-20 flex items-center justify-center w-full mt-4 md:-mt-12 lg:-mt-24">
        <img
          src={developerImage}
          alt="Student Developer working on laptop"
          className="h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] object-contain"
        />
      </div>

      {/* Mobile view - show paragraphs below image */}
      <div className="lg:hidden flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 mt-4 md:mt-6 space-y-3 md:space-y-4">
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
            <Highlighter action="highlight" color="#16a34a">
              <span className="font-bold">  open-source  </span>
            </Highlighter>
          </span>
          <span>
            <Highlighter action="highlight" color="#16a34a">
              <span className="font-bold">  contributions  </span>
            </Highlighter>
            {", "}
          </span>
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
        </div>
      </div>

      {/* Social Icons - Mobile (original layout) */}
      <div className="relative z-30 flex items-center justify-center flex-wrap gap-3 md:gap-4 mt-8 px-4 md:hidden">
        <SocialIcon type="github" url="https://github.com/Mudavath-Giri-Naik" />
        <SocialIcon type="linkedin" url="https://www.linkedin.com/in/giri-naik/" />
        <SocialIcon type="email" url="https://example.com/email" />
        <SocialIcon type="kaggle" url="https://example.com/kaggle" />
        <SocialIcon type="huggingface" url="https://example.com/huggingface" />
        <SocialIcon type="leetcode" url="https://example.com/leetcode" />
        <SocialIcon type="vercel" url="https://example.com/vercel" />
        <SocialIcon type="render" url="https://example.com/render" />
        <SocialIcon type="twitter" url="https://example.com/twitter" />
        <SocialIcon type="researchgate" url="https://example.com/researchgate" />
      </div>

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
