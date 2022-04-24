// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default {
    buildModules: [
        '@nuxtjs/strapi',
        "@nuxtjs/tailwindcss",
        '@pinia/nuxt',
    ],
    strapi: {
        url: process.env.STRAPI_URL || 'http://localhost:1337',
        prefix: '/api',
        version: 'v4',
    },
    env: {
        STRAPI_URL: 'http://localhost:1337'
    }
};
