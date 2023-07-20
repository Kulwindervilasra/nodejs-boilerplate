import prisma from '../lib/db';

export function allUsers(d: any, s: any, r: any) {
	console.log('here', d, s, r);
	return prisma.user.findMany();
}
