import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {
  formatPostedAt,
  getCompanyInitials,
  getJobById,
  getJobCategory,
  getJobCity,
  isCompanyVerified,
} from "../../data/jobs";
import NotFound from "../NotFound";
import Breadcrumb from "../../components/Breadcrumb";
import FormCard from "./components/FormCard";
import { IoMdSend } from "react-icons/io";
import { CiBookmark, CiCircleQuestion } from "react-icons/ci";
import { FaClock, FaMoneyBillWave } from "react-icons/fa6";
import { GoVerified } from "react-icons/go";
import { FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
import { BsBriefcase, BsGraphUpArrow } from "react-icons/bs";
import { IoBulbOutline } from "react-icons/io5";
import { submitApplication } from "./hooks/submitApplication";
import SuccessModal from "./components/SuccessModal";

function fieldValue(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

const JobApply = () => {
  const { id } = useParams();
  const job = getJobById(id ?? "");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!job || status === "loading") return;

    const data = new FormData(event.currentTarget);
    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await submitApplication({
        jobId: job.id,
        name: fieldValue(data, "name"),
        email: fieldValue(data, "email"),
        phone: fieldValue(data, "phone"),
        residence: fieldValue(data, "residence"),
        curriculumSource: fieldValue(data, "curriculumSource"),
        salary: fieldValue(data, "salary"),
        availability: fieldValue(data, "availability"),
        presentation: fieldValue(data, "presentation"),
        linkedin: fieldValue(data, "linkedin") || null,
        github: fieldValue(data, "github") || null,
        terms: data.get("terms") === "on",
        notifications: data.get("notifications") === "on",
      });
      setApplicationId(result.id);
      setStatus("success");
      setSuccessModalOpen(true);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a candidatura. Tente de novo.",
      );
    }
  }

  useEffect(() => {
    if (!job) {
      document.title = "Vaga não encontrada | VagaSul";
      return;
    }
    document.title = `Candidatura — ${job.title} | VagaSul`;
  }, [job]);

  if (!job) return <NotFound />;

  const isSubmitting = status === "loading";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="page-container min-h-screen py-6 md:py-8">
        <Breadcrumb
          items={[
            { label: "Vagas", href: "/vagas" },
            {
              label: getJobCategory(job).name,
              href: `/vagas?categoria=${job.categoryId}`,
            },
            { label: job.title, href: `/vagas/${id}` },
            { label: "Candidatar-se", href: `/vagas/${id}/apply` },
          ]}
        />
        <div className="mt-4 flex min-w-0 flex-col gap-4 lg:mt-5 lg:flex-row lg:items-start lg:gap-5 xl:gap-8">
          <div className="order-2 flex min-w-0 w-full flex-1 flex-col gap-1 lg:order-1">
            <h1 className="text-base font-semibold text-slate-900 md:text-xl lg:text-xl xl:text-2xl">
              Candidate-se para esta vaga
            </h1>
            <p className="text-xs text-slate-600 md:text-sm">
              Preencha os dados abaixo para a equipe de RH da{" "}
              <span className="font-semibold text-slate-900">
                {job.company}
              </span>{" "}
              analisar seu perfil.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mt-6 flex flex-col gap-3 md:mt-8 md:gap-4">
                <FormCard variant="1" jobId={job.id} />
                <FormCard variant="2" jobId={job.id} />
                <FormCard variant="3" jobId={job.id} />
              </div>
              <div className="mt-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-100 p-3 md:mt-8 md:gap-4 md:p-4">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    required
                    className="mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-slate-800 md:text-sm"
                  >
                    Concordo em compartilhar meus dados com a{" "}
                    <span className="font-semibold text-blue-900">
                      {job.company}
                    </span>{" "}
                    para este processo seletivo, conforme a{" "}
                    <Link
                      to="/politica-de-privacidade"
                      className="text-blue-900 transition-colors hover:text-blue-950 hover:underline"
                    >
                      Política de Privacidade do VagaSul
                    </Link>{" "}
                    e a LGPD.
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="notifications"
                    id="notifications"
                    className="mt-1"
                  />
                  <label
                    htmlFor="notifications"
                    className="text-xs text-slate-800 md:text-sm"
                  >
                    Quero notificações por WhatsApp e e-mail sobre o status
                    desta candidatura.
                  </label>
                </div>
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                >
                  {errorMessage}
                </p>
              )}

              <div className="mt-8 flex flex-col justify-between gap-3 pl-0 md:mt-10 md:flex-row md:items-center md:gap-4 md:pl-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 md:gap-8">
                  <Link
                    to={`/vagas/${job.id}`}
                    className="cursor-pointer text-center text-xs text-slate-800 transition-colors hover:underline md:text-sm"
                  >
                    Cancelar
                  </Link>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1 text-xs text-slate-800 transition-colors hover:bg-slate-200 md:text-sm"
                  >
                    <CiBookmark
                      className="h-4 w-4 text-slate-900"
                      aria-hidden="true"
                    />
                    Salvar rascunho
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || status === "success"}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-950 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto md:py-3.5"
                >
                  {isSubmitting ? "Enviando..." : "Enviar candidatura"}
                  {!isSubmitting && (
                    <IoMdSend
                      className="h-4 w-4 text-white"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </form>
          </div>

          <aside className="order-1 w-full shrink-0 lg:order-2 lg:sticky lg:top-5 lg:w-72 lg:max-h-fit xl:w-80">
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 md:gap-4 md:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-slate-900 md:text-base">
                  Resumo da vaga
                </h2>
                <span className="flex items-center gap-1.5 rounded-full bg-green-300/80 px-2 py-0.5 text-xs text-green-900">
                  <FaClock
                    className="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  {formatPostedAt(job.postedAt)}
                </span>
              </div>
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-blue-900 text-sm font-bold text-white md:h-12 md:w-12 md:text-lg">
                  {getCompanyInitials(job.company)}
                </span>
                <div className="flex min-w-0 flex-col gap-px">
                  <span className="truncate text-sm font-bold text-slate-900 md:text-base">
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                    <GoVerified
                      className="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    {isCompanyVerified()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-medium text-blue-900 md:text-base">
                    {job.title}
                  </h3>
                  <p className="line-clamp-3 text-xs text-zinc-500 md:text-sm">
                    {job.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-800 md:text-sm">
                    <FaMoneyBillWave
                      className="h-3.5 w-3.5 shrink-0 text-slate-500"
                      aria-hidden="true"
                    />
                    {job.salary}
                    <span className="text-xs font-medium text-slate-500">
                      / mês
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-800 md:text-sm">
                    <FaMapMarkerAlt
                      className="h-3.5 w-3.5 shrink-0 text-slate-500"
                      aria-hidden="true"
                    />
                    {getJobCity(job).label}{" "}
                    <span className="text-xs font-medium text-slate-500">
                      ({job.modality})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-800 md:text-sm">
                    <BsBriefcase
                      className="h-3.5 w-3.5 shrink-0 text-slate-500"
                      aria-hidden="true"
                    />
                    {job.type}
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {job.requirements.slice(0, 4).map((requirement) => (
                      <li key={requirement}>
                        <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">
                          {requirement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 rounded-xl border border-blue-800/40 bg-blue-500/20 p-3 md:mt-6 md:p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-blue-900 md:text-base">
                <IoBulbOutline
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                Dica VagaSul
              </h3>
              <p className="text-xs text-blue-900 md:text-sm">
                Candidaturas com <strong>carta personalizada</strong> e{" "}
                <strong>WhatsApp ativo</strong> têm{" "}
                <strong>mais chances</strong> de retorno rápido nas empresas da
                região.
              </p>
              <span className="flex items-center gap-2 text-xs font-medium text-blue-900 md:text-sm">
                <BsGraphUpArrow
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
                Alta taxa de resposta nesta empresa
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-200/80 p-3 md:mt-6 md:p-4">
              <div className="flex items-center gap-2">
                <FaShieldAlt
                  className="h-4 w-4 text-slate-700"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-bold text-slate-800 md:text-base">
                  Privacidade
                </h3>
              </div>
              <p className="text-xs text-slate-800 md:text-sm">
                Seus dados são usados apenas pelo time seletivo autorizado desta
                vaga.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 md:mt-6 md:p-4">
              <CiCircleQuestion
                className="h-5 w-5 shrink-0 text-slate-700"
                aria-hidden="true"
              />
              <p className="text-xs text-slate-800 md:text-sm">
                Dúvidas sobre o processo?
              </p>
              <Link
                to="/suporte"
                className="text-xs text-blue-900 transition-colors hover:underline md:text-sm"
              >
                Fale com o suporte
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <SuccessModal
        open={successModalOpen}
        jobTitle={job.title}
        company={job.company}
        applicationId={applicationId}
        onClose={() => setSuccessModalOpen(false)}
      />
      <Footer />
    </div>
  );
};

export default JobApply;
