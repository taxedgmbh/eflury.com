# Agent 05: Assessment Quiz Builder

**Phase:** 2 - Lead Generation Tools (Weeks 5-8)
**Timeline:** Week 6-7 (20 hours)
**Budget:** CHF 3,000
**Dependencies:** Agent 04 (EmailJS setup), Customer personas

---

## Mission
Create "Is Your Business Ready for Claude Automation?" quiz that qualifies leads and recommends appropriate package.

---

## Deliverables

### 1. 10-Question Quiz
**File:** `/astro-src/src/components/AssessmentQuiz.astro`

**Questions:**
1. How many employees? (10-25 / 26-50 / 51-100 / 100+)
2. Current tech stack maturity? (Basic / Intermediate / Advanced)
3. Team AI familiarity? (Never used / Tried ChatGPT / Power users)
4. Main pain point? (Admin burden / Scaling issues / Hiring freeze / Quality consistency)
5. Budget for automation? (<CHF 5K / CHF 5-15K / CHF 15-30K / CHF 30K+)
6. Timeline urgency? (Exploring / 3-6 months / 1-3 months / Urgent <1 month)
7. Data quality? (Messy / Average / Well-organized)
8. Decision-making style? (I decide alone / Team consensus / Board approval needed)
9. Industry? (Accounting / Legal / Healthcare / Consulting / IT / Other)
10. Biggest fear? (Cost / Complexity / Team adoption / Security / Results uncertainty)

### 2. Scoring Algorithm
```typescript
// 0-30 points: Exploration Phase
// 31-60 points: Ready to Start
// 61-100 points: Prime Candidate

const scoring = {
  employees: { '10-25': 5, '26-50': 8, '51-100': 10, '100+': 10 },
  techStack: { 'Basic': 3, 'Intermediate': 7, 'Advanced': 10 },
  // ... etc
};
```

### 3. Personalized Results Page
**Recommendations based on score:**
- **0-30:** Blog content, free resources, nurture sequence
- **31-60:** Starter Package, case studies, ROI calculator
- **61-100:** Professional/Enterprise Package, immediate consultation booking

### 4. Lead Capture
**Email required to see results**
- EmailJS integration (reuse Agent 04 setup)
- "Send my custom roadmap" auto-email

---

## Success Criteria
- [ ] 10 questions implemented
- [ ] Scoring logic accurate
- [ ] Email capture: 85%+ of quiz takers
- [ ] EN/DE versions
- [ ] Mobile responsive

---

**Status:** Ready after Agent 04 (EmailJS setup exists)
