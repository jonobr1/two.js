---
pageClass: fine-print
title: Two.js Security Policy
lang: en-US
---

# Notes on Safety

When using Two.js or any other client-side rendering library we recommend considering:

- Handle untrusted SVGs carefully: Do not load or interpret SVGs from untrusted users without sanitizing. Malicious SVGs can embed external references and scripts. Use an SVG sanitizer and set appropriate `Content-Security-Policy`.
- Images and external assets: Prefer same-origin or vetted hosts. Disable `allow-scripts` in any embedders/iframes and avoid inline event handlers.
- CSP recommended defaults: Consider a CSP that restricts scripts to self and trusted CDNs, disallows inline/eval, and sets `object-src 'none'`.

::: tip Note
The Two.js library does not collect user data. If you embed Two.js in a site that handles user content, apply your own input validation, rate limiting, and abuse reporting workflow.
:::

# Security Policy

If you have discovered a security vulnerability in this project, please report it
privately. **Do not disclose it as a public issue.** This gives us time to work with you to fix the issue before public exposure, reducing the chance that the exploit will be used before a patch is released.

**You may submit the report in the following ways:**

- Github users can privately report security advisories directly [here](https://github.com/jonobr1/two.js/security/advisories/new)

- Send an email to [inquiries+two.js@jono.fyi](mailto:inquiries+two.js@jono.fyi).

**Please provide the following information in your report:**

- The type of issue (e.g., buffer overflow, SQL injection, or cross-site scripting)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

This project is maintained by volunteers on a reasonable-effort basis. As such, we ask that you give us 90 days to work on a fix before public exposure.

<br />

---

<br />

_Two.js conforms to this [Incident Response Plan](https://two.js.org/incident-response-plan) in moments of security risks._