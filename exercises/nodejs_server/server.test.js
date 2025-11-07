import { test } from 'node:test';
import assert from 'node:assert';

test('basic server test', async () => {
  // Simple test to verify the server can be imported
  const server = await import('./server.js');
  assert.ok(server.default, 'Server module should export a default app');
});
