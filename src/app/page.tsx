import Hero from "@/components/hero/Hero";
import HudRail from "@/components/nav/HudRail";
import Contact from "@/components/sections/Contact";
import CredibilityLayer from "@/components/sections/CredibilityLayer";
import ProfileProof from "@/components/sections/ProfileProof";
import SelectedWork from "@/components/sections/SelectedWork";

export default function Home() {
  return (
    <>
      <HudRail />
      <main>
        <Hero />
        <ProfileProof />
        <SelectedWork />
        <CredibilityLayer />
        <Contact />
      </main>
    </>
  );
}
