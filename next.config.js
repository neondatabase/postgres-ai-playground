/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProduction ? process.env.NEXT_PUBLIC_REWRITE_PREFIX : undefined,
  basePath: isProduction ? process.env.NEXT_PUBLIC_REWRITE_PREFIX : undefined,
};
