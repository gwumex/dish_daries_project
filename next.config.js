/** @type {import('next').NextConfig} */
const nextConfig = {
        eslint: {
          ignoreDuringBuilds: true,
        },
        typescript: {
          ignoreBuildErrors: true,
        },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'daisyui.com',
            port: '',
            pathname: '/images/**'
          },
        ],
      },
  }
  
  module.exports = nextConfig;
  