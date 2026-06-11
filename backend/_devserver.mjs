import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

process.env.JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const mongod = await MongoMemoryServer.create();
await mongoose.connect(mongod.getUri());

const { default: app } = await import("./src/app.js");

app.listen(3000, () => {
  console.log("Dev server with in-memory MongoDB running on port 3000");
});
