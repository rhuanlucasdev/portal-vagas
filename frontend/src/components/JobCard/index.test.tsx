import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import JobCard from ".";
import { jobs } from "../../data/jobs";
import { renderWithRouter } from "../../test/renderWithRouter";

const job = jobs[0];

describe("JobCard", () => {
  it("renders featured job details and actions", () => {
    renderWithRouter(<JobCard job={job} />);

    expect(
      screen.getByRole("heading", { name: job.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(job.company)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Candidatar-se" }),
    ).toBeInTheDocument();
  });

  it("renders listing tags for type, modality and salary", () => {
    renderWithRouter(<JobCard job={job} variant="listing" />);

    expect(screen.getByText(job.type)).toBeInTheDocument();
    expect(screen.getAllByText(job.modality).length).toBeGreaterThan(0);
    expect(screen.getByText(job.salary)).toBeInTheDocument();
  });
});
