/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        API_ROOT: process.env.API_ROOT,
    }
}

module.exports = nextConfig
