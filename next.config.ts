import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Enforces static HTML export (creates an 'out' folder)
  images: {
    unoptimized: true,        // GitHub Pages doesn't support the Next.js server-side image optimizer
  },
  // UNCOMMENT BELOW IF DEPLOYING TO A SUB-FOLDER REPOSITORY (e.g., https://github.io)
  // basePath: '/my-repo', 
};

export default nextConfig;
