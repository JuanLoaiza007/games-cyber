/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/game1",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
