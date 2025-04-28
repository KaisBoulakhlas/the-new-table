import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig: NextConfig = {
    images: {
        domains: ['randomuser.me','lh3.googleusercontent.com'],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
        prependData: `@import "./_variables.scss";`,
    },
}
export default nextConfig;
