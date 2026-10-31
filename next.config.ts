import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // L'aperçu se sert sous ti-boutik.fr/apercu/ : sans basePath, les liens et les
  // fichiers /_next partiraient à la racine du site en production.
  basePath: process.env.BASE_PATH || undefined,
};

export default nextConfig;
