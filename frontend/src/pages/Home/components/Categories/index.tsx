import {
  FiBarChart2,
  FiHeart,
  FiMonitor,
  FiShoppingBag,
} from "react-icons/fi";
import { LuFactory } from "react-icons/lu";
import { Link } from "react-router-dom";
import type { IconType } from "react-icons";

import { getJobCountByCategory } from "../../../../data/jobs";
import type { CategoryId } from "../../../../data/categories";

const featuredCategories: {
  id: CategoryId;
  title: string;
  icon: IconType;
}[] = [
  { id: "comercio-vendas", title: "Comércio", icon: FiShoppingBag },
  { id: "industria", title: "Indústria", icon: LuFactory },
  { id: "tecnologia", title: "Tecnologia", icon: FiMonitor },
  { id: "saude", title: "Saúde", icon: FiHeart },
  { id: "administracao", title: "Administração", icon: FiBarChart2 },
];

const Categories = () => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Encontre por área
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {featuredCategories.map((category) => {
          const count = getJobCountByCategory(category.id);
          const Icon = category.icon;

          return (
            <Link
              key={category.id}
              to={`/vagas?categoria=${category.id}`}
              className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-6 text-center transition-all duration-300 hover:border-blue-900/30 hover:bg-slate-100"
            >
              <Icon className="mb-2 h-6 w-6 text-blue-900" aria-hidden="true" />
              <span className="font-semibold text-blue-900">{category.title}</span>
              <span className="mt-1 text-sm text-slate-500">
                {count} {count === 1 ? "vaga" : "vagas"}
              </span>
            </Link>
          );
        })}

        <Link
          to="/vagas"
          className="flex min-h-32 items-center justify-center rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-6 text-center font-semibold text-blue-900 transition-all duration-300 hover:border-blue-900/30 hover:bg-slate-100"
        >
          Ver todas as áreas
        </Link>
      </div>
    </div>
  );
};

export default Categories;
