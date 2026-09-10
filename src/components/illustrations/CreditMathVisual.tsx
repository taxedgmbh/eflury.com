/**
 * Pricing visual: the audit-credit mechanic as big typography.
 * Numbers mirror the published pricing (Micro CHF 5'900; audit CHF 4'900
 * fully credited within 6 months). Theme-aware via design tokens.
 *
 * Ported from CreditMathVisual.astro. Geometry and timing unchanged; the lang prop is gone
 * because the site is German-only, so its label ternaries resolve to German.
 */
export function CreditMathVisual() {
  const t = {
    micro: "CHF 5'900",
    microLabel: 'Micro-Paket',
    audit: "− CHF 4'900",
    auditLabel: 'KI-Audit, voll angerechnet',
    net: "CHF 1'000",
    netLabel: 'Netto für Phase 1',
    caption: 'Beispielrechnung: Wer innert 6 Monaten nach dem Audit umsetzt, zahlt das Audit faktisch nicht. Preise exkl. 8.1% MwSt.',
  };
  return (
    <>
      <style>{`.credit-math {
    margin: 2rem 0 0;
    text-align: center;
  }

  .cm-row {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .cm-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.3rem;
    padding: 1.1rem 1.5rem;
    border-radius: var(--radius-md);
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    min-width: 170px;
  }

  .cm-value {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  .cm-value.navy {
    color: var(--text-primary);
  }

  .cm-value.teal {
    color: var(--teal-text);
  }

  .cm-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .cm-equals {
    align-self: center;
    font-size: 2rem;
    font-weight: 800;
    color: var(--text-tertiary);
  }

  .cm-result {
    background: var(--surface-navy);
    border-color: var(--surface-navy);
  }

  .cm-result .cm-value {
    color: #2dd4bf;
  }

  .cm-result .cm-label {
    color: rgba(255, 255, 255, 0.75);
  }

  figcaption {
    margin-top: 1rem;
    font-size: 0.85rem;
    color: var(--text-tertiary);
  }

  @media (max-width: 600px) {
    .cm-row {
      gap: 0.75rem;
    }

    .cm-item {
      min-width: 0;
      flex: 1 1 40%;
      padding: 0.9rem 1rem;
    }

    .cm-equals {
      flex-basis: 100%;
      font-size: 1.5rem;
    }
  }`}</style>
      <figure className="credit-math" aria-label={t.caption}>
        <div className="cm-row">
          <div className="cm-item">
            <span className="cm-value navy">{t.micro}</span>
            <span className="cm-label">{t.microLabel}</span>
          </div>
          <div className="cm-item">
            <span className="cm-value teal">{t.audit}</span>
            <span className="cm-label">{t.auditLabel}</span>
          </div>
          <span className="cm-equals" aria-hidden="true">=</span>
          <div className="cm-item cm-result">
            <span className="cm-value">{t.net}</span>
            <span className="cm-label">{t.netLabel}</span>
          </div>
        </div>
        <figcaption>{t.caption}</figcaption>
      </figure>
    </>
  );
}
