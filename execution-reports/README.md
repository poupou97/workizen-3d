# Execution Reports

Execution reports capture the result of each Codex/Agent task.

Each execution report must match an existing work order filename exactly and must use the same `YYYY/MM` folder structure.

Required path format:

```text
work-orders/YYYY/MM/YYYY-MM-DD-HHMM-task-name.md
execution-reports/YYYY/MM/YYYY-MM-DD-HHMM-task-name.md
```

Governance workflow:

```text
Founder Work Order → Codex/Agent Execution → Execution Report → Founder Review → Approve/Rework/Reject
```

Execution report files should include:

- Task Summary
- Files Created
- Files Updated
- Decisions Made
- Issues / Risks
- Validation Steps
- Next Recommended Actions
