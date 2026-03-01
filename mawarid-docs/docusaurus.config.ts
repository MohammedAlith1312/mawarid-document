import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Deployment target: set DEPLOY_TARGET=iis for IIS, default is GitHub Pages
// In local dev (npm run start), NODE_ENV=development so baseUrl is always '/'
const isLocal = process.env.NODE_ENV === 'development';
const isGitHub = !isLocal && process.env.DEPLOY_TARGET !== 'iis';
const siteUrl = isLocal ? 'http://localhost:3000'
  : isGitHub ? 'https://faaztechsolutions.github.io'
    : 'https://mawarid-document.vercel.app';
const baseUrl = isLocal ? '/'
  : isGitHub ? '/Mawarid_Documentation/'
    : '/mawarid-docs/';

const config: Config = {
  title: 'Mawarid',
  tagline: 'Official documentation for all Mawarid portal applications',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Deployment target controlled by DEPLOY_TARGET env var
  // DEPLOY_TARGET=github → GitHub Pages
  // DEPLOY_TARGET=iis (default) → https://portal.mawarid.com.sa/mawarid-docs/
  url: siteUrl,
  baseUrl: baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'FaazTechSolutions', // GitHub org/user name.
  projectName: 'Mawarid_Documentation', // GitHub repo name.

  onBrokenLinks: 'warn',
  trailingSlash: true,

  // GitHub OAuth — Client ID is safe to expose; secret lives in backend/.env
  customFields: {
    githubClientId: 'Iv23liWtW89aR8lj7QAj',
    oauthProxyUrl: process.env.OAUTH_PROXY_URL || (isLocal ? 'http://localhost:3001' : 'https://portal.mawarid.com.sa/mawarid-docs-api'),
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    // Auth Guard — injects a synchronous script in <head> of every page.
    // Runs before React loads so NO page content renders without a token.
    function authGuardPlugin() {
      return {
        name: 'auth-guard-plugin',
        injectHtmlTags() {
          const guardScript = `
(function() {
  var PUBLIC = ['${baseUrl}login', '${baseUrl}auth-callback'];
  var path = window.location.pathname;
  var isPublic = PUBLIC.some(function(p) { return path.indexOf(p) !== -1; });
  if (isPublic) return;

  var token = localStorage.getItem('github_token');
  if (!token) {
    sessionStorage.setItem('auth_redirect', path + window.location.search);
    window.location.replace(window.location.origin + '${baseUrl}login');
  }
})();
          `;
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML: guardScript,
                attributes: { 'data-auth-guard': 'true' },
              },
            ],
          };
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/FaazTechSolutions/Mawarid_Documentation/tree/main/mawarid-docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'https://portal.mawarid.com.sa/System/assets/images/mawarid-logo-2.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Mawarid',
      logo: {
        alt: 'My Site Logo',
        src: 'https://portal.mawarid.com.sa/System/assets/images/mawarid-logo-2.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/FaazTechSolutions/Mawarid_Documentation/tree/main/mawarid-docs',
          label: 'Repo',
          position: 'right',
        },
        {
          href: 'https://github.com/FaazTechSolutions/Mawarid_Documentation/issues/new',
          label: 'New issue',
          position: 'right',
        },
        {
          href: 'https://github.com/FaazTechSolutions/Mawarid_Documentation/issues',
          label: 'Issues',
          position: 'right',
        },
        {
          type: 'custom-userProfile',
          position: 'right',
        },


      ],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
