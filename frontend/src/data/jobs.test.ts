import { describe, expect, it } from "vitest";

import { isCategoryId } from "./categories";
import { isCityId } from "./cities";
import {
  filterJobs,
  formatPostedAt,
  getJobCategory,
  getJobCity,
  getJobCountByCategory,
  getRecentJobs,
  isNewJob,
  jobs,
} from "./jobs";

const now = new Date("2026-09-01T12:00:00");

describe("filterJobs", () => {
  it("returns all jobs sorted by most recent when there are no filters", () => {
    const result = filterJobs({});

    expect(result).toHaveLength(jobs.length);
    const dates = result.map((job) => job.postedAt);
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
  });

  it("filters by query against title, company or description", () => {
    const byTitle = filterJobs({ query: "marceneiro" });
    expect(byTitle.some((job) => job.title.toLowerCase().includes("marceneiro"))).toBe(
      true,
    );

    const byCompany = filterJobs({ query: "UNIFEI" });
    expect(byCompany.length).toBeGreaterThan(0);
    expect(
      byCompany.some((job) => job.company.toLowerCase().includes("unifei")),
    ).toBe(true);
  });

  it("ignores surrounding spaces and is case-insensitive", () => {
    expect(filterJobs({ query: "  MARCENEIRO  " }).map((job) => job.id)).toEqual(
      filterJobs({ query: "marceneiro" }).map((job) => job.id),
    );
  });

  it("filters by city", () => {
    const result = filterJobs({ cityId: "paraisopolis-mg" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((job) => job.cityId === "paraisopolis-mg")).toBe(true);
  });

  it("filters by one or more categories", () => {
    const single = filterJobs({ categoryIds: ["tecnologia"] });
    expect(single.length).toBeGreaterThan(0);
    expect(single.every((job) => job.categoryId === "tecnologia")).toBe(true);

    const combined = filterJobs({ categoryIds: ["tecnologia", "industria"] });
    expect(combined.length).toBeGreaterThan(single.length);
    expect(
      combined.every(
        (job) => job.categoryId === "tecnologia" || job.categoryId === "industria",
      ),
    ).toBe(true);
  });

  it("combines query, city and category", () => {
    const result = filterJobs({
      query: "vendedor",
      cityId: "paraisopolis-mg",
      categoryIds: ["comercio-vendas"],
    });

    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every(
        (job) =>
          job.cityId === "paraisopolis-mg" &&
          job.categoryId === "comercio-vendas" &&
          `${job.title} ${job.company} ${job.description}`
            .toLowerCase()
            .includes("vendedor"),
      ),
    ).toBe(true);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterJobs({ query: "cargo-inexistente-xyz" })).toEqual([]);
  });
});

describe("formatPostedAt", () => {
  it("formats today, yesterday and older dates", () => {
    expect(formatPostedAt("2026-09-01", now)).toBe("Publicada hoje");
    expect(formatPostedAt("2026-08-31", now)).toBe("Publicada há 1 dia");
    expect(formatPostedAt("2026-08-28", now)).toBe("Publicada há 4 dias");
  });
});

describe("isNewJob", () => {
  it("marks jobs posted within the last 3 days as new", () => {
    expect(isNewJob({ ...jobs[0], postedAt: "2026-09-01" }, now)).toBe(true);
    expect(isNewJob({ ...jobs[0], postedAt: "2026-08-30" }, now)).toBe(true);
    expect(isNewJob({ ...jobs[0], postedAt: "2026-08-28" }, now)).toBe(false);
  });
});

describe("getRecentJobs", () => {
  it("returns the newest jobs limited by count", () => {
    const recent = getRecentJobs(3);
    expect(recent).toHaveLength(3);
    const dates = recent.map((job) => job.postedAt);
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
  });
});

describe("job lookups", () => {
  it("resolves city and category from a job", () => {
    const job = jobs[0];
    expect(getJobCity(job).id).toBe(job.cityId);
    expect(getJobCategory(job).id).toBe(job.categoryId);
  });

  it("counts jobs by category", () => {
    expect(getJobCountByCategory("tecnologia")).toBe(
      jobs.filter((job) => job.categoryId === "tecnologia").length,
    );
  });
});

describe("id guards", () => {
  it("accepts known city and category ids", () => {
    expect(isCityId("paraisopolis-mg")).toBe(true);
    expect(isCityId("cidade-inventada")).toBe(false);
    expect(isCategoryId("tecnologia")).toBe(true);
    expect(isCategoryId("categoria-inventada")).toBe(false);
  });
});
