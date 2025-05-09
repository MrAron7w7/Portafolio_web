import About from "@/components/portfolio/About";
import ContactMe from "@/components/portfolio/ContactMe";
import Footer from "@/components/portfolio/Footer";
import Hero from "@/components/portfolio/Hero";
import Navbar from "@/components/portfolio/Navbar";
import Projects from "@/components/portfolio/Projects";

const sections = [Navbar, Hero, About, Projects, ContactMe, Footer];

export default function Home() {
  return (
    <main>
      {sections.map((SectionComponent, index) => (
        <section key={index}>
          <SectionComponent />
        </section>
      ))}
    </main>
  );
}
