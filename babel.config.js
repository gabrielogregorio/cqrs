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
          "@/application": ["./src/application"],
          "@/config": ["./src/config"],
          "@/domain": ["./src/domain"],
          "@/infrastructure": ["./src/infrastructure"],
          "@/shared": ["./src/shared"],
          "@/interfaces": ["./src/interfaces"],
          "@/utils": ["./src/utils"]
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts', '**/*.test.ts'],
};
