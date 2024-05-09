import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'


declare global {
  var prisma: PrismaClient | undefined
}

const client = new PrismaClient().$extends(withAccelerate())
// if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
