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
          "@/code": ["./src/code"],
          "@/commands": ["./src/commands"],
          "@/entity": ["./src/entity"],
          "@/envs": ["./src/envs"],
          "@/errors": ["./src/errors"],
          "@/events": ["./src/events"],
          "@/middlewares": ["./src/middlewares"],
          "@/migrations": ["./src/migrations"],
          "@/models": ["./src/models"],
          "@/queries": ["./src/queries"],
          "@/query": ["./src/query"],
          "@/schemas": ["./src/schemas"]
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts', '**/*.test.ts'],
};
