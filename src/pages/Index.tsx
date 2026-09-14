import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import JourneySection from "@/components/JourneySection";
import FooterSection from "@/components/FooterSection";
import { GridBackground } from "@/components/GridBackground";
import { DotBackground } from "@/components/DotBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <GridBackground>
        <DotBackground>
          <Header />
          {/* Mobile-only spacer below fixed navbar */}
          <div className="h-11 md:hidden" />
          <HeroSection />
        </DotBackground>
      </GridBackground>
      <ProjectsSection />

      <JourneySection />

      {/* Placeholders for potentially future content so scrollspy has targets */}
      <div id="open-source" />
      <div id="blogs" />

      <FooterSection />
    </div>
  );
};

export default Index;
