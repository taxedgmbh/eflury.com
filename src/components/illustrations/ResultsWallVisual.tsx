import Image from 'next/image';
/**
 * Case-studies hub visual: the three documented projects compared on the
 * one metric they share — estimated payback in months. All figures are
 * the published per-project estimates; nothing derived, nothing new.
 *
 * Ported from ResultsWallVisual.astro. Geometry and timing unchanged; the lang prop is gone
 * because the site is German-only, so its label ternaries resolve to German.
 */
export function ResultsWallVisual() {
  const MAX_MONTHS = 5; // bar scale
  const rows = [
    {
      name: 'Taxed GmbH',
      detail: 'Eigene Firma · ~27.5 h/Woche automatisiert',
      months: 3.2,
      color: 'var(--eflury-teal)',
    },
    {
      name: 'Finanzprozess-Automatisierung',
      detail: 'Kundenprojekt · ~40 h/Monat gespart',
      months: 4.1,
      color: 'var(--eflury-navy)',
    },
    {
      name: 'Power BI Reporting',
      detail: 'Kundenprojekt · ~15 h/Woche gespart',
      months: 2.8,
      color: 'var(--eflury-blue)',
    },
  ];
  const t = {
    title: 'Geschätzte Amortisation pro Projekt',
    unit: 'Monate',
    caption: 'Alle Zahlen sind die publizierten Schätzungen der jeweiligen Fallstudie.',
  };
  return (
    <>
      <style>{`.results-wall {
    max-width: 860px;
    margin: 3rem auto 0;
    padding: 1.75rem 2rem;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
  }

  .rw-head {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 1.5rem;
  }

  .rw-mark {
    border-radius: 6px;
  }

  .rw-head h3 {
    font-size: 1.1rem;
    color: var(--text-primary);
    margin: 0;
  }

  .rw-rows {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  .rw-row {
    display: grid;
    grid-template-columns: minmax(180px, 1fr) 2fr;
    gap: 1rem;
    align-items: center;
  }

  .rw-meta {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .rw-name {
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--text-primary);
  }

  .rw-detail {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .rw-bar-track {
    background: var(--bg-secondary);
    border-radius: var(--radius-full);
    height: 34px;
    overflow: hidden;
  }

  .rw-bar {
    height: 100%;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.8rem;
    min-width: 110px;
  }

  .rw-value {
    color: #fff;
    font-size: 0.8rem;
    font-weight: 700;
    white-space: nowrap;
  }

  figcaption {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1.25rem;
    font-size: 0.8rem;
    color: var(--text-tertiary);
  }

  .rw-brand {
    font-weight: 800;
    font-size: 0.85rem;
    color: var(--eflury-navy);
  }

  .rw-brand em {
    font-style: normal;
    color: var(--eflury-teal);
  }

  @media (max-width: 600px) {
    .results-wall {
      padding: 1.25rem;
    }

    .rw-row {
      grid-template-columns: 1fr;
      gap: 0.4rem;
    }
  }`}</style>
      <figure className="results-wall">
        <div className="rw-head">
          <Image src="/images/favicon-tab.png" alt="" width={28} height={28} className="rw-mark" />
          <h3>{t.title}</h3>
        </div>
        <div className="rw-rows">
          {rows.map((r, __i6) => (
            <div key={__i6} className="rw-row">
              <div className="rw-meta">
                <span className="rw-name">{r.name}</span>
                <span className="rw-detail">{r.detail}</span>
              </div>
              <div className="rw-bar-track">
                <div className="rw-bar" style={{ width: `${(r.months / MAX_MONTHS) * 100}%`, background: r.color }}>
                  <span className="rw-value">{String(r.months).replace('.', '.')} {t.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <figcaption>{t.caption} <span className="rw-brand">eFlury <em>Consulting</em></span></figcaption>
      </figure>
    </>
  );
}
