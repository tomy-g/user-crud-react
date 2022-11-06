import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("renders user list size", () => {
  render(<Home users={[]} />);
  const sizeElement = screen.getByTestId("size");
  expect(sizeElement).toBeInTheDocument();
});

test("renders 0", () => {
  render(<Home users={[]} />);
  const sizeElement = Number(screen.getByTestId("size").textContent);
  expect(sizeElement).toEqual(0);
});

test("renders 2", () => {
    render(<Home users={["Pedro", "Antonio"]} />);
    const sizeElement = Number(screen.getByTestId("size").textContent);
    expect(sizeElement).toEqual(2);
  });
