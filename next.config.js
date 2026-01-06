/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  // Support files from legacy_src and legacy_public
  publicRuntimeConfig: {
    legacyAssetsPath: "/legacy_public",
  },
};

module.exports = nextConfig;
