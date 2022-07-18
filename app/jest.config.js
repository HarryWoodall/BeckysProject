const config = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.jest.json",
    },
  },
  testMatch: ["**/*.test.tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFiles: ["./tests/setup.js", "./tests/__mocks__/mock.js"],
  silent: true,
};

module.exports = config;
