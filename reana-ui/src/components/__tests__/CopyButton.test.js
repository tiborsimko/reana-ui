/*
  This file is part of REANA.
  Copyright (C) 2026 CERN.

  REANA is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
*/

import { fireEvent, render, screen } from "@testing-library/react";
import copy from "copy-to-clipboard";
import { Icon } from "semantic-ui-react";

import { CopyButton } from "..";

jest.mock("copy-to-clipboard");

describe("CopyButton", () => {
  beforeEach(() => {
    copy.mockResolvedValue(true);
  });

  test("copies text from a button", async () => {
    render(<CopyButton text="share URL" label="Copy link" />);

    fireEvent.click(screen.getByRole("button", { name: "Copy to clipboard" }));

    expect(copy).toHaveBeenCalledWith(
      "share URL",
      expect.objectContaining({ format: "text/plain" }),
    );
    expect(await screen.findByText("Copied to clipboard!")).toBeInTheDocument();
  });

  test("can render an icon trigger", () => {
    render(
      <CopyButton
        as={Icon}
        text="code"
        aria-label="Copy code"
        data-testid="copy-icon"
      />,
    );

    fireEvent.click(screen.getByTestId("copy-icon"));

    expect(copy).toHaveBeenCalledWith(
      "code",
      expect.objectContaining({ format: "text/plain" }),
    );
  });
});
