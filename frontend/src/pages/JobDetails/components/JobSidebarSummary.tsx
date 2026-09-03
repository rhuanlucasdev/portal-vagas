import { Link } from "react-router-dom";
import {
  getJobCity,
  type Job,
} from "../../../data/jobs";
import { FaClipboardList, FaLocationDot, FaRegPaperPlane } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";

type JobSidebarSummaryProps = {
  job: Job;
};

const JobSidebarSummary = ({ job }: JobSidebarSummaryProps) => {
  return (
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
  );
};

export default JobSidebarSummary;

