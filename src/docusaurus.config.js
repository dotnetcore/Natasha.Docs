/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Natasha",
  tagline: "Natasha",
  url: "https://natasha.dotnetcore.xyz",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "images/icon/favicon.ico",
  organizationName: "dotnetcore", // Usually your GitHub org/user name.
  projectName: "Natasha", // Usually your repo name.
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US", "zh-Hans", "ja-JP"],
    localeConfigs: {
      "en-US": { label: "English" },
      "zh-Hans": { label: "简体中文" },
      "ja-JP": { label: "日本語" },
    },
  },
  // plugins: [
  //   [
  //     "@docusaurus/plugin-pwa",
  //     {
  //       debug: true,
  //       offlineModeActivationStrategies: ["appInstalled", "queryString"],
  //       pwaHead: [
  //         {
  //           tagName: "link",
  //           rel: "icon",
  //           href: "/images/icon/apple-touch-icon.png",
  //         },
  //         {
  //           tagName: "link",
  //           rel: "manifest",
  //           href: "/images/icon/site.webmanifest.json", // your PWA manifest
  //         },
  //         {
  //           tagName: "meta",
  //           name: "theme-color",
  //           content: "rgb(37, 194, 160)",
  //         },
  //       ],
  //     },
  //   ],
  // ],
  themeConfig: {
    prism: {
      defaultLanguage: "csharp",
      additionalLanguages: ["powershell", "csharp", "sql"],
      // theme: require("prism-react-renderer/themes/github"),
      // darkTheme: require("prism-react-renderer/themes/palenight"),
    },
    // algolia: {
    //   apiKey: "xxxxxxxxx",
    //   indexName: "newbe",

    //   // Optional: see doc section bellow
    //   contextualSearch: true,

    //   // Optional: Algolia search parameters
    //   searchParameters: {},

    //   //... other Algolia params
    // },
    navbar: {
      title: "Natasha",
      logo: {
        alt: "Natasha",
        src: "https://avatars.githubusercontent.com/u/51699821?s=200&v=4",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "开发文档",
          position: "left",
        },
        // { to: "blog", label: "博客", position: "left" },
        // right
        // {
        //   href: "https://xxxxxxxxxxxx",
        //   label: "xxxxxxxxxx",
        //   position: "right",
        // },
        {
          href: "https://github.com/dotnetcore/Natasha",
          label: "GitHub",
          position: "right",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true,
          // dropdownItemsAfter: [
          //   {
          //     to: '/versions',
          //     label: 'All versions',
          //   },
          // ],
        },
        {
          type: "localeDropdown",
          position: "right",
          dropdownItemsAfter: [
            {
              to: "https://crwd.in/natashadocs",
              label: "Help Us Translate",
            },
          ],
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "开发文档",
          items: [
            {
              label: "项目简介",
              to: "docs/",
            },
            // {
            //   label: "快速入门",
            //   to: "docs/01-0-Quick-Start/",
            // },
          ],
        },
        {
          title: "参与讨论",
          items: [
            // {
            //   label: "xxxxxxxxxx",
            //   href: "https://xxxxxxxxxxxxxx",
            // },
          ],
        },
        {
          title: "更多资源",
          items: [
            // {
            //   label: "项目博客",
            //   to: "blog",
            // },
            {
              label: ".NET Core Community (NCC)",
              href: "https://github.com/dotnetcore",
            },
            {
              label: "GitHub",
              href: "https://github.com/dotnetcore/Natasha",
            },
          ],
        },
      ],
      copyright: `MIT ${new Date().getFullYear()} dotnetcore. Built with Docusaurus.`,
    },
    gtag: {
      trackingID: "xxxxxxxxxx",
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/dotnetcore/Natasha.Docs/edit/main/src/",
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/dotnetcore/Natasha.Docs/edit/main/src/blog/",
          // showLastUpdateAuthor: true,
          // showLastUpdateTime: true,
          blogSidebarCount: 5, //"ALL",
          truncateMarker: /<!-- more -->/,
          feedOptions: {
            type: "all", // required. 'rss' | 'feed' | 'all'
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
