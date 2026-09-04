import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Categories from "./components/Categories";
import CompanyCTA from "./components/CompanyCTA";
import FeaturedJobs from "./components/FeaturedJobs";
import Hero from "./components/Hero";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <section className="bg-slate-50 py-8 md:py-10 lg:py-12">
        <div className="page-container">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">
            <div className="min-w-0 flex-1">
              <FeaturedJobs />
            </div>
            <div className="w-full lg:max-w-sm lg:shrink-0 flex flex-col gap-10">
              <Categories />
              <CompanyCTA />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
