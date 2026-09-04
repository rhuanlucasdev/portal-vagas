import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Home from ".";
import { getRecentJobs } from "../../data/jobs";
import { renderWithRouter } from "../../test/renderWithRouter";

vi.mock("../../hooks/useMockLoading", () => ({
  useMockLoading: () => false,
}));

describe("Home page", () => {
  it("renders hero, recent jobs and category shortcuts", () => {
    renderWithRouter(<Home />);

    expect(
      screen.getByRole("heading", {
        name: "Encontre uma oportunidade perto de você",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Vagas recentes" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Ver todas$/ })).toHaveAttribute(
      "href",
      "/vagas",
    );

    for (const job of getRecentJobs(3)) {
      expect(screen.getByRole("heading", { name: job.title })).toBeInTheDocument();
    }

    expect(screen.getByRole("link", { name: /Tecnologia/ })).toHaveAttribute(
      "href",
      "/vagas?categoria=tecnologia",
    );
  });
});
