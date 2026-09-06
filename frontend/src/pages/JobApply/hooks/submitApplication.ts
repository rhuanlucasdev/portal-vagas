export type ApplicationPayload = {
  jobId: string;
  name: string;
  email: string;
  phone: string;
  residence: string;
  curriculumSource: string;
  salary: string;
  availability: string;
  presentation: string;
  linkedin: string | null;
  github: string | null;
  terms: boolean;
  notifications: boolean;
};

export async function submitApplication(payload: ApplicationPayload) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!payload.terms) {
    throw new Error("É necessário aceitar os termos para candidatar-se.");
  }

  console.log("Candidatura mockada:", payload);

  return {
    ok: true as const,
    id: crypto.randomUUID(),
  };
}
