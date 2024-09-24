// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Association Zikapanam',
  tagline: 'La musique, ensemble !',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://doc.zikapanam.fr',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zikapanam', // Usually your GitHub org/user name.
  projectName: 'doc-zikapanam', // Usually your repo name.
  deploymentBranch: 'gh-pages', // Pages branch name

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          /*          editUrl:
                      'https://github.com/zikapanam/doc-zikapanam/tree/main/packages/create-docusaurus/templates/shared/',
                  */
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-55H6JCM7TH',
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['**/markdown-page'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/zikapanam.png',
      metadata: [
        {
          name: 'description',
          content: '🎶 Zikapanam | La musique, ensemble ! 🎸 🎤 Jams, répètes, scènes ouvertes & concerts 🎵 Du jazz au métal, de la musique trad à celle de chambre 📍 Paris & petite couronne 🤝 Rejoins-nous'
        },
        {
          name: 'keywords',
          content: 'musique,musiciens,jams,répétitions,scènes ouvertes,concerts'
        }
      ],
      algolia: {
        // L'ID de l'application fourni par Algolia
        appId: 'Q3359CH7KA',

        // Clé d'API publique : il est possible de la committer en toute sécurité
        apiKey: '016769b2f6834357345a17834b9f0ee0',

        indexName: 'zikapanam',

        // Facultatif : voir la section doc ci-dessous
        contextualSearch: true,

        // Facultatif : Spécifiez les domaines où la navigation doit se faire par window.location au lieu de history.push. Utile lorsque notre configuration Algolia explore plusieurs sites de documentation et que nous voulons naviguer vers eux avec window.location.href.
        //externalUrlRegex: 'external\\.com|domain\\.com',

        // // Facultatif : Remplace certaines parties des URL des éléments d'Algolia. Utile lorsque vous utilisez le même index de recherche pour de multiples déploiements en utilisant une Url de base différente. Vous pouvez utiliser regexp ou string dans le paramètre `from`. Par exemple : localhost:3000 vs myCompany.com/docs
        //replaceSearchResultPathname: {
        //  from: '/docs/', // or as RegExp: /\/docs\//
        //  to: '/',
        //},

        // Facultatif : paramètres de recherche de Algolia
        searchParameters: {},

        // Facultatif : chemin pour la page de recherche qui est activée par défaut (`false` pour le désactiver)
        searchPagePath: 'search',

        // Facultatif : si la fonctionnalité insights est activée ou non sur Docsearch (`false` par défaut)
        //insights: false,

        //... autres paramètres de Algolia
      },
      navbar: {
        title: 'Association Zikapanam',
        logo: {
          alt: 'Zikapanam logo',
          src: 'img/zikapanam.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'DocSidebar',
            position: 'left',
            label: "Documentation",
          },
          {
            position: 'left',
            label: 'FAQ',
            href: '/docs/faq',
          },
          {
            position: 'left',
            label: '➡️  Inscris-toi !',
            href: '/docs/devenir-cotisant',
          },
          {
            position: 'left',
            label: '/Bénévolat !',
            href: '/docs/benevolat',
          },
          {
            position: 'left',
            label: 'Témoignages',
            href: 'https://blog.zikapanam.fr/testimonials',
          },
          {
            position: 'left',
            label: 'Calendriers',
            href: '/docs/calendriers',
          },
          {
            position: 'left',
            label: 'Blog',
            href: 'https://blog.zikapanam.fr',
          }/*,
          {
            position: 'left',
            label: 'JamClub',
            href: 'https://jamclub.zikapanam.fr',
          },
*/
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Association Zikapanam, fait avec Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
