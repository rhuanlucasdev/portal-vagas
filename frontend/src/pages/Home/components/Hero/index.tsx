import heroBg from "../../../../assets/hero_bg.jpeg";
import SearchBar from "../../../../components/SearchBar";

const Hero = () => {
  return (
    <section
      className="relative border-b border-slate-200 bg-cover bg-center py-20"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div
        className="absolute inset-0 bg-linear-to-t from-white to-white/30"
        aria-hidden="true"
      />

      <div className="page-container relative flex flex-col items-center justify-center text-center">
        <h1 className="max-w-xl text-2xl font-bold text-slate-900">
          Encontre uma oportunidade perto de você
        </h1>
        <p className="mt-3 max-w-lg text-md text-slate-600">
          Conectando talentos regionais às melhores empresas da região. Descubra
          sua próxima grande oportunidade hoje mesmo.
        </p>

        <div className="mt-8 w-full flex justify-center">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default Hero;
