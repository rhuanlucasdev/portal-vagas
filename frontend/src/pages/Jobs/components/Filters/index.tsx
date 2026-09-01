import { FiX } from "react-icons/fi";

import { categories, type CategoryId } from "../../../../data/categories";
import { cities, type CityId } from "../../../../data/cities";

type FiltersProps = {
  cityId?: CityId;
  categoryIds: CategoryId[];
  onCityChange: (cityId?: CityId) => void;
  onToggleCategory: (categoryId: CategoryId) => void;
  onClose?: () => void;
};

const Filters = ({
  cityId,
  categoryIds,
  onCityChange,
  onToggleCategory,
  onClose,
}: FiltersProps) => {
  return (
    <aside
      className={
        onClose
          ? "flex min-h-full flex-col bg-white p-4"
          : "rounded-xl border border-slate-200 bg-white p-4"
      }
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900">Filtros</h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Fechar filtros"
          >
            <FiX className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">Cidade</span>
        <select
          value={cityId ?? ""}
          onChange={(event) => {
            const value = event.target.value;
            onCityChange(value === "" ? undefined : (value as CityId));
          }}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-900/40 focus:outline-none"
        >
          <option value="">Todas as cidades</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.label}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-medium text-slate-700">Área</legend>
        <ul className="flex flex-col gap-2">
          {categories.map((category) => (
            <li key={category.id}>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={categoryIds.includes(category.id)}
                  onChange={() => onToggleCategory(category.id)}
                  className="size-4 rounded border-slate-300 text-blue-900 accent-blue-900"
                />
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </aside>
  );
};

export default Filters;
