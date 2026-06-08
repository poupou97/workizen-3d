# Work Order: Workizen 3D Governance

## Context

Workizen 3D is part of WorkforceOS / Workizen.vn.

The project needs a strict task governance structure so every Founder instruction is traceable to a matching execution result.

## Task

Update the Workizen 3D project governance structure.

Founder instruction:

```text
Create or update the project structure for work orders, execution reports, output artifacts, docs, architecture, and README governance documentation.
```

Original Founder command:

```text
Update the Workizen 3D project governance structure.

Context:
This project is part of WorkforceOS / Workizen.vn.
We need a strict task governance rule:
Every task must have:
1. A work order file containing the command/instruction given by the Founder.
2. A matching execution report file containing the result of the task.

Target project folder:
workizen-3d

Please create or update the following structure:

workizen-3d/
├── work-orders/
│   └── 2026/
│       └── 06/
├── execution-reports/
│   └── 2026/
│       └── 06/
├── output/
│   ├── screenshots/
│   ├── videos/
│   ├── diagrams/
│   └── demos/
├── docs/
├── architecture/
└── README.md

Rules:
- Do not delete existing files.
- Do not overwrite user-created content.
- Add .gitkeep files to empty folders.
- Create README.md files for work-orders and execution-reports.
- Document the governance workflow:
  Founder Work Order → Codex/Agent Execution → Execution Report → Founder Review → Approve/Rework/Reject.
- Use YYYY/MM folder structure.
- Work order and execution report filenames must match exactly.
Example:
work-orders/2026/06/2026-06-07-1500-workizen-3d-governance.md
execution-reports/2026/06/2026-06-07-1500-workizen-3d-governance.md

Create the first work order:
work-orders/2026/06/2026-06-07-1500-workizen-3d-governance.md

Create the matching execution report template:
execution-reports/2026/06/2026-06-07-1500-workizen-3d-governance.md

The work order should include:
- Context
- Task
- Requirements
- Deliverables
- Acceptance Criteria

The execution report should include:
- Task Summary
- Files Created
- Files Updated
- Decisions Made
- Issues / Risks
- Validation Steps
- Next Recommended Actions

After completing, show:
1. Final folder tree
2. Files created
3. Files updated
4. Any warnings
```

## Requirements

- Do not delete existing files.
- Do not overwrite user-created content.
- Add `.gitkeep` files to empty folders.
- Create `README.md` files for `work-orders` and `execution-reports`.
- Document the governance workflow:

```text
Founder Work Order → Codex/Agent Execution → Execution Report → Founder Review → Approve/Rework/Reject
```

- Use `YYYY/MM` folder structure.
- Work order and execution report filenames must match exactly.
- Do not implement blockchain.

## Deliverables

- `work-orders/2026/06/2026-06-07-1500-workizen-3d-governance.md`
- `execution-reports/2026/06/2026-06-07-1500-workizen-3d-governance.md`
- `work-orders/README.md`
- `execution-reports/README.md`
- Governance section in root `README.md`
- Output artifact folders:
  - `output/screenshots`
  - `output/videos`
  - `output/diagrams`
  - `output/demos`
- Project folders:
  - `docs`
  - `architecture`

## Acceptance Criteria

- Required folders exist under the Workizen 3D project root.
- Empty folders contain `.gitkeep`.
- Work order and execution report filenames match exactly.
- Governance workflow is documented.
- Existing files are preserved.
- Final response includes:
  - Final folder tree
  - Files created
  - Files updated
  - Any warnings
