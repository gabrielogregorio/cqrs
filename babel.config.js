module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@/controllers': './src/controllers',
          '@/factories': './src/factories',
          '@/middlewares': './src/middlewares',
          '@/config': './src/config',
          '@/models': './src/models',
          '@/shared': './src/shared',
          '@/database': './src/database',
          '@/errors': './src/errors',
          '@/service': './src/service',
          '@/logs': './src/logs',
          '@/mock': './src/mock',
          '@/locales': './src/locales',
          '@/helpers': './src/helpers',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts', '**/*.test.ts'],
};
