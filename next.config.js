/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ecomadmin.structureinfotech.com', 'localhost']
  },
  reactStrictMode: false,
  swcMinify: true,
}

module.exports = nextConfig;