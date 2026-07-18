---
title: "From Excel to Power BI: The Migration Guide for Swiss SMEs"
description: "Step-by-step guide for migrating Excel reports to Power BI. Including checklist, typical pitfalls, and ROI calculation for Swiss companies."
pubDate: 2026-02-07
author: "Emanuel Flury"
tags: ["Power BI", "Excel", "Migration", "Business Intelligence", "Switzerland"]
lang: "en"
translationKey: "excel-power-bi-migration"
---

You've worked with Excel for years. Your reports work. So why switch? The short answer: Because Excel costs you more than you think - and Power BI offers you more than you expect.

## When Is the Right Time for Migration?

Migrating to Power BI makes sense when at least three of these points apply:

- [ ] You spend more than 5 hours/week creating reports
- [ ] Multiple people work on the same Excel files
- [ ] Your Excel files are larger than 10 MB
- [ ] You regularly copy data between systems
- [ ] Leadership wants more current figures
- [ ] "Which version is correct?" is a common question

If you nodded at three or more points: Read on.

## What Power BI Does Better

### 1. Automatic Data Refresh

**Excel:** Manually export data, paste into Excel, check formulas.

**Power BI:** Connect data sources once, then automatic refresh (hourly, daily, weekly).

### 2. Interactive Dashboards

**Excel:** Static tables and charts. Create new reports for detailed views.

**Power BI:** Click on a segment, and all connected visualizations filter automatically. Drill down to individual transactions.

### 3. Single Source of Truth

**Excel:** Copies on local drives, sent via email, different versions.

**Power BI:** One dashboard in the cloud. Everyone sees the same current figures.

### 4. Mobile Availability

**Excel:** Practically unusable on mobile.

**Power BI:** Native apps for iOS and Android. Check KPIs on the go.

## The Typical Excel Landscape in Swiss SMEs

In my experience, many companies look like this:

| Area | Excel Usage | Effort/Month |
|------|-------------|--------------|
| Finance | Monthly reports, budget comparison | 20+ hours |
| Sales | Pipeline, forecasts, commissions | 15+ hours |
| Inventory | Stock overviews, order planning | 10+ hours |
| HR | Absences, overtime, headcount | 8+ hours |
| Management | Consolidated KPIs | 5+ hours |

**Total effort: 50-80 hours/month**

With Power BI, this effort typically reduces to 10-15 hours - mainly for analysis rather than report creation.

## Migration Strategy: Step by Step

### Phase 1: Create Inventory (1-2 days)

Before migrating, you need to know what exists:

1. **Collect all Excel reports**
   - Search network drives
   - Check emails for attachments
   - Interview employees

2. **Document for each report:**
   - Who creates it? (Owner)
   - How often? (Frequency)
   - Who uses it? (Audience)
   - What data sources? (Origin)
   - How long does creation take? (Effort)

3. **Prioritize by:**
   - Highest time effort
   - Most users
   - Importance for decisions

### Phase 2: Clarify Data Sources (2-3 days)

Power BI can connect to over 100 data sources. Typical sources in Swiss SMEs:

| Source | Connection Type | Complexity |
|--------|-----------------|------------|
| Excel files | Direct | Simple |
| SQL Server | Direct | Medium |
| SAP Business One | via Connector | Medium |
| Abacus | via Export/API | Medium-High |
| Bexio | via API | Medium |
| Shopify/WooCommerce | via Connector | Simple |

**Important:** Clarify with your IT whether direct connections are possible or if you need data exports.

### Phase 3: Design Data Model (3-5 days)

The most common mistake: Copying Excel tables 1:1 to Power BI. Instead:

1. **Create star schema**
   - Fact tables (transactions, movements)
   - Dimension tables (customers, products, time)

2. **Define relationships**
   - Identify primary keys
   - Create links between tables

3. **Centralize calculations**
   - Create DAX measures for KPIs
   - Document calculation logic

### Phase 4: Build Dashboards (1-2 weeks)

Start with the most important report:

1. **Sketch layout** (paper works)
2. **Select visualizations**
3. **Define filters and slicers**
4. **Keep design consistent** (colors, fonts)
5. **Optimize mobile view**

### Phase 5: Test and Train (1 week)

1. **Validate numbers**
   - Power BI vs. Excel for the same period
   - Clarify and document deviations

2. **Involve users**
   - Gather feedback
   - Conduct training
   - Create documentation

3. **Parallel operation**
   - Run both systems for 2-4 weeks
   - Build trust

## Avoiding Typical Pitfalls

### 1. Migrating "Everything at Once"

**Problem:** Overwhelm, long project duration, high costs.

**Solution:** Start with one important report. Show success. Then expand.

### 2. Adopting Excel Logic 1:1

**Problem:** Power BI works differently than Excel. Nested IF formulas become DAX nightmares.

**Solution:** Rethink the data model. Use Power BI's strengths.

### 3. Too Many KPIs on One Dashboard

**Problem:** Information overload. Nobody knows where to look.

**Solution:** 5-7 KPIs per dashboard. Less is more. Drill-down for details.

### 4. No Data Quality Check

**Problem:** "Garbage in, garbage out" - bad data stays bad data.

**Solution:** Implement data quality rules. Flag erroneous records.

### 5. Neglecting Training

**Problem:** The best dashboard is useless if nobody uses it.

**Solution:** Plan time for training. Build champions in the team.

## ROI Calculation for Your Company

### Example: Mid-Sized Swiss Manufacturing Company

**Starting point:**
- 50 employees
- 40 hours/month for Excel reporting
- Hourly rate: CHF 70

**Monthly Excel costs:**
- 40h × CHF 70 = CHF 2,800
- Plus: Opportunity costs (delayed decisions)
- Plus: Error costs (wrong data → wrong decisions)

**With Power BI:**
- 10 hours/month for analysis = CHF 700
- Power BI Pro: CHF 10/user × 10 users = CHF 100
- Monthly costs: CHF 800

**Savings:** CHF 2,000/month = CHF 24,000/year

**One-time investment:**
- Implementation: CHF 8,000-15,000
- Training: CHF 2,000-4,000

**Payback:** 5-9 months

## Checklist for Your Migration

### Before Starting

- [ ] Management buy-in obtained
- [ ] Budget approved
- [ ] Project owner appointed
- [ ] Report inventory created
- [ ] Prioritization completed

### During Implementation

- [ ] Data sources documented
- [ ] Data model created
- [ ] First dashboard built
- [ ] Numbers validated
- [ ] Feedback gathered

### After Go-Live

- [ ] Training completed
- [ ] Documentation created
- [ ] Parallel operation finished
- [ ] Success measured
- [ ] Next dashboards planned

## Conclusion

Migrating from Excel to Power BI isn't a technical exercise - it's a transformation of how your company works with data. The effort pays off when you proceed in a structured way and avoid typical mistakes.

Start small, show success, and build from there.

Need support with your Power BI migration? [Schedule a free consultation](/en/contact/).

---

*Emanuel Flury has accompanied dozens of Excel-to-Power BI migrations in Swiss SMEs - focusing on quick results and measurable ROI.*
