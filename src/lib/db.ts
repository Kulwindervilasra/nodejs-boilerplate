import { PrismaClient, User } from '@prisma/client';


export type GraphQLContext = {
    prisma: PrismaClient
    currentUser: null | User
}
export default new PrismaClient();
