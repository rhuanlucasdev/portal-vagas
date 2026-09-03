import {
  getCompanyInitials,
  getJobCity,
  type Job,
} from "../../../data/jobs";
import { IoShareSocialOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";

type JobHeaderProps = {
  job: Job;
};

const JobHeader = ({ job }: JobHeaderProps) => {
  const cityLabel = getJobCity(job).label.replace(" - ", ", ");

  return (
    <div className="flex items-center gap-2 justify-between">
      <div className="flex items-start md:items-center gap-2 md:gap-4 mb-5 min-w-0 flex-1">
        <span className="w-12 h-12 md:w-20 md:h-20 rounded-md bg-blue-900/10 text-blue-900 flex items-center justify-center text-xl md:text-2xl font-bold border border-blue-900/10 shrink-0">
          {getCompanyInitials(job.company)}
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="text-xl font-bold wrap-break-word text-zinc-900 md:text-3xl">
            {job.title}
          </h1>
          <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
            <span className="text-xs md:text-sm text-blue-900 font-medium">
              {job.company}
            </span>
            <GoDotFill
              className="w-2 h-2 text-zinc-900 hidden md:inline-block"
              aria-hidden="true"
            />
            <div className="flex items-center gap-1">
              <FaLocationDot
                className="w-4 h-4 text-zinc-500"
                aria-hidden="true"
              />
              <span className="text-xs md:text-sm text-zinc-500">
                {cityLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
      <button className="items-center self-start gap-2 text-base font-medium border border-slate-500 p-2 rounded-full text-slate-800 cursor-pointer hidden md:flex">
        <IoShareSocialOutline className="w-6 h-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default JobHeader;

