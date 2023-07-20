import * as fs from 'fs';
import { ServerUnaryCall, sendUnaryData, Call, ServiceError, ServerReadableStream } from 'grpc';
import { uuid } from 'uuidv4';
import prisma from '../lib/db';
import logger from '../lib/logger';

interface IPOST {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	title: string;
	content: string | null;
	published: boolean;
	authorId: number;
}

interface IUser {
	id: number;
	email: string;
	name: string | null;
}

export async function post(
	call: ServerUnaryCall<{ id: number }>,
	callback: sendUnaryData<IPOST>,
) {
	const { id } = call.request;
	const postRes = await prisma.post.findUnique({
		where: {
			id,
		},
	});
	callback(null, postRes);
}

export async function feed(
	call: Call,
	callback: sendUnaryData<{ feedRes: Array<IPOST> }>,
) {
	const feedRes = await prisma.post.findMany({
		where: { published: true },
	});
	callback(null, { feedRes });
}

export async function filterPosts(
	call: ServerUnaryCall<{ searchString: string }>,
	callback: sendUnaryData<{ filteredPosts: Array<IPOST> }>,
) {
	const { searchString } = call.request;
	const filteredPosts = await prisma.post.findMany({
		where: {
			OR: [
				{
					title: {
						contains: searchString,
					},
				},
				{
					content: {
						contains: searchString,
					},
				},
			],
		},
	});
	callback(null, { filteredPosts });
}

export async function signupUser(
	call: ServerUnaryCall<{ email: string; name: string }>,
	callback: sendUnaryData<IUser>,
) {
	const { email, name } = call.request;
	try {
		const newUser = await prisma.user.create({
			data: {
				name,
				email,
			},
		});
		callback(null, newUser);
	} catch (e) {
		callback(e as ServiceError, null);
	}
}

export async function createDraft(call: any, callback: any) {
	const { title, content, authorEmail } = call.request;
	try {
		const newDraft = await prisma.post.create({
			data: {
				title,
				content,
				published: false,
				author: { connect: { email: authorEmail } },
			},
		});
		callback(null, newDraft);
	} catch (e) {
		callback(e, null);
	}
}

export async function deletePost(call: any, callback: any) {
	const { id } = call.request;
	try {
		const deletedPost = await prisma.post.delete({
			where: {
				id,
			},
		});
		callback(null, deletedPost);
	} catch (e) {
		callback(e, null);
	}
}

export async function publish(call: any, callback: any) {
	const { id } = call.request;
	try {
		const publishedPost = await prisma.post.update({
			where: { id },
			data: { published: true },
		});
		callback(null, publishedPost);
	} catch (e) {
		callback(e, null);
	}
}




// define file upload method

export async function uploadFile(call: ServerReadableStream<{ name: string, chunk: Buffer }>,
	callback: sendUnaryData<{ id: string, name: string }>) {
	logger.debug('gRPC file upload');

	let name: string;
	const tempFilePath = `./${uuid()}.jpeg`;

	const file: fs.WriteStream = fs.createWriteStream(tempFilePath)
		;
	// handle incoming data stream
	call.on('data', (payload) => {
		if (payload.name) {
			name = payload.name;

		}
		if (payload.chunk)
			file.write(payload.chunk);

		logger.debug(`Writing file chunk: ${tempFilePath}`);

	});
	// on stream end send final response to the client with required details
	call.on('end', () => {
		file.close();
		callback(null, {
			'id': uuid(),
			'name': name
		});
	});
};