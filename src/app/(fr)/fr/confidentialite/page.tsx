import type { Metadata } from 'next';
import { LegalPage } from '@/components/personal/LegalPage';
import { alternates, PAGES } from '@/lib/i18n';
import { ADDRESS, PERSON } from '@/lib/site';

const DESCRIPTION =
  'Comment eflury.com traite les données personnelles : pas de cookies, pas d’analyse d’audience, aucun suivi ; une newsletter facultative avec double confirmation. Hébergé par Google.';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: DESCRIPTION,
  alternates: alternates(PAGES.privacy, 'fr'),
  openGraph: {
    type: 'website',
    url: PAGES.privacy.fr,
    title: 'Politique de confidentialité · Emanuel Flury',
    description: DESCRIPTION,
    siteName: 'Emanuel Flury',
    locale: 'fr_CH',
  },
  robots: { index: false, follow: true },
};

/* French twin of /en/privacy/ and /de/datenschutz/. Keep all three in step with what the site does. */
export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité" updated="13 novembre 2026" lang="fr" alts={PAGES.privacy}>
      <p>
        Cette politique explique quelles données personnelles ce site traite, dans quel but et pendant combien de temps.
        Elle suit la loi fédérale suisse sur la protection des données (LPD) et, lorsqu’il s’applique, le règlement
        général sur la protection des données de l’UE (RGPD).
      </p>

      <h2>1. Responsable</h2>
      <address>
        {PERSON.name}, {ADDRESS.streetAddress}, {ADDRESS.postalCode} {ADDRESS.addressLocality}, Suisse
        <br />
        <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a> · {PERSON.telephoneDisplay}
      </address>
      <p>
        Il n’y a pas de conseiller à la protection des données ; pour toute question sur vos données, écrivez à
        l’adresse ci-dessus.
      </p>

      <h2>2. En bref</h2>
      <ul>
        <li>Pas de cookies, pas de stockage local, pas d’analyse d’audience, aucun suivi, aucune publicité.</li>
        <li>
          Pas de comptes utilisateurs. Le seul formulaire est l’inscription facultative à la newsletter ; votre adresse
          e-mail n’est conservée que si vous la confirmez.
        </li>
        <li>Le site est hébergé par Google aux Pays-Bas ; les journaux techniques sont conservés 30 jours.</li>
        <li>Les aperçus des vidéos YouTube se chargent depuis Google ; une vidéo ne se charge que si vous cliquez dessus.</li>
        <li>L’e-mail et WhatsApp sont de simples liens. Vous décidez si vous les utilisez.</li>
      </ul>

      <h2>3. Visite du site : hébergement et journaux du serveur</h2>
      <p>
        Le site fonctionne sur Firebase App Hosting, un service de Google Cloud (Google Ireland Limited / Google LLC),
        dans la région de centres de données de Google aux Pays-Bas (europe-west4). Chaque visite est enregistrée
        techniquement : adresse IP, date et heure, page demandée, page de provenance, navigateur et système
        d’exploitation. C’est nécessaire pour diffuser le site, en assurer la sécurité et détecter les erreurs (intérêt
        légitime ; art. 6, par. 1, let. f RGPD). Les journaux sont supprimés après 30 jours. Google traite ces données
        pour le compte du propriétaire du site et peut y accéder depuis d’autres pays, y compris les États-Unis, sur la
        base du Swiss-U.S. et de l’EU-U.S. Data Privacy Framework ainsi que de clauses contractuelles types. Voir les{' '}
        <a href="https://cloud.google.com/terms/data-processing-addendum" target="_blank" rel="noopener">
          conditions de traitement des données de Google
        </a>
        .
      </p>

      <h2>4. Rien n’est enregistré sur votre appareil</h2>
      <p>
        Le site ne dépose aucun cookie et n’utilise pas de stockage local. Les polices, scripts et images sont servis par
        le site lui-même ; la seule exception est décrite au chiffre 5.
      </p>

      <h2>5. YouTube</h2>
      <p>
        La section YouTube affiche des images d’aperçu de vidéos. Ces images se chargent depuis les serveurs de Google
        (i.ytimg.com) lorsque la section devient visible ; votre navigateur transmet alors votre adresse IP à Google. Une
        vidéo ne se charge que si vous cliquez dessus, et alors depuis youtube-nocookie.com, le mode de YouTube qui ne
        dépose pas de cookies tant que vous ne lancez pas la vidéo. À partir de là, la{' '}
        <a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noopener">
          politique de confidentialité de Google
        </a>{' '}
        s’applique.
      </p>

      <h2>6. Contact par e-mail et WhatsApp</h2>
      <p>
        Si vous écrivez un e-mail ou un message WhatsApp, vos coordonnées et votre message ne servent qu’à vous répondre
        (mesures précontractuelles ou intérêt légitime ; art. 6, par. 1, let. b et f RGPD). La boîte e-mail est hébergée
        par Apple (iCloud Mail). WhatsApp est un service de Meta Platforms Ireland Ltd. ; son utilisation relève de votre
        choix, et la{' '}
        <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener">
          politique de confidentialité de WhatsApp
        </a>{' '}
        s’applique à la conversation. Les messages sont supprimés une fois l’échange terminé, sauf obligation légale de
        conservation.
      </p>

      <h2>7. Carte de contact et code QR</h2>
      <p>
        La carte de contact (vCard) et le code QR contiennent les coordonnées d’Emanuel Flury. Télécharger la carte ou
        scanner le code ne transmet rien vous concernant ; les données sont enregistrées uniquement sur votre appareil.
      </p>

      <h2 id="newsletter">8. Newsletter</h2>
      <p>
        Vous pouvez vous abonner pour recevoir les nouvelles notes par e-mail. Pour cela, vous saisissez votre adresse
        e-mail. Vous recevez ensuite un e-mail contenant un lien de confirmation (double opt-in) ; vous n’êtes inscrit
        qu’après avoir cliqué dessus. La base légale est votre consentement (art. 6, par. 1, let. a RGPD), que vous
        pouvez retirer à tout moment.
      </p>
      <p>
        Sont enregistrés : votre adresse e-mail, la langue dans laquelle vous vous êtes inscrit, la date de l’inscription
        et de la confirmation, ainsi qu’un code aléatoire pour le lien de désabonnement. Les inscriptions non confirmées
        sont supprimées automatiquement après 7 jours. Pour prévenir les abus, le nombre d’inscriptions par jour est
        compté à l’aide d’un code irréversible calculé à partir de votre adresse IP et de la date ; l’adresse IP
        elle-même n’est pas enregistrée et le compteur est supprimé après deux jours.
      </p>
      <p>
        Les données sont stockées dans Google Cloud Firestore, dans le centre de données de Google à Zurich, en Suisse
        (europe-west6), dans le projet propre à ce site ; elles ne sont transmises à aucun service de newsletter. Les
        e-mails sont envoyés depuis la propre boîte d’Emanuel Flury, me@eflury.com, hébergée par Apple (iCloud Mail).
        Google et Apple traitent les données pour le compte du propriétaire du site. Les e-mails ne contiennent ni pixel espion ni liens de suivi.
      </p>
      <p>
        Chaque e-mail contient un lien de désabonnement. Lorsque vous vous désabonnez, votre adresse e-mail est supprimée
        immédiatement. Vous pouvez aussi vous désabonner en écrivant à{' '}
        <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>.
      </p>

      <h2>9. Flux RSS</h2>
      <p>
        Les notes sont aussi disponibles sous forme de flux RSS : <a href={PAGES.rss.fr}>eflury.com/fr/rss.xml</a>{' '}
        (français), <a href={PAGES.rss.de}>eflury.com/de/rss.xml</a> (allemand) et{' '}
        <a href={PAGES.rss.en}>eflury.com/rss.xml</a> (anglais). Un lecteur de flux le consulte comme n’importe quelle
        autre page (voir chiffre 3) ; rien d’autre n’est enregistré.
      </p>

      <h2>10. Liens vers les réseaux sociaux</h2>
      <p>
        Les liens vers LinkedIn, Instagram, TikTok, YouTube, Facebook, GitHub et WhatsApp sont de simples liens. Aucune
        donnée n’est transmise à ces réseaux tant que vous ne cliquez pas sur un lien ; ensuite, leurs politiques de
        confidentialité s’appliquent.
      </p>

      <h2>11. Sécurité</h2>
      <p>
        Le site n’est diffusé que par une connexion chiffrée (HTTPS avec HSTS). Il n’y a ni comptes utilisateurs ni base
        de données des visiteurs. La liste de la newsletter ne peut être lue que par le site lui-même et par son
        propriétaire ; elle n’est pas accessible depuis Internet.
      </p>

      <h2>12. Vos droits</h2>
      <p>
        Vous pouvez demander des informations sur les données personnelles vous concernant ainsi que leur rectification ou
        leur suppression. Vous pouvez vous opposer au traitement et, selon le RGPD, en demander la limitation ou la
        portabilité. Écrivez à <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>. Vous pouvez aussi déposer une
        plainte auprès du{' '}
        <a href="https://www.edoeb.admin.ch/fr" target="_blank" rel="noopener">
          Préposé fédéral à la protection des données et à la transparence (PFPDT)
        </a>{' '}
        ou d’une autorité de protection des données de l’UE.
      </p>
      <p>Aucune décision individuelle automatisée n’est prise et aucun profil n’est établi.</p>

      <h2>13. Modifications</h2>
      <p>
        Cette politique est mise à jour lorsque le site change. La version publiée sur cette page fait toujours foi. En
        cas de divergence entre les versions linguistiques, la version allemande fait foi.
      </p>
    </LegalPage>
  );
}
