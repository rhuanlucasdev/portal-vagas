import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Jobs from ".";
import { filterJobs } from "../../data/jobs";
import { renderWithRouter } from "../../test/renderWithRouter";

vi.mock("../../hooks/useMockLoading", () => ({
  useMockLoading: () => false,
}));

describe("Jobs page", () => {
  it("lists jobs from the mock data", () => {
    renderWithRouter(<Jobs />, { initialEntries: ["/vagas"] });

    const all = filterJobs({});
    expect(
      screen.getByText(`${all.length} vagas encontradas`),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: all[0].title })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Paginação" })).toBeInTheDocument();
  });

  it("filters the listing from the page search", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Jobs />, { initialEntries: ["/vagas"] });

    const input = screen.getByRole("searchbox", { name: "Buscar cargo" });
    await user.type(input, "marceneiro");
    await user.keyboard("{Enter}");

    const matches = filterJobs({ query: "marceneiro" });
    expect(
      screen.getByText(
        `${matches.length} ${matches.length === 1 ? "vaga encontrada" : "vagas encontradas"}`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: matches[0].title })).toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", () => {
    renderWithRouter(<Jobs />, { initialEntries: ["/vagas?q=cargo-inexistente-xyz"] });

    expect(screen.getByText("Nenhuma vaga encontrada com esses filtros.")).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Paginação" })).not.toBeInTheDocument();
  });

  it("applies city from the query string", () => {
    renderWithRouter(<Jobs />, {
      initialEntries: ["/vagas?cidade=paraisopolis-mg"],
    });

    const matches = filterJobs({ cityId: "paraisopolis-mg" });
    expect(
      screen.getByText(`${matches.length} vagas encontradas`),
    ).toBeInTheDocument();
  });

  it("opens a full-width filters drawer", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Jobs />, { initialEntries: ["/vagas"] });

    await user.click(screen.getByRole("button", { name: "Abrir filtros" }));

    const drawer = await screen.findByRole("dialog", { name: "Filtros" });
    expect(drawer).toHaveClass("inset-0", "w-full", "transition-transform");
    expect(screen.getByRole("button", { name: "Fechar filtros" })).toBeInTheDocument();

    await waitFor(() => {
      expect(drawer).toHaveClass("translate-x-0");
    });

    await user.click(screen.getByRole("button", { name: "Fechar filtros" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Filtros" })).not.toBeInTheDocument();
    });
  });
});
