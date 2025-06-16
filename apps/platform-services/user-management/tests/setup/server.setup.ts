import { app } from '../../src/app';

export const setupTestServer = () => {
  const port = process.env.TEST_PORT || 3002;
  return app.listen(port, () => {
    console.log(`🚀 Test server running on port ${port}`);
  });
};
