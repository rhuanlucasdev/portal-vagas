import { FiSearch } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Vagas" },
  { to: "/empresas", label: "Empresas" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/postar-vaga", label: "Postar Vaga" },
];

const Navbar = () => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="flex items-center justify-between gap-6 px-6 py-3">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-blue-900">
            VagaSul
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="border-b-2 border-transparent text-sm font-semibold text-slate-500 hover:border-blue-900 hover:text-blue-900"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="relative hidden md:block">
            <span className="sr-only">Buscar vagas</span>
            <FiSearch
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Buscar vagas..."
              className="w-64 rounded-full border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-900/40 focus:outline-none"
            />
          </label>

          <button
            type="button"
            className="cursor-pointer rounded-md bg-blue-900 px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-900/80"
          >
            Entrar
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
