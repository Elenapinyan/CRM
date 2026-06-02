import * as fs from 'fs';
import { pathToFileURL } from 'url';
import { pathsToModuleNameMapper } from 'ts-jest';
import presets from 'jest-preset-angular/presets/index.js';

const isCi = process.env.CI !== undefined;
const tsconfig = JSON.parse(fs.readFileSync(pathToFileURL(`./tsconfig.json`), { encoding: 'utf8', flag: 'r' }));

const config = {
  projects: [
    {
      // @see https://thymikee.github.io/jest-preset-angular/docs/getting-started/presets
      ...presets.createCjsPreset({
        tsconfig: '<rootDir>/projects/spr-components/tsconfig.spec.json',
      }),
      clearMocks: true,
      displayName: 'spr-components',
      setupFilesAfterEnv: ['<rootDir>/setup.jest.ts'],
      testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
      testMatch: ['<rootDir>/projects/spr-components/**/*.spec.ts'],
      roots: ['<rootDir>'],
      // @see https://dev.to/vantanev/make-your-jest-tests-up-to-20-faster-by-changing-a-single-setting-i36
      maxWorkers: isCi ? 2 : '50%',
      modulePaths: [tsconfig.compilerOptions.baseUrl],
      moduleNameMapper: {
        ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>' }),
        tslib: 'tslib/tslib.es6.js',
        '@popperjs/core': '<rootDir>/__mocks__/@popperjs/core/index.js',
      },
      transformIgnorePatterns: ['node_modules/?!(.*\\.mjs$)'],
      moduleFileExtensions: ['ts', 'html', 'js', 'json'],
      modulePathIgnorePatterns: ['<rootDir>/.*?/__mocks__'],
      cacheDirectory: './.cache/jest',
      collectCoverageFrom: [
        '<rootDir>/projects/**/*.ts',
        '!**/(index|main|polyfills).ts',
        '!**/*.(const|constant|enum|interface|model|module|type|routes).ts',
      ],
    },
    {
      // @see https://thymikee.github.io/jest-preset-angular/docs/getting-started/presets
      ...presets.createCjsPreset({
        tsconfig: '<rootDir>/projects/spr-components-v2/tsconfig.spec.json',
      }),
      clearMocks: true,
      displayName: 'spr-components-v2',
      setupFilesAfterEnv: ['<rootDir>/setup.jest.ts'],
      testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
      testMatch: ['<rootDir>/projects/spr-components-v2/**/*.spec.ts'],
      roots: ['<rootDir>'],
      // @see https://dev.to/vantanev/make-your-jest-tests-up-to-20-faster-by-changing-a-single-setting-i36
      maxWorkers: isCi ? 2 : '50%',
      modulePaths: [tsconfig.compilerOptions.baseUrl],
      moduleNameMapper: {
        ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>' }),
        tslib: 'tslib/tslib.es6.js',
      },
      transformIgnorePatterns: ['node_modules/?!(.*\\.mjs$)'],
      moduleFileExtensions: ['ts', 'html', 'js', 'json'],
      modulePathIgnorePatterns: ['<rootDir>/.*?/__mocks__'],
      cacheDirectory: './.cache/jest',
      collectCoverageFrom: [
        '<rootDir>/projects/spr-components-v2/**/*.ts',
        '!**/(index|main|polyfills).ts',
        '!**/*.(const|constant|enum|interface|model|module|type|routes).ts',
      ],
    },
  ],
  coverageDirectory: 'reports/',
  coveragePathIgnorePatterns: ['node_modules', '__mocks__', 'environments'],
  coverageReporters: ['lcov', 'text-summary'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports', outputName: 'junit.xml' }]],
};

export default config;
