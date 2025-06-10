import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    /* config options here */
    images: {
        domains: ["storage.googleapis.com"],
    },
};

export default nextConfig;
