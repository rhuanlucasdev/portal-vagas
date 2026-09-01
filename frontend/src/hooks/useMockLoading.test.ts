import { renderHook, act } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useMockLoading } from "./useMockLoading";

describe("useMockLoading", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts as loading and resolves after the delay", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useMockLoading("home", 450));

    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(449);
    });
    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe(false);
  });

  it("resets when the key changes", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ key }) => useMockLoading(key, 450),
      { initialProps: { key: "q=" } },
    );

    act(() => {
      vi.advanceTimersByTime(450);
    });
    expect(result.current).toBe(false);

    rerender({ key: "q=marceneiro" });
    expect(result.current).toBe(true);
  });
});
