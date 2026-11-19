// src/index.ts
import "dotenv/config";
import cors from "cors";
import express from "express";
import prisma from "./config/prisma";
import { errorHandler, notFound } from "./middlewares/error";
import { logger } from "./middlewares/logger";
import router from "./routes";

const app = express();

// Middleware global (urutannya penting!)
app.use(logger);
// Izinkan frontend Vite (port 5173) mengakses API ini (Modul 5 - bagian 10)
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    message: "Express + Prisma + Neon API",
    endpoints: { users: "/api/users", posts: "/api/posts", health: "/health" },
  });
});

// Cek koneksi database (sekaligus membangunkan Neon dari scale-to-zero)
app.get("/health", async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.json({ status: true, message: "Server dan database OK" });
});

app.use("/api", router);

// Dua middleware ini harus paling bawah
app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;
const server = app.listen(PORT, (error?: Error) => {
  if (error) throw error;
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

// Graceful shutdown (Ctrl+C)
const shutdown = async () => {
  server.close();
  await prisma.$disconnect();
  console.log("Database disconnected");
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
