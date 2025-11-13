import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    // 🕐 1 Day Configuration
    daily: {
      stale: 86400, // 1 day
      revalidate: 86400, // 1 hour (revalidate time is often much shorter)
      expire: 86400, // 1 day
    },

    // 🗓️ 1 Week Configuration
    weekly: {
      stale: 604800, // 7 days
      revalidate: 604800, // 1 day
      expire: 604800, // 7 days
    },

    // 🗓️ 1 Month Configuration (approx. 30 days)
    monthly: {
      stale: 2592000, // 30 days
      revalidate: 604800 * 2, // 14 days
      expire: 2592000, // 30 days
    },

    // 🗓️ 1 Year Configuration (approx. 365 days)
    yearly: {
      stale: 31536000, // 365 days
      revalidate: 2592000, // 30 days
      expire: 31536000, // 365 days
    },
  },

  images: {
    domains: ["i.pinimg.com"], // Add the domain of your external image
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  reactCompiler: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
