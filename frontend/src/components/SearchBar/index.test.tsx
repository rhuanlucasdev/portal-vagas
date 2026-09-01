import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import SearchBar from ".";
import { LocationPath, renderWithRouter } from "../../test/renderWithRouter";

describe("SearchBar", () => {
  it("navigates to /vagas with keyword and city", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <>
        <SearchBar />
        <LocationPath />
      </>,
    );

    await user.type(
      screen.getByRole("textbox", { name: "Cargo, empresa ou palavra-chave" }),
      "marceneiro",
    );
    await user.click(screen.getByRole("button", { name: "Cidade ou região" }));
    await user.click(screen.getByRole("button", { name: "Paraisópolis - MG" }));
    await user.click(screen.getByRole("button", { name: /Buscar Vagas/i }));

    const location = screen.getByTestId("location").textContent ?? "";
    expect(location).toContain("/vagas?");
    expect(location).toContain("q=marceneiro");
    expect(location).toContain("cidade=paraisopolis-mg");
  });

  it("navigates to /vagas without params when the form is empty", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <>
        <SearchBar />
        <LocationPath />
      </>,
    );

    await user.click(screen.getByRole("button", { name: /Buscar Vagas/i }));
    expect(screen.getByTestId("location")).toHaveTextContent(/^\/vagas$/);
  });
});
