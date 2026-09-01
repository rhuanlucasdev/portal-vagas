import { type FormEvent, useEffect, useState } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const links = [
  { to: "/vagas", label: "Vagas" },
  { to: "/empresas", label: "Empresas" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/postar-vaga", label: "Postar Vaga" },
];

function vagasQueryFromLocation(pathname: string, search: string) {
  if (pathname !== "/vagas") return undefined;
  return new URLSearchParams(search).get("q") ?? "";
}

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlQuery = vagasQueryFromLocation(location.pathname, location.search);
  const [term, setTerm] = useState(urlQuery ?? "");
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);
  const [menuOpen, setMenuOpen] = useState(false);

  if (urlQuery !== undefined && urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery);
    setTerm(urlQuery);
  } else if (urlQuery === undefined && syncedQuery !== undefined) {
    setSyncedQuery(undefined);
  }

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(
      location.pathname === "/vagas" ? location.search : "",
    );
    const query = term.trim();
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    params.delete("page");
    const qs = params.toString();
    setMenuOpen(false);
    navigate(qs ? `/vagas?${qs}` : "/vagas");
  };

  const searchField = (inputId: string) => (
    <form onSubmit={handleSearch} className="relative w-full lg:w-auto">
      <label htmlFor={inputId} className="sr-only">
        Buscar vagas
      </label>
      <button
        type="submit"
        className="absolute top-1/2 left-3.5 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-blue-900"
        aria-label="Buscar vagas"
      >
        <FiSearch className="h-4 w-4" aria-hidden="true" />
      </button>
      <input
        id={inputId}
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Buscar vagas..."
        className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-900/40 focus:outline-none lg:w-64"
      />
    </form>
  );

  return (
    <header className="relative z-50 border-b border-slate-200 bg-white">
      <nav className="page-container flex items-center justify-between gap-3 py-3 lg:gap-6">
        <div className="flex min-w-0 items-center gap-8">
          <Link to="/" className="shrink-0 text-2xl font-bold text-blue-900">
            VagaSul
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `border-b-2 py-1 text-sm font-semibold ${
                    isActive
                      ? "border-blue-900 text-blue-900"
                      : "border-transparent text-slate-500 hover:border-blue-900 hover:text-blue-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:gap-4">
          <div className="hidden lg:block">{searchField("header-search")}</div>

          <button
            type="button"
            className="cursor-pointer rounded-md bg-blue-900 px-3 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-900/80 md:px-4 lg:px-6"
          >
            Entrar
          </button>

          <button
            type="button"
            className="flex size-10 cursor-pointer items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <FiX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <FiMenu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="border-t border-slate-200 bg-white lg:hidden"
        >
          <div className="page-container flex flex-col gap-4 py-4">
            {searchField("header-search-mobile")}

            <div className="flex flex-col">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `border-b border-slate-100 py-3 text-sm font-semibold ${
                      isActive ? "text-blue-900" : "text-slate-600"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
