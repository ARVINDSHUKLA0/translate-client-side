/** @type {import('next').NextConfig} */
const nextConfig = {
  // Browser always stays on the client site (port 3001).
  // /translator-dashboard is served by the separate "translate" app.
  async rewrites() {
    const translate = (
      process.env.TRANSLATE_APP_URL || 'http://localhost:3002'
    ).replace(/\/+$/, '');

    return [
      {
        source: '/translator-dashboard',
        destination: `${translate}/translator-dashboard`,
      },
      {
        source: '/translator-dashboard/:path*',
        destination: `${translate}/translator-dashboard/:path*`,
      },
    ];
  },
};

export default nextConfig;
