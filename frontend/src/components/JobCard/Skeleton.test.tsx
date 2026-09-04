import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import JobCardSkeleton from "./Skeleton";

describe("JobCardSkeleton", () => {
  it("renders pulse placeholders for featured and listing variants", () => {
    const { container: featured } = render(<JobCardSkeleton />);
    expect(featured.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);

    const { container: listing } = render(<JobCardSkeleton variant="listing" />);
    expect(listing.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });
});
