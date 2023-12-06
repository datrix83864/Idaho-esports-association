// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Idaho Esports',
  tagline: 'The win condition is kids playing games',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.idahoesports.gg/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'datrix83864', // Usually your GitHub org/user name.
  projectName: 'esports-idaho', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/datrix83864/Esports-Helpdesk/blob/main',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/datrix83864/Esports-Helpdesk/blob/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Idaho Esports',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {type: 'dropdown',
            label: 'Rules',
            items: [
              {to: '/docs/Rules/general', label: 'General Rules'},
              {to: '/docs/Rules/rocket_league', label: 'Rocket League Rules'},
              {to: '/docs/Rules/valorant', label: 'Valorant Rules'},
              {to: '/docs/Rules/overwatch_2', label: 'Overwatch 2 Rules'},
              {to: '/docs/Rules/smash_bros', label: 'Smash Bros Rules'},
              {to: '/docs/Rules/apex', label: 'Apex Rules'},
              {to: '/docs/Rules/league_of_legends', label: 'League of Legends'},
            ]
          },
          {type: 'dropdown',
            label: 'Schedule',
            items: [
              {to: '/schedule/general', label: 'Spring 2024 Season Schedule'},
              {to: '/schedule/rocket_league', label: 'Rocket League Schedule'},
              {to: '/schedule/valorant', label: 'Valorant Schedule'},
              {to: '/schedule/overwatch_2', label: 'Overwatch 2 Schedule'},
              {to: '/schedule/smash_bros', label: 'Smash Bros Schedule'},
              {to: '/schedule/apex', label: 'Apex Schedule'},
              {to: '/schedule/league_of_legends', label: 'League of Legends'},
            ]
          },
          /*
          {
            type: 'doc',
            docId: 'rules',
            position: 'left',
            label: 'Rules',
          },
          */
          {type: 'dropdown',
            label: 'Standings',
            items: [
              {to: '/standings/rocket_league', label: 'Rocket League Standings'},
              {to: '/standings/valorant', label: 'Valorant Standings'},
              {to: '/standings/overwatch_2', label: 'Overwatch 2 Standings'},
              {to: '/standings/smash_bros', label: 'Smash Bros Standings'},
              {to: '/standings/apex', label: 'Apex Standings'},
              {to: '/standings/league_of_legends', label: 'League of Legends Standings'},
            ]
          },
          {type: 'doc',
            label: 'State Tournament',
            position: 'left',
            docId: 'state'
          },
          {type: 'doc',
            label: 'State Play-in',
            position: 'left',
            docId: 'state_playin'
          },
          {type: 'dropdown',
            label: 'Non-Profit',
            items: [
              {to: '/docs/category/minutes', label: 'Minutes'},
              {to: '/docs/Non-Profit/articles_of_incorporation', label: 'Articles of Incorporation'},
              {to: '/docs/Non-Profit/non_profit_bylaws', label: 'Bylaws'},
            ]
          },
          {type: 'dropdown',
            label: 'Join Us',
            items: [
              {to: '/join-our-teams/contact_us', label: 'Contact Us'},
              {to: '/join-our-teams/our_teams', label: 'Our Teams'},
              {to: '/join-our-teams/getting_started', label: 'Getting Started'},
            ]
          },
          //{to: '/blog', label: 'Blog', position: 'left'},
          
          {
            href: 'https://github.com/datrix83864',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Rules',
                to: '/docs/category/rules',
              },/*
              {
                label: 'Schedule',
                to: '/schedule',
              },
              */
            ]
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/7SXG8gRWbw',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/idaho_esports',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/datrix83864',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Idaho Esports Association Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
