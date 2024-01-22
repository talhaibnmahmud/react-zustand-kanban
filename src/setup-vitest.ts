import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// expect.extend(matchers);
afterEach(cleanup);

vi.mock("zustand"); // to make it works like Jest (auto-mocking)
