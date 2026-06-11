import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";

process.env.JWT_SECRET = "test-secret";

const { default: app } = await import("../src/app.js");

let mongod;

before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
});

after(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

test("auth: register, login, current, update profile, theme", async () => {
  const registerRes = await request(app).post("/api/auth/register").send({
    name: "Test User",
    email: "test@example.com",
    password: "Password1",
  });
  assert.equal(registerRes.status, 201);
  assert.ok(registerRes.body.token);
  assert.equal(registerRes.body.user.email, "test@example.com");

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "Password1",
  });
  assert.equal(loginRes.status, 200);
  const { token } = loginRes.body;

  const currentRes = await request(app)
    .get("/api/auth/current")
    .set("Authorization", `Bearer ${token}`);
  assert.equal(currentRes.status, 200);
  assert.equal(currentRes.body.name, "Test User");

  const themeRes = await request(app)
    .patch("/api/auth/theme")
    .set("Authorization", `Bearer ${token}`)
    .send({ theme: "violet" });
  assert.equal(themeRes.status, 200);
  assert.equal(themeRes.body.theme, "violet");

  const noAuthRes = await request(app).get("/api/auth/current");
  assert.equal(noAuthRes.status, 401);
});

test("boards: create board, column, card, move card, delete cascade", async () => {
  const registerRes = await request(app).post("/api/auth/register").send({
    name: "Board Owner",
    email: "owner@example.com",
    password: "Password1",
  });
  const { token } = registerRes.body;
  const auth = (req) => req.set("Authorization", `Bearer ${token}`);

  const boardRes = await auth(request(app).post("/api/boards")).send({
    title: "Project office",
    icon: "icon-project",
  });
  assert.equal(boardRes.status, 201);
  const boardId = boardRes.body._id;

  const columnRes = await auth(
    request(app).post(`/api/boards/${boardId}/columns`)
  ).send({ title: "To Do" });
  assert.equal(columnRes.status, 201);
  const columnId = columnRes.body._id;

  const column2Res = await auth(
    request(app).post(`/api/boards/${boardId}/columns`)
  ).send({ title: "Done" });
  const column2Id = column2Res.body._id;

  const cardRes = await auth(
    request(app).post(`/api/columns/${columnId}/cards`)
  ).send({
    title: "The Watch Spot Design",
    description: "Design a watch dial",
    priority: "low",
    deadline: "2026-12-31",
  });
  assert.equal(cardRes.status, 201);
  const cardId = cardRes.body._id;

  const boardWithColumns = await auth(
    request(app).get(`/api/boards/${boardId}`)
  );
  assert.equal(boardWithColumns.status, 200);
  assert.equal(boardWithColumns.body.columns.length, 2);
  assert.equal(boardWithColumns.body.columns[0].cards.length, 1);

  const moveRes = await auth(
    request(app).patch(`/api/cards/${cardId}/move`)
  ).send({ columnId: column2Id });
  assert.equal(moveRes.status, 200);
  assert.equal(moveRes.body.columnId, column2Id);

  const deleteBoardRes = await auth(
    request(app).delete(`/api/boards/${boardId}`)
  );
  assert.equal(deleteBoardRes.status, 200);

  const getDeletedBoard = await auth(
    request(app).get(`/api/boards/${boardId}`)
  );
  assert.equal(getDeletedBoard.status, 404);
});

test("validation: invalid card data is rejected", async () => {
  const registerRes = await request(app).post("/api/auth/register").send({
    name: "Validation User",
    email: "validation@example.com",
    password: "Password1",
  });
  const { token } = registerRes.body;
  const auth = (req) => req.set("Authorization", `Bearer ${token}`);

  const boardRes = await auth(request(app).post("/api/boards")).send({
    title: "Validation board",
  });
  const boardId = boardRes.body._id;

  const columnRes = await auth(
    request(app).post(`/api/boards/${boardId}/columns`)
  ).send({ title: "To Do" });
  const columnId = columnRes.body._id;

  const cardRes = await auth(
    request(app).post(`/api/columns/${columnId}/cards`)
  ).send({ title: "" });
  assert.equal(cardRes.status, 400);
});
