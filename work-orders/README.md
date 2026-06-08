# Work Orders

Work orders capture Founder instructions before execution.

Each task must have one work order file and one matching execution report file. The filenames must match exactly across both folders.

Required path format:

```text
work-orders/YYYY/MM/YYYY-MM-DD-HHMM-task-name.md
execution-reports/YYYY/MM/YYYY-MM-DD-HHMM-task-name.md
```

Governance workflow:

```text
Founder Work Order → Codex/Agent Execution → Execution Report → Founder Review → Approve/Rework/Reject
```

Work order files should include:

- Context
- Task
- Requirements
- Deliverables
- Acceptance Criteria
