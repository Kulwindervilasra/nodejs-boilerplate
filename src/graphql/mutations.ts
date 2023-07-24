import { writeFile } from 'fs';
import path from 'path';
// import { GraphQLResolveInfo } from 'graphql';
import { sign } from 'jsonwebtoken';
import { GraphQLContext } from '../lib/db';

interface IPost {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	title: string;
	content: string | null;
	published: boolean;
	authorId: number;
}

interface IUserRegister {
	email: string;
	name: string;
	posts?: Array<IPost>;
}

export async function signupUser(
	_parent: any,
	args: { data: IUserRegister, token: string },
	_contextValue: GraphQLContext,
	// _info: GraphQLResolveInfo
) {
	const profile = await _contextValue.prisma.user.create({
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

	return {
		data: profile,
		token: sign({ id: profile.id }, environment.secretKey)
	};

}

export async function saveFile(_: any, { file }: { file: File }) {
	try {
		const fileArrayBuffer = await file.arrayBuffer();
		writeFile(
			path.join(__dirname, file.name),
			Buffer.from(fileArrayBuffer),
			{},
			() => { },
		);
	} catch (e) {
		return false;
	}
	return true;
}
