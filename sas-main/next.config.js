/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Keep this if you need static site generation
  images: {
    unoptimized: true, // Disable image optimization
  },
};

module.exports = nextConfig;
