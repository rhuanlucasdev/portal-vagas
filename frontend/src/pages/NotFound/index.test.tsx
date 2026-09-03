import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../../test/renderWithRouter";
import NotFound from ".";
import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";

describe("NotFound page", () => {
  it("renders the not found page", () => {
    renderWithRouter(<NotFound />);

    expect(
      screen.getByRole("heading", { name: "Oops! Página não encontrada. :(" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "página inicial" }),
    ).toHaveAttribute("href", "/");
  });

  it("catch all route", () => {
    renderWithRouter(
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>,
      { initialEntries: ["/not-found"] },
    );

    expect(
      screen.getByRole("heading", { name: "Oops! Página não encontrada. :(" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "página inicial" }),
    ).toHaveAttribute("href", "/");
  });
});
