import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import JobCard from "../../../../components/JobCard";
import { getRecentJobs } from "../../../../data/jobs";

const FeaturedJobs = () => {
  const featuredJobs = getRecentJobs(3);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Vagas recentes</h2>
        <Link
          to="/vagas"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-900 hover:underline"
        >
          Ver todas
          <FiArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {featuredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobs;
