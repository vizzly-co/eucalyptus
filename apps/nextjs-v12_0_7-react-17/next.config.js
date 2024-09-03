const path = require('path');

/**
 * next-transpile-modules
 * Makes Next.js run babel over code that's imported from the `shared-ui`
 * package.
 * https://github.com/kutlugsahin/next-transpile-modules
 */
const PACKAGE_NAMES = [
  // 'shared-ui',
  // 'shared-logic',
  // '@vizzly/services',
  // 'charts',
  // 'results-driver',
  // '@vizzly/dashboard',
  // '@vizzly/auth',
]; // Add new packages to this array when imported into this app
const withTranspiledModules = require('next-transpile-modules')(PACKAGE_NAMES);

const config = {
  assetPrefix: process.env.VIZZLY_STATIC_ASSET_PREFIX,
  publicRuntimeConfig: {},
  productionBrowserSourceMaps: false,
  serverRuntimeConfig: {},
  reactStrictMode: true,
  typescript: {
    // TODO undo this! Just used to get something deployed quickly for MVP.

    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // Fix packages that depend on fs/module imports (updated for webpack 5)
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.module = false;
    }

    // Make the Next.js Babel loader use the root config
    const babelConfigFile = path.resolve('../../babel.config.js');
    const isBabelLoader = loader => {
      return (
        loader &&
        (loader === 'next-babel-loader' || loader.replace(/\\/g, '/').match('/next/dist/build/babel/loader/index.js$'))
      );
    };
    config.module.rules.forEach(rule => {
      if (rule.use) {
        if (Array.isArray(rule.use)) {
          const babelLoader = rule.use.find(use => typeof use === 'object' && isBabelLoader(use.loader));
          if (babelLoader && babelLoader.options) {
            babelLoader.options.configFile = babelConfigFile;
          }
        } else if (isBabelLoader(rule.use.loader)) {
          rule.use.options.configFile = babelConfigFile;
        }
      }
    });

    return config;
  },
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
  headers: async () => {
    const versionHeader = {
      key: 'Vizzly-Version',
      value: require('./package.json').version || 'dev',
    };

    if (process.env.VIZZLY_ENVIRONMENT === 'development') return [{ source: '/:rest*', headers: [versionHeader] }];

    return [
      {
        source: '/:rest*',
        headers: [
          versionHeader,
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              `default-src 'self' https://app.vizzly.co https://staging.static.app.vizzly.co https://static.app.vizzly.co https://staging.app.vizzly.co https://staging.api.vizzly.co https://api.vizzly.co log.cookieyes.com cdn-cookieyes.com eu.posthog.com us.posthog.com https://eu.i.posthog.com eu-assets.i.posthog.com us-assets.i.posthog.com https://us.i.posthog.com o1187319.ingest.sentry.io *.intercom.io *.intercomcdn.com *.intercomcdn.eu https://via.intercom.io https://api.intercom.io https://api.au.intercom.io https://api.eu.intercom.io https://api-iam.intercom.io https://api-iam.eu.intercom.io https://api-iam.au.intercom.io  https://api-ping.intercom.io   https://nexus-websocket-a.intercom.io wss://nexus-websocket-a.intercom.io https://nexus-websocket-b.intercom.io wss://nexus-websocket-b.intercom.io https://nexus-europe-websocket.intercom.io  wss://nexus-europe-websocket.intercom.io  https://nexus-australia-websocket.intercom.io wss://nexus-australia-websocket.intercom.io  https://uploads.intercomcdn.com https://uploads.intercomcdn.eu  https://uploads.au.intercomcdn.com  https://uploads.intercomusercontent.com https://www.youtube.com;`,
              `script-src 'self' https://staging.static.app.vizzly.co https://static.app.vizzly.co https://eu.posthog.com app.intercom.io widget.intercom.io js.intercomcdn.com cdn-cookieyes.com 'unsafe-eval';`,
              `style-src 'self' https://staging.static.app.vizzly.co https://static.app.vizzly.co fonts.googleapis.com 'unsafe-inline';`,
              `img-src 'self' blob: data: js.intercomcdn.com https://staging.static.app.vizzly.co https://static.app.vizzly.co static.intercomassets.com downloads.intercomcdn.com downloads.intercomcdn.eu downloads.au.intercomcdn.com uploads.intercomusercontent.com cdn-cookieyes.com gifs.intercomcdn.com  video-messages.intercomcdn.com messenger-apps.intercom.io messenger-apps.eu.intercom.io messenger-apps.au.intercom.io *.intercom-attachments-1.com *.intercom-attachments.eu *.au.intercom-attachments.com *.intercom-attachments-2.com *.intercom-attachments-3.com *.intercom-attachments-4.com *.intercom-attachments-5.com *.intercom-attachments-6.com *.intercom-attachments-7.com *.intercom-attachments-8.com *.intercom-attachments-9.com static.intercomassets.eu static.au.intercomassets.com;`,
              `font-src 'self' fonts.gstatic.com js.intercomcdn.com fonts.intercomcdn.com;`,
              `object-src 'none';`,
              `base-uri 'self';`,
              `form-action 'self';`,
              `frame-ancestors 'none';`,
              `block-all-mixed-content;`,
            ].join(' '),
          },
        ],
      },
    ];
  },
};

module.exports = withTranspiledModules(config);
