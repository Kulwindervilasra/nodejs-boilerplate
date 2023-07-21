import prisma from '../lib/db';

export function allUsers() {
	return prisma.user.findMany();
}
