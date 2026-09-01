export const categories = [
  { id: "tecnologia", name: "Tecnologia" },
  { id: "industria", name: "Indústria" },
  { id: "comercio-vendas", name: "Comércio e Vendas" },
  { id: "saude", name: "Saúde" },
  { id: "educacao", name: "Educação" },
  { id: "turismo-hospitalidade", name: "Turismo e Hospitalidade" },
  { id: "administracao", name: "Administração" },
  { id: "engenharia", name: "Engenharia" },
  { id: "logistica", name: "Logística" },
  { id: "agropecuaria", name: "Agropecuária" },
] as const;

export type Category = (typeof categories)[number];
export type CategoryId = Category["id"];
