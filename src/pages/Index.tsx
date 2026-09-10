import Hero from "../components/Hero";
import ProblemSolution from "../components/ProblemSolution";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import JourneyAtGlance from "../components/JourneyAtGlance";
import JourneyMap from "../components/JourneyMap";
import FinalCTA from "../components/FinalCTA";

const Index = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f4ec]">
      <Hero />

      <ProblemSolution />

      <Features />

      <HowItWorks />

      <JourneyAtGlance />

      <JourneyMap />

      <FinalCTA />
    </main>
  );
};

export default Index;
