---
title: Pourquoi une entreprise devrait-elle s’intéresser dès maintenant à l’informatique quantique ?
description: Pas à cause des ordinateurs quantiques eux-mêmes, mais à cause du chiffrement. Ce que signifie « Harvest now, decrypt later » et les premières mesures utiles.
date: 2026-11-13
en: quantum-computing-encryption
---

La plupart des entreprises n’exploiteront jamais d’ordinateur quantique. Elles devraient pourtant s’y intéresser, pour une seule raison : le chiffrement.

## Le problème

Presque tout ce qui circule sur Internet est protégé par un chiffrement à clé publique : sites web, e-mails, VPN, e-banking, documents signés. Sa sécurité repose sur des problèmes mathématiques que les ordinateurs actuels ne peuvent pas résoudre dans un délai utile. Un ordinateur quantique suffisamment puissant pourrait en résoudre certains. Personne ne sait exactement quand une telle machine existera. Les estimations varient ; la direction, elle, ne change pas.

## Pourquoi « plus tard », c’est déjà maintenant

Les attaquants n’ont pas besoin d’attendre. Ils peuvent copier aujourd’hui des données chiffrées et les déchiffrer dès que le matériel existera. C’est ce qu’on appelle « Harvest now, decrypt later ». Pour les données qui doivent rester confidentielles dix ans ou plus – contrats, données de santé, dossiers fiscaux, secrets d’affaires –, le risque commence avec la transmission d’aujourd’hui, pas avec l’ordinateur quantique de demain.

## Ce qui a déjà été fait

En août 2024, le National Institute of Standards and Technology (NIST) américain a publié les premières normes de cryptographie post-quantique : FIPS 203 (ML-KEM) pour l’échange de clés, ainsi que FIPS 204 (ML-DSA) et FIPS 205 (SLH-DSA) pour les signatures numériques. Le NIST a également proposé d’abandonner d’ici 2035 les algorithmes vulnérables utilisés aujourd’hui. Les navigateurs et les grands fournisseurs de cloud ont commencé la transition. Les outils existent ; il s’agit maintenant de les adopter.

## Les premières mesures concrètes

1. **Faire un inventaire.** Où votre entreprise dépend-elle du chiffrement ? Site web, VPN, e-mail, sauvegardes, e-banking, signatures, liaisons avec les fournisseurs. La plupart des entreprises ne savent pas y répondre aujourd’hui, et c’est la partie la plus difficile.
2. **Classer selon la durée de vie.** Les données qui doivent rester secrètes de nombreuses années passent en premier.
3. **Interroger les fournisseurs.** Les éditeurs de logiciels et les fournisseurs de cloud devraient pouvoir dire quand ils prendront en charge les nouvelles normes. Intégrez la question au prochain renouvellement de contrat.
4. **Miser sur l’interchangeabilité.** Des systèmes dans lesquels on peut remplacer le chiffrement sans tout reconstruire (« crypto-agilité ») rendent chaque étape suivante moins coûteuse.

## Ce que j’en retiens

On présente souvent l’informatique quantique comme une science lointaine. Pour une entreprise, la question utile est plus simple et plus proche : lesquelles de nos données doivent encore être secrètes en 2035 ? C’est le point de départ. Chez [Skopa](https://skopa.ai/?utm_source=eflury.com&utm_medium=referral&utm_campaign=notes), nous travaillons précisément à la croisée de l’intelligence artificielle et de l’informatique quantique.

Source : [NIST Post-Quantum Cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography) (en anglais).
