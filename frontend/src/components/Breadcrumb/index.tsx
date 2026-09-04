import { Link } from "react-router-dom";

const Breadcrumb = (props: { items: { label: string; href: string }[] }) => {
  const { items } = props;
  return (
    <nav
      className="flex flex-wrap items-center gap-2 text-xs text-zinc-700"
      aria-label="Navegação por caminhos"
    >
      <ol className="flex flex-nowrap lg:flex-wrap items-center overflow-x-scroll lg:overflow-x-visible text-nowrap">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li
              key={item.href}
              className={`hover:text-blue-900 after:content-['>'] after:mx-1 after:text-zinc-400 last:after:content-[''] ${isCurrent ? "font-bold text-blue-900" : ""}`}
            >
              <Link
                to={item.href}
                aria-current={isCurrent ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
