/** @type {import('next').NextConfig} */
const nextConfig = {
        eslint: {
          ignoreDuringBuilds: true,
        },
        typescript: {
          ignoreBuildErrors: true,
        },
    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'https',
    //         hostname: 'localhost',
    //         port: '3443',
    //       },
    //     ],
    //   },
  }
  
  module.exports = nextConfig;
  