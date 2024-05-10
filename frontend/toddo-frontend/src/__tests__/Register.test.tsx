import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../components/Register";
import * as router from "react-router";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

describe("Register Component", () => {
  it("renders register form", () => {
    render(<Register />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "login" })).toBeInTheDocument();
  });

  it("updates user state on input change", () => {
    render(<Register />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "john_doe" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    expect(screen.getByLabelText("Username")).toHaveValue("john_doe");
    expect(screen.getByLabelText("Email address")).toHaveValue(
      "john@example.com"
    );
    expect(screen.getByLabelText("Password")).toHaveValue("password123");
  });

  it("submits form with user data and redirects on successful registration", async () => {
    render(<Register />);

    //   @ts-ignore
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ user: "john_doe" }),
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "john_doe" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "login" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:1000/api/v1/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "john@example.com",
            username: "john_doe",
            password: "password123",
          }),
        }
      );
      expect(navigate).toHaveBeenCalledWith("/login");
    });
  });
});
