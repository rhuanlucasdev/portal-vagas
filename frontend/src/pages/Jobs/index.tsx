import { useEffect, useRef, useState, type FormEvent } from "react";
import { FiChevronLeft, FiChevronRight, FiSearch, FiSliders } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

import Footer from "../../components/Footer";
import JobCard from "../../components/JobCard";
import JobCardSkeleton from "../../components/JobCard/Skeleton";
import Navbar from "../../components/Navbar";
import { categories, isCategoryId, type CategoryId } from "../../data/categories";
import { isCityId, type CityId } from "../../data/cities";
import { filterJobs } from "../../data/jobs";
import { useMockLoading } from "../../hooks/useMockLoading";
import Filters from "./components/Filters";

const PAGE_SIZE = 5;
const FILTERS_DRAWER_MS = 300;

function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersMounted, setFiltersMounted] = useState(false);
  const [filtersEntered, setFiltersEntered] = useState(false);
  const filtersClosingRef = useRef(false);
  const query = searchParams.get("q") ?? "";
  const [searchDraft, setSearchDraft] = useState(query);
  const [syncedQuery, setSyncedQuery] = useState(query);

  if (query !== syncedQuery) {
    setSyncedQuery(query);
    setSearchDraft(query);
  }

  const openFilters = () => {
    filtersClosingRef.current = false;
    setFiltersMounted(true);
  };

  const closeFilters = () => {
    filtersClosingRef.current = true;
    setFiltersEntered(false);
  };

  useEffect(() => {
    if (!filtersMounted) return;

    let innerFrame = 0;
    const outerFrame = window.requestAnimationFrame(() => {
      innerFrame = window.requestAnimationFrame(() => {
        if (!filtersClosingRef.current) setFiltersEntered(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(outerFrame);
      window.cancelAnimationFrame(innerFrame);
    };
  }, [filtersMounted]);

  useEffect(() => {
    if (!filtersMounted || filtersEntered || !filtersClosingRef.current) return;

    const timeoutId = window.setTimeout(() => {
      setFiltersMounted(false);
      filtersClosingRef.current = false;
    }, FILTERS_DRAWER_MS);

    return () => window.clearTimeout(timeoutId);
  }, [filtersMounted, filtersEntered]);

  useEffect(() => {
    if (!filtersMounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFilters();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [filtersMounted]);

  const cityParam = searchParams.get("cidade");
  const cityId = cityParam && isCityId(cityParam) ? cityParam : undefined;
  const categoryIds = searchParams.getAll("categoria").filter(isCategoryId);
  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const loading = useMockLoading(searchParams.toString());

  const filtered = filterJobs({ query, cityId, categoryIds });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageJobs = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const setParams = (mutate: (params: URLSearchParams) => void, resetPage = true) => {
    const next = new URLSearchParams(searchParams);
    mutate(next);
    if (resetPage) {
      next.delete("page");
    }
    setSearchParams(next);
  };

  const handleCityChange = (nextCity?: CityId) => {
    setParams((params) => {
      if (nextCity) {
        params.set("cidade", nextCity);
      } else {
        params.delete("cidade");
      }
    });
  };

  const handleToggleCategory = (categoryId: CategoryId) => {
    setParams((params) => {
      const selected = params.getAll("categoria").filter(isCategoryId);
      params.delete("categoria");
      const next = selected.includes(categoryId)
        ? selected.filter((id) => id !== categoryId)
        : [...selected, categoryId];
      for (const id of next) {
        params.append("categoria", id);
      }
    });
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setParams((params) => {
      const value = searchDraft.trim();
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
    });
  };

  const goToPage = (nextPage: number) => {
    setParams((params) => {
      if (nextPage <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(nextPage));
      }
    }, false);
  };

  const heading =
    categoryIds.length === 1
      ? `Vagas em ${categories.find((category) => category.id === categoryIds[0])?.name}`
      : categoryIds.length > 1
        ? "Vagas filtradas"
        : "Todas as vagas";

  const filters = (
    <Filters
      cityId={cityId}
      categoryIds={categoryIds}
      onCityChange={handleCityChange}
      onToggleCategory={handleToggleCategory}
    />
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-slate-50 py-6 md:py-8">
        <div className="page-container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <div className="hidden w-full max-w-xs shrink-0 lg:block">{filters}</div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0">
                  <h1 className="text-xl font-bold wrap-break-word text-slate-900 md:text-2xl">{heading}</h1>
                  <p className="mt-1 text-sm text-slate-500">
                    {loading
                      ? "Carregando vagas..."
                      : `${filtered.length} ${
                          filtered.length === 1
                            ? "vaga encontrada"
                            : "vagas encontradas"
                        }`}
                  </p>
                </div>

                <form onSubmit={handleSearch} className="flex w-full min-w-0 gap-2 md:max-w-sm">
                  <label className="relative min-w-0 flex-1">
                    <span className="sr-only">Buscar cargo</span>
                    <FiSearch
                      className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    />
                    <input
                      type="search"
                      value={searchDraft}
                      onChange={(event) => setSearchDraft(event.target.value)}
                      placeholder="Buscar cargo..."
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-3 pl-9 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-900/40 focus:outline-none"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={openFilters}
                    className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 lg:hidden"
                    aria-label="Abrir filtros"
                  >
                    <FiSliders className="h-5 w-5" aria-hidden="true" />
                  </button>
                </form>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                {loading ? (
                  Array.from({ length: PAGE_SIZE }, (_, index) => (
                    <JobCardSkeleton key={index} variant="listing" />
                  ))
                ) : pageJobs.length === 0 ? (
                  <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                    Nenhuma vaga encontrada com esses filtros.
                  </p>
                ) : (
                  pageJobs.map((job) => (
                    <JobCard key={job.id} job={job} variant="listing" />
                  ))
                )}
              </div>

              {!loading && filtered.length > 0 && (
                <nav
                  aria-label="Paginação"
                  className="mt-8 flex flex-wrap items-center justify-center gap-1 md:gap-2"
                >
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 md:size-10"
                    aria-label="Página anterior"
                  >
                    <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => goToPage(pageNumber)}
                        aria-current={pageNumber === currentPage ? "page" : undefined}
                        className={`size-9 cursor-pointer rounded-lg text-sm font-medium md:size-10 ${
                          pageNumber === currentPage
                            ? "bg-blue-900 text-white"
                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 md:size-10"
                    aria-label="Próxima página"
                  >
                    <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              )}
            </div>
          </div>
        </div>
      </main>

      {filtersMounted && (
        <div
          className={`fixed inset-0 z-60 w-full overflow-y-auto bg-white transition-transform duration-300 ease-out lg:hidden ${
            filtersEntered ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Filtros"
        >
          <Filters
            cityId={cityId}
            categoryIds={categoryIds}
            onCityChange={handleCityChange}
            onToggleCategory={handleToggleCategory}
            onClose={closeFilters}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Jobs;
