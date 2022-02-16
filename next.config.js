const { Redirect } = require('next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: [
    {
      source: `/`,
      destination: '/home',
      permanent: true,
    }
  ]
}

module.exports = nextConfig
