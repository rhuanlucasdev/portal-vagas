import { Link } from "react-router-dom";

const links = [
  { to: "/sobre", label: "Sobre Nós" },
  { to: "/privacidade", label: "Privacidade" },
  { to: "/termos", label: "Termos de Uso" },
  { to: "/contato", label: "Contato" },
  { to: "/empresas", label: "Para Empresas" },
  { to: "/faq", label: "FAQ" },
];

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="page-container flex flex-col items-center gap-6 py-8 lg:flex-row lg:justify-between">
        <Link to="/" className="text-xl font-bold">
          VagaSul
        </Link>

        <nav aria-label="Rodapé" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-zinc-400">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-center text-sm text-zinc-400 lg:text-right">
          © {new Date().getFullYear()} VagaSul - Conectando talentos regionais.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
