import { getSimilarJobs, type Job } from "../../../data/jobs";
import JobCard from "../../../components/JobCard";

type SimilarJobsProps = {
  job: Job;
};

const SimilarJobs = ({ job }: SimilarJobsProps) => {
  return (
    <div className="flex flex-col gap-4 mt-4 md:mt-6">
      <h2 className="text-lg md:text-xl font-bold text-zinc-900">
        Vagas similares
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {getSimilarJobs(job, 3).map((similar) => (
          <JobCard key={similar.id} job={similar} variant="listing" />
        ))}
      </div>
    </div>
  );
};

export default SimilarJobs;

