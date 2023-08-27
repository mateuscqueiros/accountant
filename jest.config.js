const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@/components/(.*)': '<rootDir>/src/components/',
    '@/pages/(.*)': '<rootDir>/src/pages/',
    '@/(.*)': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  "transform": {
    "^.+\\.ts$": "babel-jest",
    "^.+\\.tsx$": "babel-jest"
  }
}

module.exports = createJestConfig(customJestConfig)