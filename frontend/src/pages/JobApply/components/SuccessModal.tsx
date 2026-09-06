import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";

type SuccessModalProps = {
  open: boolean;
  jobTitle: string;
  company: string;
  applicationId?: string;
  onClose: () => void;
};

const SuccessModal = ({
  open,
  jobTitle,
  company,
  applicationId,
  onClose,
}: SuccessModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-success-title"
        aria-describedby="apply-success-desc"
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-lg md:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <IoCheckmarkCircle
              className="mt-0.5 h-8 w-8 shrink-0 text-green-600"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <h2
                id="apply-success-title"
                className="text-base font-semibold text-slate-900 md:text-lg"
              >
                Inscrição enviada
              </h2>
              <p
                id="apply-success-desc"
                className="mt-1 text-sm text-slate-600"
              >
                Sua candidatura para{" "}
                <span className="font-medium text-slate-900">{jobTitle}</span>{" "}
                na <span className="font-medium text-slate-900">{company}</span>{" "}
                foi registrada com sucesso.
              </p>
              {applicationId && (
                <p className="mt-2 text-xs text-slate-500">
                  Protocolo:{" "}
                  <span className="font-mono text-slate-700">
                    {applicationId.slice(0, 8).toUpperCase()}
                  </span>
                </p>
              )}
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="shrink-0 rounded-md p-1 text-slate-500 transition-colors cursor-pointer hover:bg-slate-100 hover:text-slate-800"
          >
            <IoClose className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Link
            to="/vagas"
            className="rounded-md border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
          >
            Voltar para vagas
          </Link>
          <Link
            to={
              applicationId
                ? `/candidaturas/${applicationId}`
                : "/candidaturas"
            }
            className="rounded-md bg-blue-900 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-950"
          >
            Acompanhar candidatura
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
