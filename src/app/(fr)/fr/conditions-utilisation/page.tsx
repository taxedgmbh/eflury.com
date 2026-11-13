import type { Metadata } from 'next';
import { LegalPage } from '@/components/personal/LegalPage';
import { alternates, PAGES } from '@/lib/i18n';
import { PERSON } from '@/lib/site';

const DESCRIPTION =
  'Conditions d’utilisation d’eflury.com, y compris l’utilisation des biographies, photos, logos et de la vidéo du dossier de presse.';

export const metadata: Metadata = {
  title: 'Conditions d’utilisation',
  description: DESCRIPTION,
  alternates: alternates(PAGES.terms, 'fr'),
  openGraph: {
    type: 'website',
    url: PAGES.terms.fr,
    title: 'Conditions d’utilisation · Emanuel Flury',
    description: DESCRIPTION,
    siteName: 'Emanuel Flury',
    locale: 'fr_CH',
  },
  robots: { index: false, follow: true },
};

export default function ConditionsPage() {
  return (
    <LegalPage title="Conditions d’utilisation" updated="13 novembre 2026" lang="fr" alts={PAGES.terms}>
      <p>
        Ces conditions s’appliquent à l’utilisation d’eflury.com, le site personnel de {PERSON.name}. En utilisant le
        site, vous les acceptez.
      </p>

      <h2>1. Objet du site</h2>
      <p>
        Le site présente Emanuel Flury et les entreprises auxquelles il participe. Il a un but purement informatif. Il
        ne contient aucune offre et ne crée aucun contrat.
      </p>

      <h2>2. Aucun conseil</h2>
      <p>
        Rien sur ce site ne constitue un conseil fiscal, juridique, financier ou en placement, y compris lorsqu’il est
        question de fiscalité, d’immobilier ou de technologie. Les décisions que vous prenez sur la base de ce site
        relèvent de votre propre responsabilité.
      </p>

      <h2>3. Droits d’auteur</h2>
      <p>
        Tous les textes, photos, vidéos, graphiques et le logo EF sont protégés par le droit d’auteur et appartiennent à
        Emanuel Flury, sauf mention contraire. Les logos de Skopa et de Taxed appartiennent à Skopa AG et à Taxed GmbH.
        À l’exception du dossier de presse (chiffre 4), rien ne peut être copié, modifié ou publié sans autorisation écrite
        préalable.
      </p>

      <h2>4. Dossier de presse</h2>
      <p>
        Les biographies, photos, le jeu de logos, la vidéo d’introduction et la carte de contact du dossier de presse peuvent
        être utilisés gratuitement :
      </p>
      <ul>
        <li>pour des articles, reportages, programmes d’événements et présentations concernant Emanuel Flury ou ses entreprises ;</li>
        <li>avec la mention « Photo : Emanuel Flury » pour les photos ;</li>
        <li>sans modification autre que le recadrage et le redimensionnement, et avec les biographies citées telles quelles ou raccourcies ;</li>
        <li>pas d’une manière laissant croire qu’Emanuel Flury recommande un produit, un service, un parti ou une opinion ;</li>
        <li>pas à des fins publicitaires, ni dans un contexte qui nuirait à sa réputation.</li>
      </ul>
      <p>
        Pour tout autre usage, écrivez à <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>.
      </p>

      <h2>5. Liens</h2>
      <p>Les liens vers d’autres sites sont fournis par commodité. Leurs exploitants sont seuls responsables de leur contenu.</p>

      <h2>6. Responsabilité</h2>
      <p>
        Le site est fourni tel quel, sans garantie d’exactitude, d’exhaustivité, d’actualité ou de disponibilité
        permanente. Dans la mesure permise par la loi, toute responsabilité est exclue.
      </p>

      <h2>7. Protection des données</h2>
      <p>
        Le traitement des données personnelles est décrit dans la{' '}
        <a href={PAGES.privacy.fr}>politique de confidentialité</a>.
      </p>

      <h2>8. Modifications</h2>
      <p>Ces conditions peuvent être modifiées à tout moment. La version publiée sur cette page fait foi.</p>

      <h2>9. Droit applicable et for</h2>
      <p>Le droit suisse est applicable. Le for est à Granges (Grenchen), Suisse, sauf disposition légale impérative contraire.</p>

      <p>En cas de divergence entre les versions, la version allemande fait foi.</p>
    </LegalPage>
  );
}
