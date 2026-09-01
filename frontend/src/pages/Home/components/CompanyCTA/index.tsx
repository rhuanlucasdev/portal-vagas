import { BsBuildings } from "react-icons/bs";

const CompanyCTA = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-blue-900 p-6 text-white">
      <div className="relative z-10 flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Para Empresas</h3>
        <p className="text-sm">
          Encontre os melhores talentos da nossa região. Anuncie suas vagas e
          gerencie candidatos de forma simples e eficiente.
        </p>
        <a
          href="/empresa/postar-vaga"
          className="block cursor-pointer bg-white px-4 py-2 text-center font-bold text-blue-900"
        >
          Postar uma Vaga
        </a>
      </div>

      <BsBuildings
        className="pointer-events-none absolute -right-2 -bottom-2 h-28 w-28 text-white/15"
        aria-hidden="true"
      />
    </div>
  );
};

export default CompanyCTA;
