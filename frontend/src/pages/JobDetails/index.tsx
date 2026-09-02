import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Link, useParams } from "react-router-dom";
import {
  formatPostedAt,
  getJobById,
  getJobCategory,
  getJobCity,
  getSimilarJobs,
  isNewJob,
} from "../../data/jobs";
import { BiError } from "react-icons/bi";
import Breadcrumb from "../../components/Breadcrumb";
import {
  FaClipboardList,
  FaLocationDot,
  FaRegPaperPlane,
} from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import JobCard from "../../components/JobCard";

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-xl gap-4 text-center py-50">
      <div className="relative z-10 flex flex-col items-center justify-center text-xl gap-4 text-center">
        <BiError
          className="pointer-events-none absolute -left -top-30 h-32 w-32 text-yellow-400/30"
          aria-hidden="true"
        />
        <h1 className="text-4xl font-bold text-blue-800">
          Oops! Página não encontrada. :(
        </h1>
        <p className="text-zinc-700 text-lg">
          Parece que não encontramos a página que você procura. Volte para a{" "}
          <Link to="/" className="text-blue-900 hover:underline">
            página inicial
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

const JobDetails = () => {
  const { id } = useParams();
  const job = getJobById(id ?? "");
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 page-container py-6 md:py-8 bg-slate-50 min-w-screen">
        {!job ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4">
            <Breadcrumb
              items={[
                { label: "Vagas", href: "/vagas" },
                {
                  label: getJobCategory(job).name,
                  href: `/vagas?categoria=${job.categoryId}`,
                },
                { label: job.title, href: `/vagas/${job.id}` },
              ]}
            />
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="flex flex-col gap-2 border border-slate-200 rounded-md p-4 md:p-6 w-full md:min-w-0 bg-white">
                <h1>{job.title}</h1>
                <p>{job.company}</p>
                <p>{getJobCity(job).label.replace(" - ", ", ")}</p>
                <p>{job.salary}</p>
                <p>{job.modality}</p>
                <p>{job.type}</p>
                <p>{formatPostedAt(job.postedAt)}</p>
                {isNewJob(job) && <span>Nova</span>}
                <section className="flex flex-col gap-2">
                  <h2>Sobre a vaga</h2>
                  <p>{job.description}</p>
                </section>
                <section>
                  <h2>Requisitos</h2>
                  <ul>
                    {job.requirements.map((requirement) => (
                      <li key={requirement}>{requirement}</li>
                    ))}
                  </ul>
                </section>
              </div>
              <aside className="flex flex-col gap-4 border border-slate-200 rounded-md p-4 md:p-6 w-full lg:w-1/3 xl:w-1/4 max-h-fit bg-white">
                <h2>Resumo da vaga</h2>
                <div className="flex items-center  gap-4">
                  <span className="w-10 h-10 rounded-full bg-blue-900/10 text-blue-900 flex items-center justify-center">
                    <FaLocationDot className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col">
                    <p className="text-xs text-zinc-500">Localização</p>
                    <p className="text-sm text-zinc-900 font-medium">
                      {getJobCity(job).label} ({job.modality})
                    </p>
                  </div>
                </div>
                <div className="flex items-center  gap-4">
                  <span className="w-10 h-10 rounded-full bg-blue-900/10 text-blue-900 flex items-center justify-center">
                    <FaClipboardList className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col">
                    <p className="text-xs text-zinc-500">Contrato</p>
                    <p className="text-sm text-zinc-900 font-medium">
                      {job.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center  gap-4">
                  <span className="w-10 h-10 rounded-full bg-blue-900/10 text-blue-900 flex items-center justify-center">
                    <MdOutlineAttachMoney
                      className="w-4 h-4"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="flex flex-col">
                    <p className="text-xs text-zinc-500">Salário</p>
                    <p className="text-sm text-zinc-900 font-medium">
                      {job.salary}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/vagas/${job.id}/apply`}
                    className="bg-blue-900 text-white hover:bg-blue-900/80 transition-all duration-300 px-4 py-3 rounded-md text-sm font-medium flex items-center gap-2 justify-center"
                  >
                    <FaRegPaperPlane className="w-4 h-4" aria-hidden="true" />
                    Quero me candidatar
                  </Link>
                  <button className="bg-slate-50 text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white transition-all duration-300 px-4 py-3 rounded-md text-sm font-medium flex items-center gap-2 justify-center cursor-pointer">
                    <CiBookmark className="w-5 h-5" aria-hidden="true" />
                    Salvar vaga
                  </button>
                </div>
              </aside>
            </div>
            <div>
              <h2>Vagas similares</h2>
              <div>
                {getSimilarJobs(job, 3).map((similar) => (
                  <JobCard key={similar.id} job={similar} variant="listing" />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default JobDetails;
