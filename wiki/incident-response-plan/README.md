---
pageClass: fine-print
title: Two.js Incident Response Plan
lang: en-US
---

# Incident Response Plan

### Principles:

- **Transparency:** All incidents and fixes are documented here for the community.
- **Stewardship:** Take responsibility for protecting users and the project.
- **Protection:** Act to minimize harm and provide guidance.

# How Two.js Handles Incidents

### 1. Detection & Triage

- We monitor security reports sent via [security](/security) outreach, GitHub advisories, issues, and npm notifications.
- If we spot a bug or report that looks like a security risk, we treat it as an incident.

### 2. Assessment
- Check the severity:
  - **Critical:** npm package or repo compromised, malicious code, supply chain attack.
  - **High:** Vulnerabilities that allow code execution, XSS, or leak secrets.
  - **Medium:** Denial of service, memory leaks, or integrity issues.
  - **Low:** Docs defacement, minor regressions.

### 3. Response
- Acknowledge the report (privately if sensitive, publicly if not).
- For critical/high issues:
  - Rotate any exposed secrets/tokens.
  - Patch the bug or vulnerability.
  - Deprecate or yank affected npm versions if needed.
  - Rebuild and redeploy docs/site from a clean commit.
- For medium/low issues:
  - Patch and document the fix.

### 4. Communication
- Update this wiki page with a summary of the incident and the fix.
- For major issues, we post a GitHub Release note and a pinned Issue.
- Provide upgrade or mitigation steps for users.

### 5. Recovery & Hardening
- After fixing, review what happened and update this process if needed.
- Add tests or automation to prevent similar issues.
- Rotate credentials and check repo/npm security settings.

<br />

---

# Recent Incidents & Fixes

<br />

- None at this time

<br />

---

**If you spot a security issue, please report it via [security](/security) outreach. We’ll respond as quickly as possible.**
