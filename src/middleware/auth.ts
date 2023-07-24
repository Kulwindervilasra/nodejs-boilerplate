import { PrismaClient, User } from '@prisma/client';
import { JwtPayload, verify } from 'jsonwebtoken';


export async function authenticateUser(
    prisma: PrismaClient,
    request: Request
): Promise<User | null> {
    const header = request.headers.get('authorization');
    if (header !== null) {
        // 1
        const token = header.split(' ')[1];
        // 2
        const tokenPayload = verify(token, environment.secretKey) as JwtPayload;
        // 3
        const userId = tokenPayload.id;
        // 4
        return prisma.user.findUnique({ where: { id: userId } });
    }

    return null;
}