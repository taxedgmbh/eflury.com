import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

/**
 * Which illustration belongs to which page, taken from the Astro call sites so
 * each drawing lands where it was drawn for.
 *
 * Only pages built from templates or data appear here. The long-form pages
 * already carry their illustration inline in the extracted HTML, in the
 * position it was composed for, so registering them too would render it twice.
 *
 * Loaded lazily: the artwork is decorative, several pieces are 60–180 lines of
 * SVG, and none of it belongs in the critical path of a content page.
 */
const REGISTRY: Record<string, ComponentType> = {
  'page:pricing': dynamic(() => import('@/components/illustrations/CreditMathVisual').then((m) => m.CreditMathVisual)),
  'service:mcp-integration': dynamic(() => import('@/components/illustrations/ConnectedSystemsIllustration').then((m) => m.ConnectedSystemsIllustration)),
  'service:power-bi': dynamic(() => import('@/components/illustrations/DashboardIllustration').then((m) => m.DashboardIllustration)),
  'service:finanzen-automatisierung': dynamic(() => import('@/components/illustrations/InvoiceFlowIllustration').then((m) => m.InvoiceFlowIllustration)),
  'service:ki-betrieb': dynamic(() => import('@/components/illustrations/OpsConsoleIllustration').then((m) => m.OpsConsoleIllustration)),
  'service:claude-skills': dynamic(() => import('@/components/illustrations/SkillCardsIllustration').then((m) => m.SkillCardsIllustration)),
  'index:branchen': dynamic(() => import('@/components/illustrations/FloorPlanIllustration').then((m) => m.FloorPlanIllustration)),
  'index:case-studies': dynamic(() => import('@/components/illustrations/ResultsWallVisual').then((m) => m.ResultsWallVisual)),
  'index:services': dynamic(() => import('@/components/illustrations/LifecycleOrbitIllustration').then((m) => m.LifecycleOrbitIllustration)),
};

export function illustrationFor(key: string): ComponentType | undefined {
  return REGISTRY[key];
}
