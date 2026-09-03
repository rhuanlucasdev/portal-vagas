import { CiCircleCheck } from "react-icons/ci";
import { type Job } from "../../../data/jobs";

type JobSectionsProps = {
  job: Job;
};

const JobSections = ({ job }: JobSectionsProps) => {
  return (
    <>
      <section className="flex flex-col gap-2 mb-2">
        <h2 className="text-lg md:text-xl font-bold text-zinc-900">
          Sobre a vaga
        </h2>
        <p className="text-zinc-900 text-sm md:text-base">
          {job.description}
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg md:text-xl font-bold text-zinc-900">
          Requisitos
        </h2>
        <ul className="list-disc list-inside pl-2">
          {job.requirements.map((requirement) => (
            <li
              key={requirement}
              className="text-zinc-900 text-sm md:text-base"
            >
              {requirement}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg md:text-xl font-bold text-zinc-900">
          Benefícios
        </h2>
        <ul className="pl-2">
          {job.benefits.map((benefit) => (
            <li
              key={benefit}
              className="text-zinc-900 text-sm md:text-base flex items-center gap-2"
            >
              <CiCircleCheck
                className="w-4 h-4 text-green-500"
                aria-hidden="true"
              />
              {benefit}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default JobSections;

