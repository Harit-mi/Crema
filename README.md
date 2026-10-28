# Crema Collective — Premium Cafe Membership Platform

> A curated specialty coffee discovery and membership platform connecting independent roasters with coffee enthusiasts. Featuring configurable rules, dynamic anti-fraud mobile passes, instant counter verification, and transparent unit economics.

---

## 🌟 Quick Start

```bash
# 1. Navigate to the project directory
cd /Users/haritmishra/.gemini/antigravity/scratch/cafe-membership-platform

# 2. Run the development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```

To run a production build:
```bash
npm run build
npm run start
```

---

## 🧭 Implemented Routes

### ☕ Customer Experience (Mobile-First with Bottom Navigation)
- `/` — **Homepage:** Hero, membership value proposition, benefits breakdown, featured pilot roasters, redemption explanation, transparent pricing, FAQs.
- `/explore` — **Explore Cafes:** Full search, neighborhood filters, atmosphere categories (Micro Roastery, Botanical Bakery, Silent Workspace, Pour-over Bar), perk filters, and "My Plan Only" filter.
- `/cafes/[slug]` — **Cafe Detail:** Hero photography, verified partner badge, exact redemption rules, bean origin story, machine specs, operating hours, seating, and Google Maps link.
- `/membership` — **Membership Plans:** Plan comparison (price, billing frequency, beverage credits, retail bean discounts, usage limits, exclusions, renewal terms, cancellation policy), with an interactive weekly coffee savings calculator.
- `/membership/[planId]` — **Plan Detail & Selection:** Deep breakdown of rules, limits, eligible roaster roster, and checkout gateway.
- `/checkout` — **Checkout Flow:** Chosen plan breakdown, sales tax calculations, simulated test credit card selector, and backend-validated subscription activation.
- `/checkout/confirmation` — **Checkout Confirmation:** Activation receipt with immediate CTA to launch the live pass.
- `/my-membership` — **Digital Membership Pass:** Tactile pass card with member credentials, live 60-second rotating TOTP token, countdown bar, and in-store barista tap simulator. Supports Active, Trial, Past-Due, and Expired states.
- `/my-benefits` — **Member Benefits Catalog:** Remaining credits counter, categorized benefits (Beverages, Upgrades, Discounts, Experiences), exact terms, and status badges (`available`, `used`, `expired`, `temporarily_unavailable`).
- `/redemptions` — **Redemption History:** Ledger-verified transaction log with cafe name, benefit claimed, token code, counter staff, and dollar savings.
- `/account` — **Member Profile & Billing:** Profile editing, plan status, billing interval, 1-click auto-renew toggle, and persona role switcher.

### 🏪 Cafe Partner & Barista Experience (Separate Compact Subnav)
- `/partner` — **Partner Dashboard:** Shift volume, shift reimbursement total, active perks count, and operational shortcuts.
- `/partner/redemptions` — **Counter Validator:** Fast 1-touch 6-digit pass validator with duplicate-redemption prevention, credit limit checks, and staff shift PIN verification.
- `/partner/profile` — **Roaster Profile & Operating Hours:** Edit cafe description, roaster story, weekday/weekend hours, signature beans, and seating capacity.
- `/partner/benefits` — **Permitted Benefit Rules:** Toggle which benefits (beverage credits, pastry discounts, bean discounts) are honored at your bar.
- `/partner/staff` — **Barista Roster & Permissions:** Manage counter staff, shift PINs, and role access (Barista vs. Manager).

### 🛡️ Platform Administration
- `/admin` — **Platform Governance Desk:**
  - Network overview KPIs (Active members, pilot roasters, monthly redemptions, net margin 28.4%).
  - Cafe application approval queue with 1-click **Approve**, **Review**, or **Decline**.
  - Plan pricing and limits configuration.
  - Platform benefit rule catalog.
  - Customer support and dispute resolution.
  - Security audit monitor (TOTP key rotation, frequency rate caps).

---

## 🔒 Security & Fraud Prevention Model

1. **60-Second Rotating TOTP Tokens:** Customer passes generate dynamic codes that expire every 60 seconds. Static screenshots fail counter validation automatically.
2. **Double-Redemption Prevention:** The validator checks the ledger to block reuse of recently redeemed tokens.
3. **Frequency Rate Limits:** Capped at 2 beverage redemptions per 3-hour window.
4. **Server-Side Validation:** Permissions and credit balances are verified through typed state logic rather than purely frontend button states.
