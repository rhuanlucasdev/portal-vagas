import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Navbar from ".";
import { LocationPath, renderWithRouter } from "../../test/renderWithRouter";

describe("Navbar", () => {
  it("marks Vagas as the active page on /vagas", () => {
    renderWithRouter(<Navbar />, { initialEntries: ["/vagas"] });

    expect(screen.getByRole("link", { name: "Vagas" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Empresas" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("does not mark Vagas as active on the home page", () => {
    renderWithRouter(<Navbar />, { initialEntries: ["/"] });

    expect(screen.getByRole("link", { name: "Vagas" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("sends the header search to /vagas with the query", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <>
        <Navbar />
        <LocationPath />
      </>,
    );

    await user.type(screen.getByRole("searchbox", { name: "Buscar vagas" }), "marceneiro");
    await user.click(screen.getByRole("button", { name: "Buscar vagas" }));

    expect(screen.getByTestId("location")).toHaveTextContent(/^\/vagas\?q=marceneiro$/);
  });

  it("keeps listing filters when searching from /vagas", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <>
        <Navbar />
        <LocationPath />
      </>,
      { initialEntries: ["/vagas?cidade=paraisopolis-mg"] },
    );

    const input = screen.getByRole("searchbox", { name: "Buscar vagas" });
    await user.clear(input);
    await user.type(input, "vendedor");
    await user.click(screen.getByRole("button", { name: "Buscar vagas" }));

    const location = screen.getByTestId("location").textContent ?? "";
    expect(location).toContain("/vagas?");
    expect(location).toContain("q=vendedor");
    expect(location).toContain("cidade=paraisopolis-mg");
  });
});
