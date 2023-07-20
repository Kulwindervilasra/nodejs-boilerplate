import { YogaInitialContext } from 'graphql-yoga';
import { arg } from 'nexus';
import prisma from '../lib/db';

interface IPost {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	title: string;
	content: string | null;
	published: boolean;
	authorId: number;
}

export function signupUser(parent: any, args: any) {
	console.log(args);
	return prisma.user.create({
		data: {
			email: args.data.email,
			name: args.data.name,
			posts: {
				create: (args.data.posts ?? []).map((post: IPost) => ({
					title: post.title,
					content: post.content ?? undefined,
				})),
			},
		},
	});
}
