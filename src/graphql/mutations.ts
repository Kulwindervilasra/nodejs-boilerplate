import { YogaInitialContext } from 'graphql-yoga';
import { arg } from 'nexus';
import prisma from '../lib/db';
import { writeFile } from 'fs';
import path from 'path';

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

export async function saveFile(_: any, { file }: { file: File }) {
	try {
		console.log('Here file', file.name);
		const fileArrayBuffer = await file.arrayBuffer();
		writeFile(
			path.join(__dirname, file.name),
			Buffer.from(fileArrayBuffer),
			{},
			() => {},
		);
	} catch (e) {
		return false;
	}
	return true;
}
