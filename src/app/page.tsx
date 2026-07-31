import Hero from "@/components/hero/Hero";
import HudRail from "@/components/nav/HudRail";
import About from "@/components/sections/About";
import Awards from "@/components/sections/Awards";
import Capabilities from "@/components/sections/Capabilities";
import Contact from "@/components/sections/Contact";
import Exhibitions from "@/components/sections/Exhibitions";
import FieldLog from "@/components/sections/FieldLog";
import Footer from "@/components/sections/Footer";
import Laboratories from "@/components/sections/Laboratories";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Search from "@/components/sections/Search";
import Signal from "@/components/sections/Signal";
import TechArsenal from "@/components/sections/TechArsenal";
import Timeline from "@/components/sections/Timeline";

export default function Home() {
  return (
    <>
      <HudRail />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Capabilities />
        <Laboratories />
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
