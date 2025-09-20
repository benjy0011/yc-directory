import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      }
    ]
  },
  experimental: {
    ppr: 'incremental'
  },
  devIndicators: {
    // appIsrStatus: true, // deprecated - enable by default
    // buildActivity: true, // deprecated - enable by default
    position: "bottom-right"
  }
};

export default nextConfig;
