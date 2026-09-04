import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import JobDetails from ".";
import { renderWithRouter } from "../../test/renderWithRouter";
import { getJobCity, jobs } from "../../data/jobs";
import { Route, Routes } from "react-router-dom";

const job = jobs[0];

describe("JobDetails page", () => {
  it("renders the job title, company and location", () => {
    renderWithRouter(
      <Routes>
        <Route path="/vagas/:id" element={<JobDetails />} />
      </Routes>,
      { initialEntries: [`/vagas/${job.id}`] },
    );

    expect(
      screen.getByRole("heading", { name: job.title }),
    ).toBeInTheDocument();

    expect(screen.getByText(job.company)).toBeInTheDocument();

    expect(
      screen.getByText(getJobCity(job).label.replace(" - ", ", ")),
    ).toBeInTheDocument();
  });

  it("renders the job description, requirements and benefits", () => {
    renderWithRouter(
      <Routes>
        <Route path="/vagas/:id" element={<JobDetails />} />
      </Routes>,
      { initialEntries: [`/vagas/${job.id}`] },
    );

    expect(screen.getByText("Sobre a vaga")).toBeInTheDocument();

    expect(screen.getByText(job.description)).toBeInTheDocument();

    expect(screen.getByText("Requisitos")).toBeInTheDocument();

    for (const requirement of job.requirements) {
      expect(screen.getByText(requirement)).toBeInTheDocument();
    }

    expect(screen.getByText("Benefícios")).toBeInTheDocument();

    for (const benefit of job.benefits) {
      expect(screen.getByText(benefit)).toBeInTheDocument();
    }
  });

  it("renders the job apply button", () => {
    renderWithRouter(
      <Routes>
        <Route path="/vagas/:id" element={<JobDetails />} />
      </Routes>,
      { initialEntries: [`/vagas/${job.id}`] },
    );

    const applyButton = screen.getByRole("link", {
      name: "Quero me candidatar",
    });
    expect(applyButton).toBeInTheDocument();
    expect(applyButton).toHaveAttribute("href", `/vagas/${job.id}/apply`);

    expect(
      screen.getByRole("button", { name: "Salvar vaga" }),
    ).toBeInTheDocument();

    const breadcrumb = screen.getByRole("navigation", {
      name: "Navegação por caminhos",
    });

    expect(
      within(breadcrumb).getByRole("link", { name: "Vagas" }),
    ).toHaveAttribute("href", "/vagas");
  });

  it("renders the not found page when the job is not found", () => {
    renderWithRouter(
      <Routes>
        <Route path="/vagas/:id" element={<JobDetails />} />
      </Routes>,
      { initialEntries: [`/vagas/xyz`] },
    );

    expect(
      screen.getByRole("heading", { name: "Oops! Página não encontrada. :(" }),
    );

    expect(
      screen.getByRole("link", { name: "página inicial" }),
    ).toHaveAttribute("href", "/");

    expect(
      screen.queryByRole("heading", { name: job.title }),
    ).not.toBeInTheDocument();
  });
});
