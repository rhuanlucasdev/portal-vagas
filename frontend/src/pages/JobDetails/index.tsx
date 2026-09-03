import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { getJobById, getJobCategory } from "../../data/jobs";
import Breadcrumb from "../../components/Breadcrumb";
import NotFound from "../NotFound";
import JobHeader from "./components/JobHeader";
import JobMetaChips from "./components/JobMetaChips";
import JobSections from "./components/JobSections";
import JobSidebarSummary from "./components/JobSidebarSummary";
import SimilarJobs from "./components/SimilarJobs";

const JobDetails = () => {
  const { id } = useParams();
  const job = getJobById(id ?? "");
  return (
    <>
      {!job ? (
        <NotFound />
      ) : (
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 page-container py-6 md:py-8 bg-slate-50">
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
                  <JobHeader job={job} />
                  <JobMetaChips job={job} />
                  <JobSections job={job} />
                </div>
                <JobSidebarSummary job={job} />
              </div>
              <SimilarJobs job={job} />
            </div>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default JobDetails;
