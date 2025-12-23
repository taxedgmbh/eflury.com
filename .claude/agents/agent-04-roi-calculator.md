# Agent 04: ROI Calculator Developer

**Phase:** 2 - Lead Generation Tools (Weeks 5-8)
**Timeline:** Week 5-6 (25 hours)
**Budget:** CHF 3,750
**Dependencies:** Agent 03 (Case Study) - needs Taxed ROI data

---

## Mission
Build interactive ROI calculator that converts 12-18% of visitors into qualified leads by showing personalized automation savings.

---

## Required Memory
- `.claude/memory/case-study-taxed.md` - ROI baseline data
- `.claude/memory/customer-personas.md` - Input field design
- `.claude/memory/website-strategy.md` - Lead gen tools section

---

## Deliverables

### 1. Frontend Calculator UI
**File:** `/astro-src/src/components/ROICalculator.astro`

**Input fields:**
- Company size (slider: 10-500 employees)
- Admin hours per employee per week (slider: 1-20 hrs)
- Average hourly cost CHF (input: default CHF 65)
- Current manual processes (checkboxes: Invoicing, Emails, Reports, Data entry, Other)

**Output metrics:**
- Hours saved per week/month/year
- Cost savings (CHF per year)
- Payback period (months)
- 3-year ROI (%)

**Calculation logic** (conservative estimates based on Taxed case study):
```typescript
// Conservative: 60% of max automation potential
const automationRate = 0.60;
const hoursPerYear = adminHoursPerWeek * 52;
const savingsPotential = hoursPerYear * automationRate * hourlyCost;

const implementationCost = {
  '10-25': 8000,  // Starter package
  '26-50': 15000, // Professional package
  '51+': 25000    // Enterprise package
};

const paybackMonths = implementationCost / (savingsPotential / 12);
const roi3Year = ((savingsPotential * 3) - implementationCost) / implementationCost;
```

### 2. Lead Capture Form
**Integration:** EmailJS (shared config from Agent 01)

**Form fields:**
- Email (required)
- Company name (optional)
- "Email me detailed report" checkbox (auto-checked)

**EmailJS template:** Send personalized PDF report with calculations

### 3. Analytics Tracking
```typescript
// Google Analytics events
gtag('event', 'roi_calculator_use', {
  company_size: size,
  estimated_savings: savings,
  payback_months: payback
});
```

---

## Success Criteria
- [ ] Calculator functional (test 10 scenarios)
- [ ] Mobile responsive (375px-1440px)
- [ ] Email capture: 60%+ completion rate
- [ ] Form validation: No errors on submission
- [ ] EN/DE versions

---

## Handoff
**Links:**
- https://eflury.com/en/tools/roi-calculator
- https://eflury.com/de/tools/roi-calculator

**Test scenarios:** Provide 10 sample calculations with expected outputs

---

**Status:** Ready after Agent 03 completion
