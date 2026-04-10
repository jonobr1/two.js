---
description: Rules for modifying GitHub Actions workflow files to comply with OpenSSF Scorecard pinned-dependencies requirements
applyTo: '.github/workflows/**'
---

# GitHub Actions Dependency Pinning

This project pins all GitHub Action dependencies to SHA hashes from forks under the `jonobr1` account. This is required for OpenSSF Scorecard compliance.

## Naming convention

When adding or updating a `uses:` reference in any workflow file, always use this pattern:

```
uses: jonobr1/<action-name>@<full-sha-hash>  # <version-tag>
```

**Never use:**
- `uses: actions/checkout@v4` (unpinned tag, wrong account)
- `uses: actions/checkout@main` (mutable branch ref)
- `uses: actions/checkout@latest` (mutable)

## Current fork → SHA mappings

| Original action | Pinned fork reference |
|---|---|
| `actions/checkout@v5` | `jonobr1/checkout@08c6903cd8c0fde910a37f88322edcfb5dd907a8` |
| `actions/setup-node@v5` | `jonobr1/setup-node@a0853c24544627f65ddf259abe73b1d18a591444` |
| `actions/cache@v4` | `jonobr1/cache@0400d5f644dc74513175e3cd8d07132dd4860809` |
| `github/codeql-action/*@v3` | `jonobr1/codeql-action/*@192325c86100d080feab897ff886c34abd4c83a3` |
| `ossf/scorecard-action@v2.4.3` | `jonobr1/scorecard-action@4eaacf0543bb3f2c246792bd56e8cdeffafb205a` |
| `actions/setup-node@v6` | `jonobr1/setup-node@395ad3262231945c25e8478fd5baf05154b1d79f` |
| `actions/checkout@v6` | `jonobr1/checkout@8e8c483db84b4bee98b60c0593521ed34d9990e8` |

## npm commands

Pin npm package installs to a specific version — never use `@latest`:

```yaml
# Good
run: npm install -g npm@11.5.1

# Bad
run: npm install -g npm@latest
```

## Adding a new action not in the table above

1. Identify the upstream action repo (e.g. `actions/upload-artifact`)
2. Check if `jonobr1/<action-name>` already exists as a fork on GitHub
3. If not, note it for the human maintainer (@jonobr1) to fork before the PR is merged
4. Use a placeholder comment: `# TODO: fork and pin before merge`
