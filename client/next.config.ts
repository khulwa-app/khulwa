import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const svgrOptions = {
  svgo: true,
  svgoConfig: { plugins: [{ name: "preset-default", params: { overrides: { removeViewBox: false } } }] },
  titleProp: true,
  ref: true,
  dimensions: false,
};

const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${SERVER_URL}/api/:path*` }];
  },
  turbopack: {
    rules: {
      "*.svg": {
        as: "*.js",
        loaders: [{ loader: "@svgr/webpack", options: svgrOptions }],
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: "@svgr/webpack", options: svgrOptions }],
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
