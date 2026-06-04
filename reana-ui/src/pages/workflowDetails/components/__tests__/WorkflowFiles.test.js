/*
  This file is part of REANA.
  Copyright (C) 2026 CERN.

  REANA is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
*/

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";

import client from "~/client";
import WorkflowFiles from "../WorkflowFiles";

const WORKFLOW_ID = "workflow-id";
const FILE_NAME = "reports/final.txt";

const mockDispatch = jest.fn();
const mockState = {
  config: { filePreviewSizeLimit: 1000000 },
  details: {
    loadingDetails: false,
    details: {
      [WORKFLOW_ID]: {
        files: {
          items: [
            {
              name: FILE_NAME,
              lastModified: "2026-06-08",
              size: { raw: 12, human_readable: "12 Bytes" },
            },
          ],
          total: 1,
        },
        retentionRules: [],
      },
    },
  },
  workflows: { workflowRefresh: 0 },
};

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector) => selector(mockState),
}));

function LocationDisplay() {
  const location = useLocation();
  return (
    <div data-testid="location">{`${location.pathname}${location.search}`}</div>
  );
}

function renderWorkflowFiles(search, state) {
  return render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: `/workflows/${WORKFLOW_ID}/workspace`,
          search,
          state,
        },
      ]}
    >
      <WorkflowFiles id={WORKFLOW_ID} page={3} />
      <LocationDisplay />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  mockDispatch.mockClear();
  jest.spyOn(client, "getWorkflowFiles");
  jest.spyOn(client, "getWorkflowFile").mockResolvedValue({ data: "" });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("opens a deep link using an exact file-name lookup", async () => {
  client.getWorkflowFiles.mockResolvedValue({
    data: {
      items: [{ name: FILE_NAME, "last-modified": "2026-06-08", size: 12 }],
    },
  });
  client.getWorkflowFile.mockResolvedValue({ data: "file contents" });

  renderWorkflowFiles(`?name=${encodeURIComponent(FILE_NAME)}`);

  expect(await screen.findByText("file contents")).toBeInTheDocument();
  expect(client.getWorkflowFiles).toHaveBeenCalledWith(
    WORKFLOW_ID,
    { page: 1, size: 1, file_name: FILE_NAME },
    JSON.stringify({ name: [FILE_NAME] }),
  );
});

test("preserves page and search params when closing an internal preview", async () => {
  const archiveName = "reports/final.zip";
  renderWorkflowFiles(
    `?page=3&search=final&name=${encodeURIComponent(archiveName)}`,
    { internal: true, size: 12 },
  );

  await waitFor(() =>
    expect(document.querySelector(".ui.modal > .close.icon")).not.toBeNull(),
  );
  fireEvent.click(document.querySelector(".ui.modal > .close.icon"));

  await waitFor(() =>
    expect(screen.getByTestId("location")).toHaveTextContent(
      `/workflows/${WORKFLOW_ID}/workspace?page=3&search=final`,
    ),
  );
});

test("shows a clear error when an exact deep-linked file is missing", async () => {
  client.getWorkflowFiles.mockResolvedValue({
    data: {
      items: [
        {
          name: `${FILE_NAME}.bak`,
          "last-modified": "2026-06-08",
          size: 12,
        },
      ],
    },
  });

  renderWorkflowFiles(`?name=${encodeURIComponent(FILE_NAME)}`);

  expect(
    await screen.findByText(
      "This file cannot be previewed. It may have been removed from this workspace or you may not have access to it anymore.",
    ),
  ).toBeInTheDocument();
});
