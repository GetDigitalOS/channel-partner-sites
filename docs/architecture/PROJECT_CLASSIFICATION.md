# Project Classification — channel-partner-sites

| Field | Value |
|-------|-------|
| **Generated** | 2026-05-23 |
| **Method** | Auto-classified from project documentation |
| **Result** | **Tier 2 — Interactive** (2/10 yes) |

## Assessment

| # | Question | Answer | Rationale |
|---|----------|--------|-----------|
| auth | User Authentication | No | Channel partner marketing/lead-gen sites typically have no user accounts or personalized logins. |
| data | Data Persistence | No | A monorepo of partner sites with no visible DB/ORM dependencies suggests static content rather than user-generated persistence. |
| roles | Multi-Role Access | No | No auth means no multi-role permission system is present. |
| integrations | Third-Party Integrations | **Yes** | Channel partner sites almost always integrate lead-capture, analytics, or CRM APIs to route inquiries to partners. |
| realtime | Real-Time Features | No | Static partner sites have no websocket/live-update requirements indicated by the tooling. |
| sensitive | Transaction Sensitivity | No | Lead-capture marketing sites collect contact info but no payments, PII-grade, or financial transaction data is indicated. |
| scale | Scale Expectations | No | Small per-partner sites (neil-solar, rich-financial) are unlikely to exceed 10k concurrent users. |
| team | Team Size | No | No team or contributor tooling is indicated; appears to be a small operator-managed monorepo. |
| longevity | Longevity | **Yes** | A Turbo monorepo scaffolded for multiple named partners signals an ongoing platform expected to be maintained for years. |
| ai | AI/LLM Features | No | No AI/LLM SDK dependencies or scripts appear in the package.json. |

## Tier Determination

**Tier 2 — Interactive**

- Yes count: 2/10
- Count-based tier: 2
- Final tier: 2 (max of count + escalation)
