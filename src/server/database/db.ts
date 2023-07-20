import { PrismaClient } from "@prisma/client";
import { env } from "@/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

type LogLevel = "info" | "query" | "warn" | "error";

const logLevelOptions: Record<string, LogLevel[]> = {
  zero: [], // nothing will be logged
  one: ["error"], // errors will be logged
  two: ["warn", "error"], // errors and warnings will be logged
  three: ["query", "warn", "error"], // queries, errors, and warnings will be logged
  four: ["info", "query", "warn", "error"], // everything will be logged
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === "development" ? logLevelOptions.two : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
