const siteMetadata = require('./site-metadata.json')
const sass = require('node-sass');
const sassUtils = require('node-sass-utils')(sass);

require("dotenv").config()

module.exports = {
    pathPrefix: '/',
    siteMetadata: siteMetadata,
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-source-data`,
        `gatsby-remark-images`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-styled-components`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
              plugins: [
                {
                  resolve: `gatsby-remark-images`,
                  options: {
                    maxWidth: 800,
                  },
                },
                'gatsby-remark-static-images',
                {
                  resolve: "gatsby-remark-external-links",
                  options: {
                    target: "_blank",
                    rel: "nofollow"
                  }
                },
                {
                  resolve: `gatsby-remark-vscode`,
                  options: {
                    theme: 'Monokai' 
                  }
                },
              ],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`
            },
        },
        {
            resolve: `gatsby-remark-page-creator`,
            options: {}
        },
        {
            resolve: `@stackbit/gatsby-plugin-menus`,
            options: {
                sourceUrlPath: `fields.url`,
                pageContextProperty: `menus`,
            }
        },
        {
          resolve: `gatsby-plugin-algolia`,
          options: {
            appId: process.env.GATSBY_ALGOLIA_APP_ID,
            apiKey: process.env.ALGOLIA_ADMIN_KEY,
            queries: require("./src/utils/algolia-queries")
          }
        },
        {
          resolve: `gatsby-plugin-manifest`,
          options: {
            name: `Promo Java GO`,
            short_name: `javaGo`,
            description: `Support de formation Java / Développeur Web`,
            lang: `fr`,
            start_url: `/`,
            background_color: `#f7f0eb`,
            theme_color: `#a2466c`,
            display: `standalone`,
            icon: `static/images/icon.svg`, // This path is relative to the root of the site.
            cache_busting_mode: 'none'
          },
        },
        `gatsby-plugin-offline`,
        {
          resolve: `gatsby-plugin-sitemap`,
          options: {
            sitemapSize: 5000
          }
        }
    ]
};
