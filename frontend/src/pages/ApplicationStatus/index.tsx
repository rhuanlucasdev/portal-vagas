import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

/** Placeholder até existir o fluxo real de acompanhamento. */
// TODO: página real de acompanhamento (status, histórico, contatos do RH)
const ApplicationStatus = () => {
  const { id } = useParams();
  const protocol = id?.slice(0, 8).toUpperCase() ?? "—";

  useEffect(() => {
    document.title = "Acompanhar candidatura | VagaSul";
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="page-container flex flex-1 flex-col items-center justify-center py-16 text-center">
        <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
          Acompanhar candidatura
        </h1>
        <p className="mt-2 max-w-md text-sm text-slate-600 md:text-base">
          Em breve você poderá ver o status do processo seletivo por aqui.
        </p>
        <p className="mt-4 text-xs text-slate-500">
          Protocolo:{" "}
          <span className="font-mono font-medium text-slate-700">{protocol}</span>
        </p>
        <Link
          to="/vagas"
          className="mt-8 rounded-md bg-blue-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-950"
        >
          Voltar para vagas
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationStatus;
