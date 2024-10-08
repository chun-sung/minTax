/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

const NextConfig =  {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },  
  
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
        },
      },
      //추가 플러그인 작성
    ],
  ],
  NextConfig
);
