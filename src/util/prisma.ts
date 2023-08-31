import { PrismaClient } from '@prisma/client';

/**
 * The database client.
 *
 * A reference to the database client, through this reference, the module can
 * access and interact with the database.
 *
 * @see https://www.prisma.io/
 * @see https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prismaclient-in-long-running-applications
 */
export const prisma: PrismaClient = new PrismaClient();
