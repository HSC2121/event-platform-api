import test from "node:test";
import assert from "node:assert/strict";
import app from "../src/app.js";

test("GET /api/health returns 200", async t => {
  const server = app.listen(0);

  t.after(() => {
    server.close();
  });

  const address = server.address();
  const response = await fetch(
    `http://127.0.0.1:${address.port}/api/health`
  );

  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.status, "success");
  assert.equal(body.message, "Server is active");
});