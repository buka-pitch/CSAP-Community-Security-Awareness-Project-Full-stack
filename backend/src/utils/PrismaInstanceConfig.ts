import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
export default client;
export const prisma = client;
