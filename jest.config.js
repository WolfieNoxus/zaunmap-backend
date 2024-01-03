module.exports = {
    "testEnvironment": "node", // Set the testing environment to 'node'. This is used by Jest, a testing framework, to know that the tests are running in a Node.js environment rather than in a browser.

    "moduleNameMapper": {
        // Map module names for tests. This is commonly used to mock certain modules or to provide specific paths for modules during testing.
        '^axios$': require.resolve('axios'), // Specifically, this line is mapping 'axios' to the resolved path of the axios module. It ensures that whenever 'axios' is imported in the tests, it uses the specific axios module resolved here. This can be particularly useful for mocking or ensuring consistency in module versions across tests.
    }
};
