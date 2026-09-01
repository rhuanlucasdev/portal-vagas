import { useEffect, useRef, useState, type FormEvent } from "react";
import { FiBriefcase, FiChevronDown, FiMapPin, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { cities, type City } from "../../data/cities";

const SearchBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCityOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!cityDropdownRef.current?.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCityOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isCityOpen]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const term = keyword.trim();
    if (term) params.set("q", term);
    if (selectedCity) params.set("cidade", selectedCity.id);
    const query = params.toString();
    navigate(query ? `/vagas?${query}` : "/vagas");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-md flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm md:max-w-3xl md:flex-row md:items-center md:gap-0 md:p-2 md:pl-4"
    >
      <label className="relative block md:min-w-0 md:flex-1">
        <span className="sr-only">Cargo, empresa ou palavra-chave</span>
        <FiBriefcase
          className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400 md:left-0"
          aria-hidden="true"
        />
        <input
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Cargo, empresa ou palavra-chave"
          className="w-full rounded-lg border border-slate-200 py-3 pr-3 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-900/40 focus:outline-none md:rounded-none md:border-0 md:py-2 md:pl-7 md:focus:border-0"
        />
      </label>

      <div
        className="hidden h-8 w-px shrink-0 bg-slate-200 md:mx-3 md:block"
        aria-hidden="true"
      />

      <div ref={cityDropdownRef} className="relative md:min-w-0 md:flex-1">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isCityOpen}
          onClick={() => setIsCityOpen((open) => !open)}
          className="flex w-full items-center rounded-lg border border-slate-200 bg-white py-3 pr-3 pl-10 text-left text-sm md:rounded-none md:border-0 md:py-2 md:pl-7"
        >
          <FiMapPin
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400 md:left-0"
            aria-hidden="true"
          />
          <span
            className={
              selectedCity
                ? "flex-1 truncate text-slate-700"
                : "flex-1 truncate text-slate-400"
            }
          >
            {selectedCity?.label ?? "Cidade ou região"}
          </span>
          <FiChevronDown
            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isCityOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>

        {isCityOpen && (
          <ul
            role="listbox"
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-md"
          >
            {cities.map((city) => (
              <li key={city.id} role="option" aria-selected={selectedCity?.id === city.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCity(city);
                    setIsCityOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${
                    selectedCity?.id === city.id
                      ? "font-medium text-blue-900"
                      : "text-slate-700"
                  }`}
                >
                  {city.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-900 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-900/80 md:ml-2 md:w-auto md:shrink-0 md:px-5"
      >
        <FiSearch className="h-4 w-4" aria-hidden="true" />
        Buscar Vagas
      </button>
    </form>
  );
};

export default SearchBar;
