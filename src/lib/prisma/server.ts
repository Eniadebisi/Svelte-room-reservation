import {  PrismaClient } from '@prisma/client';

import { NODE_ENV } from '$env/static/private';

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export const prisma =
    global.prisma ||
    new PrismaClient({
        // * Uncomment this to see the SQL queries in the console
        // log: NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
    });

if (NODE_ENV !== 'production') {
    global.prisma = prisma;
}
