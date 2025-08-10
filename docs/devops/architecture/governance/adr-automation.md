# ADR Automation Guidance

Purpose: Automate consistent creation, validation, cataloging, and lifecycle management of Architecture Decision Records.

## Goals

- Enforce template conformity & mandatory sections present
- Link each ADR to contextual artifacts (pattern matrix version, principles commit, related epics)
- Provide discoverability via generated index & tags
- Enable quality gates (fitness function targets defined before Accept)

## Workflow Overview

1. Developer runs scaffold command: `make adr title="Adopt Event-Driven Integration"`  
2. Script generates file `docs/devops/architecture/governance/adrs/ADR-YYYYMMDD-adopt-event-driven-integration.md` from template.  
3. Pre-commit hook validates mandatory tokens & tables.  
4. CI job updates `adrs/index.md` (sorted, status grouped).  
5. Status transitions require PR label (e.g., `adr:proposed`, `adr:accepted`).  
6. Superseding ADR auto-inserts backlink to prior record.

## Directory Structure

```bash
/governance
  /adrs
    ADR-20250110-sample-decision.md
  adr-template.md
  adr-automation.md
  pattern-selection-matrix.md
```

## Validation Rules (CI)

| Rule | Description | Tooling |
| ---- | ----------- | ------- |
| Filename Pattern | `ADR-<date>-<slug>.md` | Regex check |
| Mandatory Sections | Context, Decision, Rationale, Impact, Fitness Functions, Risks | Markdown parser |
| Status Enum | Proposed/Accepted/Deprecated/Superseded | YAML front matter or inline parse |
| Metrics Table | Must include DORA metrics rows | Table schema check |
| Pattern Matrix Ref | Contains `Pattern Matrix Version` marker | Regex |
| Owner Present | `Owner:` line non-empty | Regex |

## Suggested Make Targets

| Target | Action |
| ------ | ------ |
| `make adr title="..."` | Generate ADR from template replacing placeholders |
| `make adr-validate` | Run local lint/validation script |
| `make adr-index` | Regenerate ADR index file |

## Example adr.sh (Pseudo)

```bash
#!/usr/bin/env bash
set -euo pipefail
TITLE_RAW="$1" # e.g. "Adopt Event-Driven Integration"
DATE=$(date +%Y%m%d)
SLUG=$(echo "$TITLE_RAW" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g' | sed -E 's/^-|-$//g')
FILE="docs/devops/architecture/governance/adrs/ADR-${DATE}-${SLUG}.md"
[ -f "$FILE" ] && { echo "ADR exists"; exit 1; }
mkdir -p "$(dirname "$FILE")"
sed "s/ADR-XXX/ADR-${DATE}-${SLUG}/g; s/Date: YYYY-MM-DD/Date: $(date +%F)/g" docs/devops/architecture/governance/adr-template.md > "$FILE"
echo "Created $FILE"
```

## Index Generation (Pseudo Python)

```python
import re, pathlib, datetime
adrs = []
for f in pathlib.Path('docs/devops/architecture/governance/adrs').glob('ADR-*.md'):
    text = f.read_text()
    status = re.search(r'Status:\s*(.*)', text).group(1).strip()
    title_line = text.splitlines()[0]
    title = title_line.lstrip('# ').strip()
    adrs.append((f.name, status, title))

adrs.sort()
lines = ["# ADR Index", "", "| ADR | Status | Title |", "| --- | ------ | ----- |"]
for name, status, title in adrs:
    lines.append(f"| [{name}](./adrs/{name}) | {status} | {title} |")
pathlib.Path('docs/devops/architecture/governance/adrs/index.md').write_text("\n".join(lines) + "\n")
```

## CI Integration (Concept)

- Job `adr-validate` triggers on changes under `governance/adrs/`.
- Uses script to validate rules; fails build on violation.
- On merge to main, runs index generation & commits (or instructs dev to include in PR).

## Lifecycle Automation

| Action | Trigger | Automation |
| ------ | ------- | ---------- |
| Accept ADR | PR merged w/ label `adr:accepted` | Replace `Status: Proposed` → `Accepted` |
| Deprecate ADR | New ADR supersedes | Add footer: `Superseded by ADR-YYYYMMDD-x` |
| Review Overdue | Scheduled workflow | Open issue tagging owner |

## Metrics & Reporting

| Metric | Purpose |
| ------ | ------- |
| ADR Lead Time | Time from Proposed to Accepted (process improvement) |
| Supersession Ratio | % ADRs superseded annually (evolution cadence) |
| KPI Realization | % decisions hitting targets in window (effectiveness) |

## Checklist

- [ ] Template up to date & versioned
- [ ] Scaffold script present & executable
- [ ] Validation script covers rules table
- [ ] ADR index auto-generated
- [ ] CI pipeline gate active
- [ ] Review reminder automation configured

---
Return to [Architecture Overview](../README.md)
