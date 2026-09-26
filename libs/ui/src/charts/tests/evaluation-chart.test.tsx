// @vitest-environment jsdom
import { fireEvent, render, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";

import { EvaluationChart } from "../evaluation-chart.tsx";

it("is named by its title", () => {
  const { getByRole } = render(
    <EvaluationChart
      data={[
        { ply: 1, value: 0.4 },
        { ply: 2, value: 0.6 },
      ]}
      domain={[0, 1]}
      title="Evaluation over the game"
    />,
  );

  expect(getByRole("img").getAttribute("aria-label")).toBe("Evaluation over the game");
});

it("renders a line chart with dots", () => {
  const { container } = render(
    <EvaluationChart
      data={[
        { ply: 1, value: 0.4 },
        { ply: 2, value: 0.6 },
        { ply: 3, value: 0.5 },
      ]}
      domain={[0, 1]}
      title="Evaluation"
    />,
  );

  expect(container.querySelector(".recharts-line-curve")).not.toBeNull();
  expect(container.querySelectorAll("circle")).toHaveLength(3);
});

it("selects the nearest move when the graph is clicked away from a dot", async () => {
  const selected: number[] = [];
  const { container } = render(
    <EvaluationChart
      data={[
        { ply: 1, value: 0.4 },
        { ply: 2, value: 0.6 },
        { ply: 3, value: 0.5 },
      ]}
      domain={[0, 1]}
      title="Evaluation"
      onSelectPly={(ply) => selected.push(ply)}
    />,
  );

  const wrapper = container.querySelector(".recharts-wrapper");
  expect(wrapper).not.toBeNull();
  // Recharts resolves the active move from the hover, a frame later.
  fireEvent.mouseMove(wrapper!, { clientX: 300, clientY: 10 });
  await new Promise((resolve) => setTimeout(resolve, 50));
  fireEvent.click(wrapper!, { clientX: 300, clientY: 10 });

  await waitFor(() => expect(selected).toEqual([3]));
});
