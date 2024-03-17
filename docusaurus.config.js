// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Association Zikapanam',
  tagline: 'La musique, ensemble !',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.doc.zikapanam.fr',
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
      }),    
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/zikapanam.png',
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
            label: 'Documentation',
          },
          {
            position: 'left',
            label: 'Blog',
            href: 'https://www.blog.zikapanam.fr',
          },
          {
            position: 'left',
            label: 'JamClub',
            href: 'https://jamclub.zikapanam.fr',
          },

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