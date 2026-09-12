/**
 * Worked before/after example for the Datenqualität service page, ported from
 * DataQualityShowcase.astro.
 *
 * Pure HTML and CSS on the design tokens — no images. Every figure in it is
 * explicitly labelled as an illustrative example, which is why it can show a
 * concrete dataset without implying a real client.
 *
 * This was the single largest piece of page content with no home in the new
 * site: the Datenqualität service page had nothing equivalent.
 *
 * Ported, not redrawn. Only Astro-to-JSX mechanics change; the lang prop is gone
 * because the site is German-only, so its label ternaries resolve to German.
 */
export function DataQualityShowcase() {
  const t = {
    sectionTitle: 'So sieht das konkret aus',
    sectionIntro: 'Ein fiktives, aber typisches Beispiel: eine Kundenliste, wie sie in fast jedem KMU existiert — und was die Agenten daraus machen.',
    step1: 'Schritt 1 — Der Profiling-Agent findet die Probleme',
    step2: 'Schritt 2 — Der Bereinigungs-Agent schlägt vor, Sie geben frei',
    step3: 'Schritt 3 — Messbares Resultat',
    colName: 'Firma',
    colCity: 'Ort',
    colUid: 'UID',
    colPhone: 'Telefon',
    tagDup: 'Duplikat-Cluster',
    tagUid: 'UID fehlt',
    tagFormat: 'Format-Drift',
    proposalTitle: 'Vorschlag: 3 Datensätze zu 1 Golden Record zusammenführen',
    proposalWhy: 'Begründung des Agenten: identische UID-Registrierung, gleiche Telefonnummer nach Normalisierung, Adresse in Grenchen in allen drei Quellen. Konfidenz: hoch.',
    goldenLabel: 'Golden Record',
    reviewGate: 'Menschliches Freigabe-Gate',
    btnApprove: 'Freigeben',
    btnReject: 'Ablehnen',
    gateNote: 'Ohne Klick auf «Freigeben» wird nichts in Ihre Systeme geschrieben.',
    m1Label: 'Duplikatquote',
    m2Label: 'Datensätze ohne UID',
    m3Label: 'Manuelle Bereinigung',
    m3Before: '12 Std./Monat',
    m3After: '~1 Std./Monat',
    illustrative: 'Illustratives Beispiel mit fiktiven Daten und Beispielwerten — Ihre Ausgangslage messen wir im Audit.',
    pipeTitle: 'Die Architektur dahinter',
    pipeSources: 'Ihre Systeme',
    pipeMcp: 'MCP · nur Lesezugriff',
    pipeAgents: 'Claude-Agenten',
    pipeAgentList: ['Profiler', 'Bereiniger', 'Validator', 'Monitor'],
    pipeContext: 'Kontextfenster: Schema + Regeln + Stichproben (200K–1M Tokens)',
    pipeGate: 'Review-Gate',
    pipeGateSub: 'Mensch entscheidet',
    pipeOut1: 'Saubere Stammdaten',
    pipeOut2: 'Qualitäts-Dashboard',
    mktTitle: 'Der Enterprise-Markt — und wo wir stehen',
    mktLeadersLabel: 'Leaders im Gartner Magic Quadrant für Augmented Data Quality Solutions (2025):',
    mktOthersLabel: 'Ebenfalls bewertet:',
    mktNote: 'Das sind exzellente Plattformen für Konzerne mit eigenen Datenteams — wir setzen sie nicht ein und verkaufen sie nicht. Unser Ansatz bringt dasselbe agentische Muster, das Gartner mit dieser Kategorie formalisiert hat, in KMU-Grösse: Claude + MCP, Wochen statt Quartale, Fixpreis.',
  };
  const mqLeaders = ['Ataccama', 'Informatica', 'Qlik'];
  const mqOthers = ['Ab Initio', 'Anomalo', 'CluedIn', 'DQLabs', 'Experian', 'IBM', 'Irion', 'Precisely', 'SAS'];
  const dirtyRows = [
    { name: 'Müller AG', city: 'Grenchen', uid: 'CHE-123.456.789', phone: '+41 32 645 11 22', dup: true, issues: [] },
    { name: 'Mueller AG', city: 'Grenchen', uid: '', phone: '032 645 11 22', dup: true, issues: ['uid', 'format'] },
    { name: 'Müller AG, Grenchen', city: '', uid: 'CHE-123.456.789', phone: '0326451122', dup: true, issues: ['format'] },
    { name: 'Bäckerei Steiner GmbH', city: 'Biel/Bienne', uid: 'CHE-987.654.321', phone: '+41 32 322 33 44', dup: false, issues: [] },
    { name: 'steiner gmbh bäckerei', city: 'Biel', uid: '', phone: '+41 32 322 33 44', dup: false, issues: ['uid'], dup2: true },
  ];
  return (
    <>
      <style>{`.dq-showcase {
    padding: 4.5rem 0;
    background: var(--bg-secondary);
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .dq-showcase h2 {
    text-align: center;
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0 0 1rem;
  }

  .dq-showcase h2::after {
    content: '';
    display: block;
    width: 48px;
    height: 3px;
    border-radius: 2px;
    background: var(--eflury-teal);
    margin: 1rem auto 0;
  }

  .dq-intro {
    max-width: 640px;
    margin: 0 auto 2.5rem;
    text-align: center;
    color: var(--text-secondary);
    line-height: 1.65;
  }

  .dq-step {
    margin-bottom: 2.5rem;
  }

  .dq-step h3 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.125rem;
    color: var(--text-primary);
    margin: 0 0 1rem;
  }

  .dq-step-num {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9375rem;
    font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, var(--eflury-navy), var(--eflury-teal));
  }

  /* --- table --- */
  .dq-table-wrap {
    overflow-x: auto;
    border: 1px solid var(--border-color);
    border-radius: 14px;
    background: var(--card-bg);
  }

  .dq-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    min-width: 640px;
  }

  .dq-table th {
    background: var(--surface-navy);
    color: #fff;
    text-align: left;
    padding: 0.75rem 1rem;
    font-weight: 600;
    font-size: 0.8125rem;
    white-space: nowrap;
  }

  .dq-table td {
    padding: 0.6875rem 1rem;
    border-top: 1px solid var(--border-color);
    color: var(--text-secondary);
    white-space: nowrap;
  }

  .dq-table tr.dup-a td {
    background: rgba(229, 72, 77, 0.06);
  }

  .dq-table tr.dup-b td {
    background: rgba(245, 158, 11, 0.06);
  }

  .missing {
    color: var(--accent-red, #e5484d);
    font-weight: 700;
  }

  .chip {
    display: inline-block;
    margin-left: 0.5rem;
    padding: 0.125rem 0.5rem;
    border-radius: 999px;
    font-size: 0.6875rem;
    font-weight: 700;
    vertical-align: middle;
    white-space: nowrap;
  }

  .chip-red {
    background: rgba(229, 72, 77, 0.12);
    color: var(--accent-red, #e5484d);
  }

  .chip-amber {
    background: rgba(245, 158, 11, 0.14);
    color: #b45309;
  }

  /* --- proposal --- */
  .dq-proposal {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-left: 4px solid var(--eflury-teal);
    border-radius: 14px;
    padding: 1.5rem;
  }

  .dq-proposal-head strong {
    color: var(--text-primary);
  }

  .dq-proposal-head p {
    margin: 0.375rem 0 1.25rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .dq-merge {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .dq-merge-sources {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .dq-mini {
    padding: 0.5rem 0.875rem;
    background: var(--bg-secondary);
    border: 1px dashed var(--border-color);
    border-radius: 8px;
    font-size: 0.8125rem;
    color: var(--text-secondary);
    text-decoration: line-through;
    text-decoration-color: rgba(229, 72, 77, 0.5);
  }

  .dq-merge-arrow {
    font-size: 1.5rem;
    color: var(--teal-text);
    font-weight: 700;
  }

  .dq-golden {
    position: relative;
    padding: 1.125rem 1.25rem 1rem;
    background: rgba(13, 148, 136, 0.07);
    border: 1px solid rgba(13, 148, 136, 0.35);
    border-radius: 12px;
    min-width: 240px;
  }

  .dq-golden-badge {
    position: absolute;
    top: -10px;
    left: 12px;
    padding: 0.125rem 0.625rem;
    background: var(--action-teal);
    color: #fff;
    border-radius: 999px;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .dq-golden-body {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .dq-golden-body strong {
    color: var(--text-primary);
  }

  .dq-gate {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 1.25rem;
    padding-top: 1.125rem;
    border-top: 1px dashed var(--border-color);
  }

  .dq-gate-label {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .dq-btn {
    display: inline-block;
    padding: 0.375rem 0.875rem;
    border-radius: 8px;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: default;
  }

  .dq-btn-approve {
    background: var(--action-teal);
    color: #fff;
  }

  .dq-btn-reject {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
  }

  .dq-gate-note {
    font-size: 0.8125rem;
    color: var(--text-tertiary);
  }

  /* --- metrics --- */
  .dq-metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .dq-metric {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1.125rem 1.25rem;
    text-align: center;
  }

  .dq-metric-label {
    display: block;
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    margin-bottom: 0.375rem;
  }

  .dq-metric-vals {
    font-size: 1.0625rem;
    color: var(--text-secondary);
  }

  .dq-metric-vals s {
    color: var(--text-tertiary);
  }

  .dq-metric-vals strong {
    color: var(--teal-text);
    font-size: 1.1875rem;
  }

  .dq-arrow {
    color: var(--teal-text);
    margin: 0 0.25rem;
  }

  .dq-disclaimer {
    margin-top: 0.875rem;
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    text-align: center;
  }

  /* --- pipeline --- */
  .dq-pipe {
    margin-top: 3rem;
  }

  .dq-pipe h3 {
    text-align: center;
    font-size: 1.125rem;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
  }

  .dq-pipe-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .dq-pipe-col {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }

  .dq-pipe-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-tertiary);
    margin-bottom: 0.125rem;
  }

  .dq-pipe-box {
    padding: 0.5rem 1rem;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-align: center;
    min-width: 90px;
  }

  .dq-pipe-agents {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .dq-pipe-agent {
    border-color: rgba(13, 148, 136, 0.4);
    color: var(--teal-text);
  }

  .dq-pipe-context {
    max-width: 230px;
    font-size: 0.6875rem;
    color: var(--text-tertiary);
    text-align: center;
    line-height: 1.45;
  }

  .dq-pipe-gate {
    background: var(--surface-navy);
    border-color: var(--eflury-navy);
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .dq-pipe-gate small {
    font-weight: 400;
    font-size: 0.6875rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .dq-pipe-out {
    border-color: rgba(13, 148, 136, 0.4);
    background: rgba(13, 148, 136, 0.07);
    color: var(--text-primary);
  }

  .dq-pipe-link {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--teal-text);
    white-space: nowrap;
  }

  .dq-market {
    margin-top: 3rem;
    padding: 1.75rem 2rem;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 16px;
  }

  .dq-market h3 {
    margin: 0 0 0.875rem;
    font-size: 1.125rem;
    color: var(--text-primary);
  }

  .dq-market-line {
    margin: 0 0 0.5rem;
    color: var(--text-secondary);
    font-size: 0.9375rem;
    line-height: 1.6;
  }

  .dq-market-line strong {
    color: var(--text-primary);
  }

  .dq-market-others {
    font-size: 0.875rem;
    color: var(--text-tertiary);
  }

  .dq-market-note {
    margin: 0.875rem 0 0;
    padding-top: 0.875rem;
    border-top: 1px dashed var(--border-color);
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.65;
  }

  @media (max-width: 860px) {
    .container {
      padding: 0 1.25rem;
    }

    .dq-metrics {
      grid-template-columns: 1fr;
    }

    .dq-merge {
      flex-direction: column;
      align-items: stretch;
    }

    .dq-merge-arrow {
      text-align: center;
      transform: rotate(90deg);
    }

    .dq-pipe-flow {
      flex-direction: column;
    }

    .dq-pipe-link {
      padding: 0.125rem 0;
    }
  }`}</style>
      <section className="dq-showcase">
        <div className="container">
          <h2>{t.sectionTitle}</h2>
          <p className="dq-intro">{t.sectionIntro}</p>
      
          {/* Step 1: dirty table with findings */}
          <div className="dq-step">
            <h3><span className="dq-step-num">1</span>{t.step1}</h3>
            <div className="dq-table-wrap">
              <table className="dq-table">
                <thead>
                  <tr>
                    <th>{t.colName}</th>
                    <th>{t.colCity}</th>
                    <th>{t.colUid}</th>
                    <th>{t.colPhone}</th>
                  </tr>
                </thead>
                <tbody>
                  {dirtyRows.map((r, i) => (
                    <tr key={`${r.name}-${i}`} className={r.dup ? 'dup-a' : r.dup2 ? 'dup-b' : ''}>
                      <td>{r.name} {(r.dup || r.dup2) && <span className="chip chip-red">{t.tagDup}</span>}</td>
                      <td>{r.city || <span className="missing">—</span>}</td>
                      <td>{r.uid ? r.uid : <span className="chip chip-amber">{t.tagUid}</span>}</td>
                      <td>
                        {r.phone}
                        {r.issues.includes('format') && <span className="chip chip-amber">{t.tagFormat}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      
          {/* Step 2: merge proposal + review gate */}
          <div className="dq-step">
            <h3><span className="dq-step-num">2</span>{t.step2}</h3>
            <div className="dq-proposal">
              <div className="dq-proposal-head">
                <strong>{t.proposalTitle}</strong>
                <p>{t.proposalWhy}</p>
              </div>
              <div className="dq-merge">
                <div className="dq-merge-sources">
                  <div className="dq-mini">Müller AG</div>
                  <div className="dq-mini">Mueller AG</div>
                  <div className="dq-mini">Müller AG, Grenchen</div>
                </div>
                <div className="dq-merge-arrow" aria-hidden="true">→</div>
                <div className="dq-golden">
                  <span className="dq-golden-badge">{t.goldenLabel}</span>
                  <div className="dq-golden-body">
                    <div><strong>Müller AG</strong></div>
                    <div>Grenchen · CHE-123.456.789</div>
                    <div>+41 32 645 11 22</div>
                  </div>
                </div>
              </div>
              <div className="dq-gate">
                <span className="dq-gate-label">{t.reviewGate}</span>
                <span className="dq-btn dq-btn-approve">✓ {t.btnApprove}</span>
                <span className="dq-btn dq-btn-reject">✕ {t.btnReject}</span>
                <span className="dq-gate-note">{t.gateNote}</span>
              </div>
            </div>
          </div>
      
          {/* Step 3: metrics */}
          <div className="dq-step">
            <h3><span className="dq-step-num">3</span>{t.step3}</h3>
            <div className="dq-metrics">
              <div className="dq-metric">
                <span className="dq-metric-label">{t.m1Label}</span>
                <span className="dq-metric-vals"><s>14%</s> <span className="dq-arrow">→</span> <strong>0.8%</strong></span>
              </div>
              <div className="dq-metric">
                <span className="dq-metric-label">{t.m2Label}</span>
                <span className="dq-metric-vals"><s>23%</s> <span className="dq-arrow">→</span> <strong>2%</strong></span>
              </div>
              <div className="dq-metric">
                <span className="dq-metric-label">{t.m3Label}</span>
                <span className="dq-metric-vals"><s>{t.m3Before}</s> <span className="dq-arrow">→</span> <strong>{t.m3After}</strong></span>
              </div>
            </div>
            <p className="dq-disclaimer"><em>{t.illustrative}</em></p>
          </div>
      
          {/* Pipeline diagram */}
          <div className="dq-pipe">
            <h3>{t.pipeTitle}</h3>
            <div className="dq-pipe-flow">
              <div className="dq-pipe-col">
                <span className="dq-pipe-label">{t.pipeSources}</span>
                <div className="dq-pipe-box">bexio</div>
                <div className="dq-pipe-box">CRM</div>
                <div className="dq-pipe-box">Excel</div>
              </div>
              <div className="dq-pipe-link"><span>{t.pipeMcp}</span></div>
              <div className="dq-pipe-col">
                <span className="dq-pipe-label">{t.pipeAgents}</span>
                <div className="dq-pipe-agents">
                  {t.pipeAgentList.map((a) => (
                    <div key={a} className="dq-pipe-box dq-pipe-agent">
                      {a}
                    </div>
                  ))}
                </div>
                <span className="dq-pipe-context">{t.pipeContext}</span>
              </div>
              <div className="dq-pipe-link"><span aria-hidden="true">→</span></div>
              <div className="dq-pipe-col">
                <div className="dq-pipe-box dq-pipe-gate">
                  {t.pipeGate}
                  <small>{t.pipeGateSub}</small>
                </div>
              </div>
              <div className="dq-pipe-link"><span aria-hidden="true">→</span></div>
              <div className="dq-pipe-col">
                <div className="dq-pipe-box dq-pipe-out">{t.pipeOut1}</div>
                <div className="dq-pipe-box dq-pipe-out">{t.pipeOut2}</div>
              </div>
            </div>
          </div>
      
          {/* Market context: Gartner-evaluated enterprise landscape (not our stack) */}
          <div className="dq-market">
            <h3>{t.mktTitle}</h3>
            <p className="dq-market-line"><strong>{t.mktLeadersLabel}</strong> {mqLeaders.join(' · ')}</p>
            <p className="dq-market-line dq-market-others">{t.mktOthersLabel} {mqOthers.join(', ')}</p>
            <p className="dq-market-note">{t.mktNote}</p>
          </div>
        </div>
      </section>
    </>
  );
}
