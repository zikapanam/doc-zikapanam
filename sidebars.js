/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  DocSidebar: [
    {
      type: 'category',
      label: 'Rejoindre l\'asso',
      items: [
        'rejoindre-l-asso/objet-objectifs-sociaux',
        'rejoindre-l-asso/faq',
        'rejoindre-l-asso/benevolat',
        'rejoindre-l-asso/organigramme',
        'rejoindre-l-asso/devenir-cotisant',
      ],
    },
    {
      type: 'category',
      label: 'Fonctionnement',
      items: [
        'fonctionnement/intro',
        'fonctionnement/discord',
        'fonctionnement/calendriers',
        'fonctionnement/recherche_calendrier',
        'fonctionnement/petites_annonces_musicales',
        'fonctionnement/osm_map',
        'fonctionnement/qu-est-ce-qu-une-rencontre',
        'fonctionnement/participer-a-une-rencontre',
        'fonctionnement/evaluer-son-niveau',
        'fonctionnement/mindmap-vue-d-ensemble',
        'fonctionnement/la-vie-d-un-collectif',
        'fonctionnement/lineup-satellite',
        'fonctionnement/organiser-une-rencontre',
        'fonctionnement/organiser-une-soiree',
      ],
    },
    {
      type: 'category',
      label: "Projets dans l'asso",
      items: [
        'projets-dans-l-asso/collectifs',
        'projets-dans-l-asso/lineups',
        'projets-dans-l-asso/ecouter-voir',
      ],
    },
    {
      type: 'category',
      label: 'Partenariats',
      items: [
        'partenariats/bars-et-lieux-culturels-associatifs',
        'partenariats/ecoles-et-prof-de-musique',
      ],
    },
    {
      type: 'category',
      label: 'Contacts',
      items: [
        'contacts/contact-zikapanam',
        'contacts/flux-rss',
      ],
    },
    {
      type: 'category',
      label: "Plus d'infos",
      items: [
        'plus-d-infos/genese',
        'plus-d-infos/financement',
      ],
    },

  ],
};

export default sidebars;
