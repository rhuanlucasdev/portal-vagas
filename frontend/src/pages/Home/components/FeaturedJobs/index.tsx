import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import JobCard from "../../../../components/JobCard";
import JobCardSkeleton from "../../../../components/JobCard/Skeleton";
import { getRecentJobs } from "../../../../data/jobs";
import { useMockLoading } from "../../../../hooks/useMockLoading";

const FeaturedJobs = () => {
  const featuredJobs = getRecentJobs(3);
  const loading = useMockLoading("home");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="min-w-0 text-xl font-bold text-slate-900 md:text-2xl">Vagas recentes</h2>
        <Link
          to="/vagas"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-blue-900 hover:underline"
        >
          Ver todas
          <FiArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {loading
          ? Array.from({ length: 3 }, (_, index) => (
              <JobCardSkeleton key={index} />
            ))
          : featuredJobs.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </div>
  );
};

export default FeaturedJobs;
