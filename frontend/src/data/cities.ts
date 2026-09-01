export const cities = [
  { id: "paraisopolis-mg", label: "Paraisópolis - MG" },
  { id: "pouso-alegre-mg", label: "Pouso Alegre - MG" },
  { id: "itajuba-mg", label: "Itajubá - MG" },
  { id: "sao-bento-do-sapucai-sp", label: "São Bento do Sapucaí - SP" },
  { id: "brazopolis-mg", label: "Brazópolis - MG" },
] as const;

export type City = (typeof cities)[number];
export type CityId = City["id"];
