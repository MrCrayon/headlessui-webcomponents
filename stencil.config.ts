import { Config, TestingConfig } from '@stencil/core';

export const config: Config = {
  namespace: 'headlessui-webcomponents',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
  },
};
