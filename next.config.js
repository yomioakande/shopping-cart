/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.reloadly.com',
        port: '',
        pathname: '/'
      }
    ]
  }
};

const redirects = async () => {
  return [
    {
      source: '/',
      destination: '/products',
      permanent: true
    }
  ];
};

module.exports = { nextConfig, redirects };
