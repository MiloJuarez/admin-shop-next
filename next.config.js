const webpack = require('webpack');
// const { parsed: myEnv } = require('dotenv').config({
//     path: '.env.local',
// });

const envVars = {
    'process.env.NEXT_PUBLIC_API_URL': JSON.stringify(process.env.NEXT_PUBLIC_API_URL),
    'process.env.NEXT_PUBLIC_API_VERSION': JSON.stringify(process.env.NEXT_PUBLIC_API_VERSION),
    'process.env.PER_PAGE': JSON.stringify(process.env.PER_PAGE),
};

/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack(config) {
        config.plugins.push(new webpack.DefinePlugin(envVars));
        return config;
    },
    images: {
        domains: ['tailwindui.com', 'images.unsplash.com', 'ui-avatars.com', 'api.lorem.space', 'custom.url'],
    },
};
