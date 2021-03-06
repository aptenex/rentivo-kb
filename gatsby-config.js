const config = require('./data/SiteConfig');
const postcssCustomMedia = require('postcss-custom-media');
const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;
const policyAccess = process.env.GATSBY_ENV === 'production' ? [{ userAgent: '*', allow: ['/'] }] : [{ userAgent: '*', disallow: ['/'] }];

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
  environment: 'master',
  downloadLocal: false,
  forceFullSync: true

}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
      'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    title : config.siteTitle,
    author : config.siteAuthor,
    siteUrl: config.siteUrl,
    description: config.siteDescription
  },
  plugins: [
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/img/r-256.png",

        // WebApp Manifest Configuration
        appName: 'Rentivo', // Inferred with your package.json
        appDescription: null,
        developerName: null,
        developerURL: null,
        dir: 'auto',
        lang: 'en-US',
        background: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        orientation: 'any',
        start_url: '/?homescreen=1',
        version: '1.0',

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          yandex: false,
          windows: false
        }
      }
    },
    'gatsby-optional-chaining',
    'gatsby-plugin-nullish-coalescing-operator',
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /img\/svg/ // See below to configure properly
        }
      }
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: [],
        // language file path
        defaultLanguage: `en`,
        // option to redirect to `/en` when connecting `/`
        redirect: false,
      },
    },

    {
      resolve: 'gatsby-plugin-module-resolver',
      options: {
        root: './src', // <- will be used as a root dir
        aliases: {
          'reusecore': '/reusecore',
          'common': '/common',
          'functions': '/functions',
          'containers' : '/containers',
          'components' : '/components',
          'constants' : '/constants'
        }
      }
    },
    {
      resolve: 'gatsby-plugin-module-resolver',
      options: {
        root: './static',
        aliases: {
          'svg': './img/svg',
          'img': './img',
        }
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        minify: false, // Breaks styles if not set to false
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [postcssCustomMedia ]
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: config.siteUrl + pathPrefix,
        sitemap: `${config.siteUrl}/docs/sitemap.xml`,
        policy: policyAccess,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/common/src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `common`,
        path: `${__dirname}/src/common/src/assets/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'sendgrid-remark-code-in-html',
          'sendgrid-remark-paths',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 690,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          // 'gatsby-remark-autolink-headers',
          'sendgrid-remark-headers',
          'sendgrid-remark-tables',
        ],
      },
    },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -230
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-30453524-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // // Delays sending pageview hits on route update (in milliseconds)
        // pageTransitionDelay: 0,
        // // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // // Any additional optional fields
        // sampleRate: 5,
        // siteSpeedSampleRate: 10,
        // cookieDomain: "example.com",
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-TSD8N5P',
        includeInDevelopment: true,
        // datalayer to be set before GTM is loaded
        // should be a stringified object or object
        // Defaults to null
        defaultDataLayer: function() {
          return {
            pageType: window.pageType,
          }
        },
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Montserrat`,
            variants: [
              `400`,
              `500`,
              `600`,
              `700`,
            ],
          }
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-inline-svg', // https://www.gatsbyjs.or
    'gatsby-plugin-catch-links',
    'gatsby-plugin-nullish-coalescing-operator',


    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitle,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icons: [
            {
                src: '/brand/sg-mark.png',
                sizes: '771x724',
                type: 'image/png',
            },
        ],
      },
    },
    // 'gatsby-plugin-offline',
  ],
};
