import { AiOutlineEye } from "react-icons/ai";
import { BsFillLightningChargeFill, BsGraphUp } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  FaBrazilianRealSign,
  FaCode,
  FaPhone,
  FaRegUser,
} from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineBadge, MdOutlineMail } from "react-icons/md";
import { getJobById } from "../../../data/jobs";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IoMdLink } from "react-icons/io";

const availabilityOptions = [
  { value: "immediate", label: "Imediata" },
  { value: "15days", label: "Até 15 dias" },
  { value: "30days", label: "Até 30 dias" },
  { value: "60days", label: "A combinar na entrevista" },
];

const FormCard = ({
  variant,
  jobId,
}: {
  variant: "1" | "2" | "3";
  jobId: string;
}) => {
  const job = getJobById(jobId);
  const company = job?.company;
  const MAX = 2300;

  const [availability, setAvailability] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [presentation, setPresentation] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [salary, setSalary] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // TODO: fechar dropdown de disponibilidade no clique fora e no Escape

  function maskPhone(phone: string) {
    const digits = phone.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits.replace(/(\d{0,2})/, "($1");
    if (digits.length <= 6)
      return digits.replace(/(\d{2})(\d{0,4})/, "($1) $2");
    if (digits.length <= 10)
      return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");

    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }

  function maskMoney(money: string) {
    const digits = money.replace(/\D/g, "");
    if (!digits) return "";
    return Number(digits).toLocaleString("pt-BR");
  }

  return (
    <div>
      {(variant === "1" && (
        <section
          aria-labelledby="contact-heading"
          className="rounded-md border border-slate-200 bg-white p-3 md:p-4"
        >
          <div className="flex items-start gap-2 border-b border-slate-200 pb-3 md:items-center md:pb-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-xs font-bold text-blue-800 md:h-11 md:w-11 md:text-sm">
              {variant}
            </span>
            <div className="min-w-0 flex-1">
              <h2
                id="contact-heading"
                className="text-base font-bold text-slate-900 md:text-lg"
              >
                Dados de contato
              </h2>
              <p className="text-xs text-slate-600 md:text-sm">
                Confirme seus dados para o retorno do recrutador.
              </p>
            </div>
            <MdOutlineBadge
              className="ml-auto hidden text-xl text-slate-800/50 sm:block md:text-2xl"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 md:mt-4 md:grid-cols-2 md:gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-xs font-semibold text-slate-900 md:text-sm"
              >
                Nome completo <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 md:gap-3 md:px-4 md:py-3">
                <FaRegUser
                  className="h-4 w-4 shrink-0 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="Seu nome"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-slate-900 md:text-sm"
              >
                E-mail <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 md:gap-3 md:px-4 md:py-3">
                <MdOutlineMail
                  className="h-4 w-4 shrink-0 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <label
                  htmlFor="phone"
                  className="text-xs font-semibold text-slate-900 md:text-sm"
                >
                  WhatsApp / celular <span className="text-red-500">*</span>
                </label>
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 md:text-xs">
                  <BsFillLightningChargeFill
                    className="h-3 w-3 shrink-0"
                    aria-hidden="true"
                  />
                  Contato rápido
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 md:gap-3 md:px-4 md:py-3">
                <FaPhone
                  className="h-4 w-4 shrink-0 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(maskPhone(e.target.value))}
                  inputMode="numeric"
                  autoComplete="tel"
                  required
                />
              </div>
              <p className="text-[11px] font-medium text-slate-500 md:text-xs">
                Preferencial para agendar entrevistas.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="residence"
                className="text-xs font-semibold text-slate-900 md:text-sm"
              >
                Local de residência <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 md:gap-3 md:px-4 md:py-3">
                <FaMapMarkerAlt
                  className="h-4 w-4 shrink-0 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  id="residence"
                  name="residence"
                  autoComplete="address-level2"
                  required
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="Cidade, UF"
                />
              </div>
            </div>
          </div>
        </section>
      )) ||
        (variant === "2" && (
          <section
            aria-labelledby="resume-heading"
            className="rounded-md border border-slate-200 bg-white p-3 md:p-4"
          >
            <div className="flex items-start gap-2 border-b border-slate-200 pb-3 md:items-center md:pb-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-xs font-bold text-blue-800 md:h-11 md:w-11 md:text-sm">
                {variant}
              </span>
              <div className="min-w-0 flex-1">
                <h2
                  id="resume-heading"
                  className="text-base font-bold text-slate-900 md:text-lg"
                >
                  Currículo profissional
                </h2>
                <p className="text-xs text-slate-600 md:text-sm">
                  Como deseja apresentar sua trajetória?
                </p>
              </div>
              <IoDocumentTextOutline
                className="ml-auto hidden text-xl text-slate-800/50 sm:block md:text-2xl"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 flex flex-col gap-2 md:mt-4">
              <label
                htmlFor="curriculumVagaSul"
                className="flex cursor-pointer items-start gap-2 rounded-md bg-slate-200/50 p-3 transition-all duration-300 hover:bg-slate-200 md:p-4"
              >
                <input
                  type="radio"
                  name="curriculumSource"
                  id="curriculumVagaSul"
                  value="vagasul"
                  className="mt-1"
                />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-slate-900">
                      Usar perfil VagaSul
                    </span>
                    <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] text-green-800 md:text-xs">
                      Recomendado
                    </span>
                  </span>
                  <span className="text-xs text-slate-600 md:text-sm">
                    Preenche o currículo com os dados do seu perfil.
                  </span>
                </span>
                <button
                  type="button"
                  aria-label="Visualizar perfil"
                  className="ml-1 shrink-0 cursor-pointer text-slate-800/50 transition-colors hover:text-slate-900"
                >
                  <AiOutlineEye className="text-xl" aria-hidden="true" />
                </button>
              </label>
              <label
                htmlFor="curriculumNewFile"
                className="flex cursor-pointer items-start gap-2 rounded-md bg-slate-200/50 p-3 transition-all duration-300 hover:bg-slate-200 md:p-4"
              >
                <input
                  type="radio"
                  name="curriculumSource"
                  id="curriculumNewFile"
                  value="newFile"
                  className="mt-1"
                />
                {/* TODO: input type="file" + upload quando curriculumSource === "newFile" */}
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-sm font-medium text-slate-900">
                    Enviar novo arquivo
                  </span>
                  <span className="text-xs text-slate-600 md:text-sm">
                    Ideal para currículo customizado desta vaga.
                  </span>
                </span>
              </label>
            </div>
          </section>
        )) ||
        (variant === "3" && (
          <section
            aria-labelledby="questions-heading"
            className="rounded-md border border-slate-200 bg-white p-3 md:p-4"
          >
            <div className="flex items-start gap-2 border-b border-slate-200 pb-3 md:items-center md:pb-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-xs font-bold text-blue-800 md:h-11 md:w-11 md:text-sm">
                {variant}
              </span>
              <div className="min-w-0 flex-1">
                <h2
                  id="questions-heading"
                  className="text-base font-bold wrap-break-word text-slate-900 md:text-lg"
                >
                  Perguntas da {company}
                </h2>
                <p className="text-xs text-slate-600 md:text-sm">
                  Informações para o alinhamento inicial.
                </p>
              </div>
              <LuMessageCircleQuestion
                className="ml-auto hidden text-xl text-slate-800/50 sm:block md:text-2xl"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 md:mt-4 md:grid-cols-2 md:gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="salary"
                  className="text-xs font-semibold text-slate-900 md:text-sm"
                >
                  Pretensão ({job?.type}){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 md:gap-3 md:px-4 md:py-3">
                  <FaBrazilianRealSign
                    className="h-4 w-4 shrink-0 text-slate-500"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    placeholder="Ex.: 5.000"
                    value={salary}
                    onChange={(e) => setSalary(maskMoney(e.target.value))}
                    inputMode="numeric"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="availability"
                  className="text-xs font-semibold text-slate-900 md:text-sm"
                >
                  Disponibilidade para início{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div ref={dropdownRef} className="relative w-full">
                  <button
                    type="button"
                    id="availability"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl bg-slate-100 px-3 py-2.5 text-left text-sm md:gap-3 md:px-4 md:py-3"
                  >
                    <span className="min-w-0 truncate text-slate-900">
                      {availabilityOptions.find((o) => o.value === availability)
                        ?.label ?? "Selecione"}
                    </span>
                    <FiChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <ul
                      role="listbox"
                      className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-md"
                    >
                      {availabilityOptions.map((option) => (
                        <li
                          key={option.value}
                          role="option"
                          aria-selected={option.value === availability}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setAvailability(option.value);
                              setIsOpen(false);
                            }}
                            className="w-full cursor-pointer px-4 py-2 text-left text-sm text-slate-900 transition-colors hover:bg-slate-100"
                          >
                            {option.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <input
                    type="hidden"
                    name="availability"
                    value={availability ?? ""}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <label
                    htmlFor="presentation"
                    className="text-xs font-semibold text-slate-900 md:text-sm"
                  >
                    Carta de apresentação
                  </label>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 md:text-xs">
                    <BsGraphUp className="h-3 w-3 shrink-0" aria-hidden="true" />
                    Aumenta o interesse
                  </span>
                </div>
                <textarea
                  name="presentation"
                  id="presentation"
                  className="h-32 w-full resize-y rounded-xl bg-slate-100 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 md:h-40 md:px-4 md:py-3"
                  placeholder={`Por que você se interessou pela vaga na ${company}?`}
                  value={presentation}
                  maxLength={MAX}
                  onChange={(e) => setPresentation(e.target.value)}
                />
                <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-medium text-slate-500 md:text-xs">
                  <span className="text-slate-600">
                    Destaque experiências relevantes.
                  </span>
                  <p>
                    {presentation.length}/{MAX}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="linkedin"
                  className="text-xs font-semibold text-slate-900 md:text-sm"
                >
                  LinkedIn (opcional)
                </label>
                <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 md:gap-3 md:px-4 md:py-3">
                  <IoMdLink
                    className="h-4 w-4 shrink-0 text-slate-500"
                    aria-hidden="true"
                  />
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    placeholder="linkedin.com/in/..."
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="github"
                  className="text-xs font-semibold text-slate-900 md:text-sm"
                >
                  GitHub / portfólio (opcional)
                </label>
                <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 md:gap-3 md:px-4 md:py-3">
                  <FaCode
                    className="h-4 w-4 shrink-0 text-slate-500"
                    aria-hidden="true"
                  />
                  <input
                    type="url"
                    id="github"
                    name="github"
                    className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    placeholder="github.com/..."
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
    </div>
  );
};

export default FormCard;
