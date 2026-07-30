import Hero from "@/components/hero/Hero";
import CommandPalette from "@/components/nav/CommandPalette";
import HudRail from "@/components/nav/HudRail";
import About from "@/components/sections/About";
import Awards from "@/components/sections/Awards";
import Capabilities from "@/components/sections/Capabilities";
import Contact from "@/components/sections/Contact";
import Exhibitions from "@/components/sections/Exhibitions";
import FieldLog from "@/components/sections/FieldLog";
import Footer from "@/components/sections/Footer";
import Labs from "@/components/sections/Labs";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Search from "@/components/sections/Search";
import Signal from "@/components/sections/Signal";
import TechArsenal from "@/components/sections/TechArsenal";
import Timeline from "@/components/sections/Timeline";
import BackgroundMusic from "@/components/ui/BackgroundMusic";
import ScrollCue from "@/components/ui/ScrollCue";

export default function Home() {
  return (
    <>
      <HudRail />
      <CommandPalette />
      <BackgroundMusic />
      <ScrollCue />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Capabilities />
        <Labs />
        <Projects />
        <TechArsenal />
        <Research />
        <Exhibitions />
        <FieldLog />
        <Awards />
        <Signal />
        <Search />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
