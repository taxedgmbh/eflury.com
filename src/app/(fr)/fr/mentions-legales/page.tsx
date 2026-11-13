import type { Metadata } from 'next';
import { LegalPage } from '@/components/personal/LegalPage';
import { REGISTRY } from '@/components/personal/data';
import { alternates, PAGES } from '@/lib/i18n';
import { ADDRESS, PERSON } from '@/lib/site';

const DESCRIPTION = 'Mentions légales d’eflury.com, le site personnel d’Emanuel Flury, Granges (Grenchen), Suisse.';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: DESCRIPTION,
  alternates: alternates(PAGES.imprint, 'fr'),
  openGraph: {
    type: 'website',
    url: PAGES.imprint.fr,
    title: 'Mentions légales · Emanuel Flury',
    description: DESCRIPTION,
    siteName: 'Emanuel Flury',
    locale: 'fr_CH',
  },
  robots: { index: false, follow: true },
};

const CANTON: Record<string, string> = { Bern: 'Berne', Solothurn: 'Soleure' };

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales" updated="13 novembre 2026" lang="fr" alts={PAGES.imprint}>
      <h2>Responsable de ce site</h2>
      <address>
        {PERSON.name}
        <br />
        {ADDRESS.streetAddress}
        <br />
        {ADDRESS.postalCode} {ADDRESS.addressLocality}
        <br />
        Suisse
      </address>
      <ul className="legal-contact">
        <li>
          E-mail : <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        </li>
        <li>
          Téléphone et WhatsApp : <a href={`tel:${PERSON.telephone}`}>{PERSON.telephoneDisplay}</a>
        </li>
      </ul>
      <p>
        Emanuel Flury est responsable du contenu de ce site. Il s’agit de son site personnel : il ne vend rien, n’est
        exploité par aucune société et ne constitue pas une offre commerciale.
      </p>

      <h2>Entreprises mentionnées sur ce site</h2>
      <p>
        Les entreprises disposent de leurs propres sites et mentions légales. Leurs inscriptions au registre du commerce
        sont publiques :
      </p>
      <ul>
        <li>
          <strong>Skopa AG</strong>, Granges, IDE {REGISTRY.skopa.uid}, registre du commerce du canton de{' '}
          {CANTON[REGISTRY.skopa.canton]} (
          <a href={REGISTRY.skopa.zefix} target="_blank" rel="noopener">
            Zefix
          </a>
          ,{' '}
          <a href="https://skopa.ai" target="_blank" rel="noopener">
            skopa.ai
          </a>
          )
        </li>
        <li>
          <strong>Taxed GmbH</strong>, Bienne, IDE {REGISTRY.taxed.uid}, registre du commerce du canton de{' '}
          {CANTON[REGISTRY.taxed.canton]} (
          <a href={REGISTRY.taxed.zefix} target="_blank" rel="noopener">
            Zefix
          </a>
          ,{' '}
          <a href="https://taxed.ch" target="_blank" rel="noopener">
            taxed.ch
          </a>
          )
        </li>
        <li>
          <strong>EF Real Estate</strong> est le nom sous lequel Emanuel Flury détient des biens résidentiels à titre
          privé. Ce n’est pas une société et il n’est pas inscrit au registre du commerce.
        </li>
      </ul>

      <h2>Aucun conseil</h2>
      <p>
        Rien sur ce site ne constitue un conseil fiscal, juridique, financier ou en placement. Pour un conseil adapté à
        votre situation, adressez-vous à un spécialiste qualifié.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Le contenu de ce site est rédigé avec soin, mais aucune garantie n’est donnée quant à son exactitude, son
        exhaustivité ou son actualité. Dans la mesure permise par la loi, toute responsabilité pour des dommages
        résultant de l’utilisation de ce site ou de sites liés est exclue.
      </p>

      <h2>Liens</h2>
      <p>
        Ce site renvoie vers d’autres sites. Leurs exploitants sont seuls responsables de leur contenu. Suivre un lien se
        fait à vos propres risques.
      </p>

      <h2>Droits d’auteur</h2>
      <p>
        Les textes, photos, vidéos et graphiques de ce site appartiennent à Emanuel Flury, sauf mention contraire. Les
        logos de Skopa et de Taxed appartiennent à leurs sociétés. Le matériel du dossier de presse peut être utilisé selon les{' '}
        <a href={PAGES.terms.fr}>conditions d’utilisation</a> ; toute autre utilisation requiert une autorisation écrite
        préalable.
      </p>

      <h2>Protection des données</h2>
      <p>
        La manière dont ce site traite les données personnelles est décrite dans la{' '}
        <a href={PAGES.privacy.fr}>politique de confidentialité</a>.
      </p>
    </LegalPage>
  );
}
