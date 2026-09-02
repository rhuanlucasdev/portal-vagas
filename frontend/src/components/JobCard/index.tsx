import { FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";

import {
  formatPostedAt,
  getJobCity,
  isNewJob,
  type Job,
} from "../../data/jobs";
import { Link } from "react-router-dom";

function getCompanyInitials(company: string) {
  const initials = company
    .split(" ")
    .filter((word) => word.length > 2)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return initials || company.slice(0, 2).toUpperCase();
}

type JobCardProps = {
  job: Job;
  variant?: "featured" | "listing";
};

const JobCard = ({ job, variant = "featured" }: JobCardProps) => {
  const city = getJobCity(job);
  const cityLabel = city.label.replace(" - ", ", ");

  if (variant === "listing") {
    const tags = [job.type, job.modality, job.salary];

    return (
      <article className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <Link to={`/vagas/${job.id}`}>
            <div className="min-w-0">
              <h3 className="text-lg font-bold wrap-break-word text-blue-900">
                {job.title}
              </h3>
              <p className="mt-0.5 text-sm text-slate-600">{job.company}</p>
              <p className="mt-1 text-sm text-slate-500">
                {cityLabel} • {job.modality}
              </p>
            </div>
          </Link>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-blue-900">
            {getCompanyInitials(job.company)}
          </div>
        </div>

        <ul className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-900"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-500">
            {formatPostedAt(job.postedAt)}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 cursor-pointer rounded-md border border-blue-900 px-4 py-2 text-sm font-medium text-blue-900 transition-all duration-300 hover:bg-blue-50 md:flex-none"
            >
              Salvar
            </button>
            <Link
              to={`/vagas/${job.id}`}
              className="flex-1 cursor-pointer rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-900/80 md:flex-none"
            >
              Ver detalhes
            </Link>
          </div>
        </div>
      </article>
    );
  }

  const showNewBadge = isNewJob(job);
  const meta = [
    { icon: FiMapPin, label: cityLabel },
    { icon: FiDollarSign, label: job.salary },
    { icon: FiClock, label: job.modality },
  ];

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between md:p-5">
      <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm font-semibold text-blue-900">
          {getCompanyInitials(job.company)}
        </div>

        <div className="min-w-0">
          <Link to={`/vagas/${job.id}`}>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold wrap-break-word text-slate-900">
                {job.title}
              </h3>
              {showNewBadge && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                  Nova
                </span>
              )}
            </div>
          </Link>

          <p className="mt-0.5 text-sm text-slate-500">{job.company}</p>

          <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:flex-wrap md:items-center md:gap-x-4 md:gap-y-2">
            {meta.map((item) => (
              <li key={item.label} className="flex items-center gap-1.5">
                <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-2 md:w-40 md:shrink-0 md:flex-col">
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-md border border-blue-900 px-4 py-2 text-sm font-medium text-blue-900 transition-all duration-300 hover:bg-blue-50"
        >
          Salvar
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center cursor-pointer rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-900/80"
        >
          Candidatar-se
        </button>
      </div>
    </article>
  );
};

export default JobCard;
