import {
  formatPostedAt,
  type Job,
} from "../../../data/jobs";
import { FaBriefcase } from "react-icons/fa6";
import { BsBuildings } from "react-icons/bs";
import { FaMoneyBillWave, FaRegClock } from "react-icons/fa6";

type JobMetaChipsProps = {
  job: Job;
};

const JobMetaChips = ({ job }: JobMetaChipsProps) => {
  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="max-w-fit flex items-center gap-2 text-xs md:text-sm font-medium bg-blue-300/40 px-2.5 py-0.5 rounded-full text-blue-800">
          <FaBriefcase className="w-4 h-4" aria-hidden="true" />
          {job.type}
        </span>
        <span className="max-w-fit flex items-center gap-2 text-xs md:text-sm font-medium bg-green-300/40 px-2.5 py-0.5 rounded-full text-green-800">
          <BsBuildings className="w-4 h-4" aria-hidden="true" />{" "}
          {job.modality}
        </span>
        <span className="max-w-fit flex items-center gap-2 text-xs md:text-sm font-medium bg-slate-300/40 px-2.5 py-0.5 rounded-full text-slate-800">
          <FaMoneyBillWave className="w-4 h-4" aria-hidden="true" />
          {job.salary}
        </span>
        <span className="max-w-fit flex items-center gap-2 text-xs md:text-sm font-medium bg-slate-300/40 px-2.5 py-0.5 rounded-full text-slate-800">
          <FaRegClock className="w-4 h-4" aria-hidden="true" />
          {formatPostedAt(job.postedAt)}
        </span>
      </div>
      <span className="w-full h-px bg-slate-200 mt-4 mb-4" />
    </>
  );
};

export default JobMetaChips;

