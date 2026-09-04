import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { categories } from "../../../../data/categories";
import Filters from ".";

describe("Filters", () => {
  it("notifies city and category changes", async () => {
    const user = userEvent.setup();
    const onCityChange = vi.fn();
    const onToggleCategory = vi.fn();

    render(
      <Filters
        categoryIds={[]}
        onCityChange={onCityChange}
        onToggleCategory={onToggleCategory}
      />,
    );

    await user.selectOptions(screen.getByLabelText("Cidade"), "paraisopolis-mg");
    expect(onCityChange).toHaveBeenCalledWith("paraisopolis-mg");

    await user.click(screen.getByRole("checkbox", { name: categories[0].name }));
    expect(onToggleCategory).toHaveBeenCalledWith(categories[0].id);
  });

  it("calls onClose from the drawer header", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Filters
        categoryIds={[]}
        onCityChange={vi.fn()}
        onToggleCategory={vi.fn()}
        onClose={onClose}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Fechar filtros" }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
