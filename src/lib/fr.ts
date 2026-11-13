/*
 * French (Swiss) for every English string passed to pick(). Keyed by the
 * English text exactly as it appears in the component; a missing key fails
 * the build. Style: vous; Swiss French usage (e-mail, CHF 120'000, Granges for
 * Grenchen, Bienne for Biel); typographic apostrophe ’; a narrow no-break
 * space (U+202F) before : ; ? ! and a no-break space inside « » and before %,
 * so the punctuation never wraps onto a line of its own.
 */
export const FR: Record<string, string> = {
  // Header, menus, footer
  'Skip to content': 'Aller au contenu',
  Main: 'Navigation principale',
  Menu: 'Menu',
  Ventures: 'Entreprises',
  About: 'À propos',
  Contact: 'Contact',
  Overview: 'Vue d’ensemble',
  'Three businesses. One standard.': 'Trois entreprises. Une même exigence.',
  'How technology, tax and real estate fit together.': 'Comment la technologie, la fiscalité et l’immobilier s’articulent.',
  Technology: 'Technologie',
  Tax: 'Fiscalité',
  'Artificial intelligence and quantum computing.': 'Intelligence artificielle et informatique quantique.',
  'Tax advice for expats living in Switzerland.': 'Conseil fiscal pour les expatriés vivant en Suisse.',
  'Residential property held as private equity.': 'Immobilier résidentiel détenu en private equity.',
  'Start a conversation': 'Engager la conversation',
  'Entrepreneur · Grenchen': 'Entrepreneur · Granges',
  Life: 'Vivre',
  Lessons: 'Apprendre',
  'Building companies': 'Créer des entreprises',
  'My story': 'Mon parcours',
  'Where I come from and what I work on.': 'D’où je viens et ce sur quoi je travaille.',
  Private: 'Privé',
  'Beyond work: French and sailing.': 'Au-delà du travail : le français et la voile.',
  Notes: 'Notes',
  'What I learn while building, also by email.': 'Ce que j’apprends en construisant, aussi par e-mail.',
  'Press kit': 'Dossier de presse',
  'Bios, portrait and contact card.': 'Biographies, portrait et carte de visite numérique.',
  Follow: 'Suivre',
  'Back to top': 'Haut de page',
  Legal: 'Informations légales',
  "Let’s talk.": 'Parlons-en.',
  'For conversations, partnerships or media requests.': 'Pour un échange, un partenariat ou une demande des médias.',
  'Send an email': 'Envoyer un e-mail',
  'Connect on LinkedIn': 'Se connecter sur LinkedIn',
  "QR code with Emanuel Flury's contact card": 'Code QR avec la carte de contact d’Emanuel Flury',
  'Save my contact': 'Enregistrer mon contact',
  'Scan the code with your phone camera to add name, photo, mobile, WhatsApp, email, address and website to your contacts.':
    'Scannez le code avec l’appareil photo de votre téléphone pour ajouter nom, photo, mobile, WhatsApp, e-mail, adresse et site web à vos contacts.',
  'Add name, photo, mobile, WhatsApp, email, address and website to your contacts.':
    'Ajoutez nom, photo, mobile, WhatsApp, e-mail, adresse et site web à vos contacts.',
  'Save contact': 'Enregistrer le contact',
  'RSS feed': 'Flux RSS',
  Language: 'Langue',
  'Last updated': 'Mise à jour',

  // Hero
  ENTREPRENEUR: 'ENTREPRENEUR',
  'I build companies where finance, tax and technology meet.':
    'Je crée des entreprises à la croisée de la finance, de la fiscalité et de la technologie.',
  since: 'depuis',
  '3 properties': '3 biens immobiliers',
  'What I build': 'Ce que je construis',
  'Get in touch': 'Me contacter',

  // Ventures
  'Skopa and Taxed each have their own website. This is where all three come together.':
    'Skopa et Taxed ont chacune leur propre site. C’est ici que les trois se rejoignent.',
  'Artificial intelligence and quantum computing. Role: Directeur général.':
    'Intelligence artificielle et informatique quantique. Fonction : directeur général.',
  'Tax advice for expats living in Switzerland, with an office in Biel/Bienne. Role: Directeur général (mandat).':
    'Conseil fiscal pour les expatriés vivant en Suisse, avec un bureau à Bienne. Fonction : directeur général (mandat).',
  'Residential property held as private equity. Role: Propriétaire.':
    'Immobilier résidentiel détenu en private equity. Fonction : propriétaire.',
  'Discover Skopa': 'Découvrir Skopa',
  'Get tax advice': 'Demander un conseil fiscal',
  'See the properties': 'Voir les biens',
  Founded: 'Fondée en',
  'Canton of': 'canton de',
  'Commercial register': 'Registre du commerce',
  'Privately held · not a company': 'Détenu à titre privé · pas une société',
  'Working on something in technology, tax or property? Let’s talk about it.':
    'Vous avez un projet dans la technologie, la fiscalité ou l’immobilier ? Parlons-en.',

  // Real estate
  'Private equity in residential property.': 'Private equity dans l’immobilier résidentiel.',
  'Own home': 'Résidence principale',
  'Lebern district · Canton of Solothurn': 'District du Lebern · canton de Soleure',
  'Where I live.': 'Là où je vis.',
  'Rental house': 'Maison en location',
  'Wasseramt district · Canton of Solothurn': 'District de Wasseramt · canton de Soleure',
  'A house I rent out.': 'Une maison que je loue.',
  Apartment: 'Appartement en location',
  'Seeland · Canton of Bern': 'Seeland · canton de Berne',
  'An apartment I rent out.': 'Un appartement que je loue.',
  'Deliberately without addresses, tenants or figures.': 'Volontairement sans adresses, locataires ni chiffres.',
  'The house in summer, with the Jura behind': 'La maison en été, le Jura en arrière-plan',
  'The house from the garden': 'La maison vue du jardin',
  'Living room with oak floor and a view of the garden': 'Séjour avec parquet en chêne et vue sur le jardin',
  'New kitchen cabinets': 'Nouveaux meubles de cuisine',
  'Renovated garage with laundry corner': 'Garage rénové avec coin buanderie',
  'The rental house from the garden': 'La maison en location vue du jardin',
  'Bedroom with two windows and oak floor': 'Chambre avec deux fenêtres et parquet en chêne',
  'Room under the white beamed ceiling': 'Pièce sous le plafond à poutres blanches',
  'Room looking onto the garden': 'Pièce donnant sur le jardin',
  'Room with oak floor, renovated': 'Pièce rénovée avec parquet en chêne',
  'Terrace and garden': 'Terrasse et jardin',
  'The apartment building in evening light': 'L’immeuble dans la lumière du soir',
  'Living room with balcony door': 'Séjour avec porte-fenêtre sur le balcon',
  'Living room with stone accent wall': 'Séjour avec mur en pierre',
  'Renovated kitchen': 'Cuisine rénovée',
  'Bedroom with new floor': 'Chambre avec nouveau sol',
  'Bathroom with bathtub': 'Salle de bains avec baignoire',

  // On my radar
  'On my radar': 'Sur mon radar',
  'What matters now in tech, tax and real estate.': 'Ce qui compte aujourd’hui en technologie, fiscalité et immobilier.',
  'The questions I hear most often from founders, expats and property owners, answered in plain language. Updated November 2026.':
    'Les questions les plus fréquentes sur la création d’entreprise, la fiscalité des expatriés et la propriété du logement, expliquées simplement. Mise à jour : novembre 2026.',
  'AI agents': 'Agents IA',
  'Are AI agents ready for Swiss SMEs?': 'Les agents IA sont-ils prêts pour les PME suisses ?',
  'Yes, for well-defined work: start with one repetitive process, set clear limits and keep a human approval for anything that costs money or goes to a client.':
    'Oui, pour des tâches bien définies : commencer par un processus répétitif, fixer des limites claires et faire valider par une personne tout ce qui coûte de l’argent ou part chez un client.',
  'ai-agents-swiss-smes': 'agents-ia-pme',
  'Quantum computing': 'Informatique quantique',
  'Why should a business think about quantum computing now?':
    'Pourquoi une entreprise devrait-elle s’intéresser dès maintenant à l’informatique quantique ?',
  'Because of encryption: data copied today can be decrypted later. NIST published the first post-quantum standards in August 2024, and the first step is an inventory.':
    'À cause du chiffrement : des données interceptées aujourd’hui pourront être déchiffrées demain. Le NIST a publié les premières normes post-quantiques en août 2024. La première étape est un inventaire.',
  'quantum-computing-encryption': 'informatique-quantique-chiffrement',
  'Real estate · Tax': 'Immobilier · Fiscalité',
  'What does the end of the Eigenmietwert mean for homeowners?':
    'Que change la suppression de la valeur locative pour les propriétaires ?',
  'From 1 January 2029 the imputed rental value goes, and with it most deductions for your own home. Until the end of 2028 the old rules still apply.':
    'Dès le 1er janvier 2029, la valeur locative disparaît, et avec elle la plupart des déductions pour le logement occupé par son propriétaire. Jusqu’à fin 2028, les règles actuelles s’appliquent encore.',
  'eigenmietwert-abolition': 'suppression-valeur-locative',
  'Expat tax': 'Fiscalité des expatriés',
  'Do expats taxed at source have to file a tax return?':
    'Les expatriés imposés à la source doivent-ils remplir une déclaration d’impôt ?',
  'Above CHF 120,000 gross salary, yes. Below it you can apply by 31 March of the following year, which often pays off with pillar 3a or childcare costs.':
    "Au-delà de CHF 120'000 de salaire brut, oui. En dessous, vous pouvez la demander jusqu’au 31 mars de l’année suivante – souvent intéressant avec un pilier 3a ou des frais de garde d’enfants.",
  'expat-withholding-tax-return': 'impot-a-la-source-declaration-expats',
  'Read the full answer': 'Lire la réponse complète',
  'General information, not individual tax or investment advice.':
    'Informations générales, pas un conseil fiscal ou financier individuel.',
  'All notes': 'Toutes les notes',

  // YouTube
  'On YouTube.': 'Sur YouTube.',
  'Start with the 70-second intro. New videos appear here automatically.':
    'Commencez par l’intro de 70 secondes (en anglais). Les nouvelles vidéos apparaissent ici automatiquement.',
  Subscribe: 'S’abonner',
  'Open channel': 'Voir la chaîne',
  'The video only loads from YouTube when you click play.':
    'La vidéo n’est chargée depuis YouTube que lorsque vous cliquez sur lecture.',

  // About
  'Life · Lessons · Building companies': 'Vivre · Apprendre · Créer des entreprises',
  'Trained in finance. Shaped by automation. Now building.':
    'Formé à la finance. Façonné par l’automatisation. Aujourd’hui entrepreneur.',
  'I bring together three things that rarely meet: a degree in finance, years of automating finance processes in large organisations, and the step into building my own companies.':
    'Je réunis trois choses qui se rencontrent rarement : des études en finance, des années d’automatisation de processus financiers dans de grandes entreprises, et le pas vers la création de mes propres sociétés.',
  'Foundation · 2012–2016': 'Formation · 2012–2016',
  Finance: 'Finance',
  'Master of Arts in Economics-Finance from the University of Aberdeen, with Upper Second Class Honours (2:1), including an exchange year at the University of Wisconsin–La Crosse (2013–2014). Plus a certificate as a tax specialist.':
    'Master of Arts in Economics-Finance de l’Université d’Aberdeen, obtenu avec mention Upper Second Class Honours (2:1), y compris une année d’échange à l’Université du Wisconsin à La Crosse (2013–2014). S’y ajoute un certificat de spécialiste en fiscalité.',
  'Experience · 2017–2026': 'Expérience · 2017–2026',
  Automation: 'Automatisation',
  'Nine years in finance inside a global corporation: controlling, forecasting and transfer pricing first, then automating finance processes. That is where I learned to think in systems, not hours. Certified UiPath RPA Developer, Microsoft Power BI Data Analyst Associate and Alteryx Designer Core.':
    'Neuf ans dans la finance d’un groupe international : d’abord le contrôle de gestion, les prévisions et les prix de transfert, puis l’automatisation des processus financiers. C’est là que j’ai appris à penser en systèmes plutôt qu’en heures. Certifié UiPath RPA Developer, Microsoft Power BI Data Analyst Associate et Alteryx Designer Core.',
  'Today · since 2021': 'Aujourd’hui · depuis 2021',
  Entrepreneur: 'Entrepreneur',
  'Founded Taxed GmbH in 2021 and Skopa AG in 2026. Today Directeur général of Skopa AG, Directeur général (mandat) of Taxed GmbH and propriétaire of EF Real Estate.':
    'Fondation de Taxed GmbH en 2021 et de Skopa AG en 2026. Aujourd’hui directeur général de Skopa AG, directeur général (mandat) de Taxed GmbH et propriétaire d’EF Real Estate.',
  'On the road': 'En route',
  'Emanuel Flury on a terrace at night, city behind': 'Emanuel Flury sur une terrasse la nuit, la ville en arrière-plan',
  'Emanuel Flury leaning on a railing above the city': 'Emanuel Flury accoudé à une rambarde au-dessus de la ville',
  'Emanuel Flury at a restaurant table, thinking': 'Emanuel Flury pensif à une table de restaurant',
  'Emanuel Flury smiling in an airport hall': 'Emanuel Flury souriant dans un hall d’aéroport',
  'Emanuel Flury in an airport terminal': 'Emanuel Flury dans un terminal d’aéroport',
  'Emanuel Flury from behind at a street crossing, towers ahead':
    'Emanuel Flury de dos à un carrefour, des tours devant lui',

  // Private
  'Beyond work.': 'Au-delà du travail.',
  'Travel keeps me curious: new places, new cultures, new ways of doing things. Most of my best ideas start far from the desk.':
    'Les voyages entretiennent ma curiosité : de nouveaux lieux, de nouvelles cultures, de nouveaux regards. Mes meilleures idées naissent souvent loin du bureau.',
  'Currently learning': 'En apprentissage',
  'French, for the francophone world.': 'Le français, pour le monde francophone.',
  'I am studying French. It started as a passion for the francophone world and its way of life, and it is becoming a goal: to work, build and connect in French too. From Grenchen, the language border is close — Biel/Bienne, Switzerland’s largest bilingual city, is next door.':
    'J’apprends le français. Tout a commencé par une passion pour le monde francophone et son art de vivre ; c’est devenu un objectif : travailler, construire et nouer des liens en français aussi. Depuis Granges, la frontière linguistique est toute proche – Bienne, la plus grande ville bilingue de Suisse, est juste à côté.',
  'At sea · RYA Day Skipper': 'En mer · RYA Day Skipper',
  'Sailing the Strait of Gibraltar.': 'Naviguer dans le détroit de Gibraltar.',
  'RYA Day Skipper since 2024. From La Duquesa in Spain to Gibraltar on a sailing yacht: tankers at anchor, tidal streams, and position fixes worked out by hand on the paper chart. Sailing teaches what business does too — read the conditions, plan the route, adjust early.':
    'RYA Day Skipper depuis 2024. De La Duquesa, en Espagne, jusqu’à Gibraltar à bord d’un voilier : pétroliers au mouillage, courants de marée et positions relevées à la main sur la carte papier. La voile exige ce qu’exige aussi l’entreprise : lire les conditions, planifier la route, corriger tôt.',
  Sailing: 'Voile',
  Moments: 'Moments',
  'Private moments': 'Moments privés',
  'Emanuel Flury smiling on a beach by the sea': 'Emanuel Flury souriant sur une plage au bord de la mer',
  'Emanuel Flury at sunset, the sea behind him': 'Emanuel Flury au coucher du soleil, la mer derrière lui',
  'Emanuel Flury on a tuk-tuk ride': 'Emanuel Flury en tuk-tuk',
  'Emanuel Flury in the jungle at dusk': 'Emanuel Flury dans la jungle au crépuscule',
  'Emanuel Flury in a hotel garden, pool behind': 'Emanuel Flury dans le jardin d’un hôtel, la piscine en arrière-plan',
  'Emanuel Flury among banana palms at sunset': 'Emanuel Flury parmi les bananiers au coucher du soleil',
  'Emanuel Flury sailing in front of the Rock of Gibraltar': 'Emanuel Flury naviguant devant le rocher de Gibraltar',
  'Emanuel Flury in sailing gear on deck, leaving the harbour': 'Emanuel Flury en tenue de voile sur le pont, à la sortie du port',
  'Emanuel Flury looking up at the mast under sail': 'Emanuel Flury sous voile, le regard vers le mât',
  'A tanker at anchor in the Bay of Gibraltar, seen from the yacht':
    'Un pétrolier au mouillage dans la baie de Gibraltar, vu depuis le voilier',
  'Paper chart of the Strait of Gibraltar with plotted course and dividers':
    'Carte papier du détroit de Gibraltar avec la route tracée et le compas à pointes sèches',
  'Sailing yachts reflected in a calm marina at dawn': 'Des voiliers se reflètent dans une marina calme à l’aube',

  // Recommendations
  Recommendations: 'Recommandations',
  'What people say.': 'Ce qu’on dit de moi.',
  'Original quotes from LinkedIn recommendations, in English.':
    'Citations originales de recommandations LinkedIn, en anglais.',
  'All recommendations on LinkedIn': 'Toutes les recommandations sur LinkedIn',

  // Press kit
  Press: 'Presse',
  'For articles, events and introductions. Use the bios, photos and video as they are; for anything else, write to me.':
    'Pour des articles, des événements et des présentations. Les biographies, photos et la vidéo peuvent être utilisées telles quelles ; pour tout le reste, écrivez-moi.',
  'Short bio': 'Biographie courte',
  'Long bio': 'Biographie',
  'Copy short bio': 'Copier la biographie courte',
  'Copy long bio': 'Copier la biographie',
  Copied: 'Copié',
  'Intro video': 'Vidéo d’introduction',
  '70 seconds · on YouTube': '70 secondes · sur YouTube, en anglais',
  Portrait: 'Portrait',
  'Photo, city': 'Photo, ville',
  'Logo pack': 'Jeu de logos',
  'EF mark and wordmark, SVG': 'Symbole EF et logotype, SVG',
  'Contact card': 'Carte de contact',
  'vCard with photo, phone, WhatsApp and address': 'vCard avec photo, téléphone, WhatsApp et adresse',

  // Follow
  'Follow along': 'Restons en contact',
  'Follow the journey.': 'Suivez le parcours.',
  'What I learn while building — tech, tax and real estate.':
    'Ce que j’apprends en construisant – technologie, fiscalité et immobilier.',
  'Notes by email': 'Les notes par e-mail',
  'Read the notes': 'Lire les notes',
  'Videos on YouTube': 'Vidéos sur YouTube',

  // Notes
  'What I learn while building.': 'Ce que j’apprends en construisant.',
  'Short notes on technology, tax and real estate, and on building companies.':
    'De courts textes sur la technologie, la fiscalité, l’immobilier et la création d’entreprises.',
  'The first note is on its way.': 'La première note est en préparation.',
  Read: 'Lire',
  'Get new notes by email': 'Recevoir les nouvelles notes par e-mail',
  'Follow new notes': 'Suivre les nouvelles notes',

  // Newsletter form (shown once the newsletter is switched on)
  'Email address': 'Adresse e-mail',
  'you@example.com': 'nom@exemple.ch',
  'New notes by email when I publish one. You confirm by email first, and every email has an unsubscribe link. No tracking.':
    'Les nouvelles notes par e-mail, dès leur publication. Vous confirmez d’abord par e-mail, et chaque e-mail contient un lien de désabonnement. Aucun suivi.',
  Privacy: 'Confidentialité',
};
