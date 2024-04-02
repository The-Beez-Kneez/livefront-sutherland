import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import GenreFinder from "./GenreFinder";

jest.mock("axios");

describe("GenreFinder component", () => {
  test("renders loading state", () => {
    const { getByText } = render(<GenreFinder />);
    const loadingElement = getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders error state", async () => {
    // Mock axios to simulate an error response
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch data"));

    const { findByText } = render(<GenreFinder />);
    const errorElement = await findByText("Error: Failed to fetch data");
    expect(errorElement).toBeInTheDocument();
  });

  test("renders genres and links", async () => {
    // Mock axios to simulate a successful response
    axios.get
      .mockResolvedValueOnce({ data: ["Genre 1", "Genre 2", "Genre 3"] })
      .mockResolvedValueOnce({ data: ["Story 1", "Story 2", "Story 3"] });

    const { getByText, getAllByRole } = render(<GenreFinder />);
    await waitFor(() => {
      const genres = getAllByRole("link");
      expect(genres).toHaveLength(3);
      expect(getByText("Genre 1")).toBeInTheDocument();
      expect(getByText("Genre 2")).toBeInTheDocument();
      expect(getByText("Genre 3")).toBeInTheDocument();
    });
  });
});
