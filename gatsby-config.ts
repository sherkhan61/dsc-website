import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "ТОО «Центр цифровой безопасности» — Аккредитованная лаборатория испытаний информационной безопасности",
    description: "Профессиональные услуги анализа исходного кода, испытания и аудита информационной безопасности в г. Астана. Аккредитованная лаборатория с опытом работы с государственными и корпоративными заказчиками.",
    author: "ТОО «Центр цифровой безопасности»",
    siteUrl: "https://digisec.kz",
    keywords: [
      "анализ исходного кода",
      "испытание информационной безопасности",
      "лаборатория испытаний информационной безопасности",
      "аудит информационной безопасности",
      "сертификационные испытания",
      "SAST",
      "DAST",
      "пентест",
      "Астана"
    ],
    organization: {
      name: "ТОО «Центр цифровой безопасности»",
      address: {
        streetAddress: "улица Әлихан Бөкейхан, дом 32",
        addressLocality: "Астана",
        addressCountry: "KZ",
        postalCode: "010000"
      },
      contactPoint: {
        telephone: "+7 (702) 214-00-02",
        email: "info@digisec.kz",
        contactType: "customer service"
      }
    }
  },
  
  // Performance and security configuration
  flags: {
    DEV_SSR: false,
    FAST_DEV: true,
    FAST_REFRESH: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PARALLEL_SOURCING: true,
    PRESERVE_WEBPACK_CACHE: true,
  },

  // GraphQL type generation
  graphqlTypegen: true,

  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    // Temporarily disabled due to sharp module issues
    // "gatsby-plugin-image",
    // "gatsby-plugin-sharp",
    // "gatsby-transformer-sharp",
    
    // Sitemap generation for SEO
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/404", "/404.html"],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: () => "https://digisec.kz",
        resolvePages: ({ allSitePage }: any) => {
          return allSitePage.nodes.map((page: any) => ({
            path: page.path,
            changefreq: "weekly",
            priority: page.path === "/" ? 1.0 : 0.7,
          }));
        },
        serialize: ({ path, changefreq, priority }: any) => ({
          url: path,
          changefreq,
          priority,
        }),
      },
    },

    // Manifest for PWA capabilities
    // Temporarily disabled due to sharp module issues
    // {
    //   resolve: "gatsby-plugin-manifest",
    //   options: {
    //     name: "ТОО «Центр цифровой безопасности»",
    //     short_name: "Digital Security Center",
    //     description: "Аккредитованная лаборатория испытаний информационной безопасности",
    //     start_url: "/",
    //     background_color: "#0a0a0a",
    //     theme_color: "#00ff88",
    //     display: "standalone",
    //     icon: "src/images/icon.svg",
    //   },
    // },

    // Source filesystem for images
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
  ],

  // Enable TypeScript
  trailingSlash: "never",
};

export default config;
