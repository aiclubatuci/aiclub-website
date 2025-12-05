<<<<<<< Updated upstream
import LandingPage from "@/Landing";

export default function Home() {
  return (
    <div>
      <LandingPage />
    </div>
=======
import Landing from "../Landing";
import ContactSection from "../ContactSection";

export default function Home() {
  return (
    <main>
      <Landing/>
      <ContactSection/>
    </main>
>>>>>>> Stashed changes
  );
}
