import * as protoLoader from '@grpc/proto-loader';
import * as grpc from 'grpc';
import { services } from './grpc';
import logger from './lib/logger';

const PROTO_PATH = __dirname + '/../service.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
});
const { blog } = grpc.loadPackageDefinition(packageDefinition) as any;

export default function startServer() {
	const server = new grpc.Server();
	server.addService(blog.Blog.service, services);
	server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

	logger.info("GRPC server running on 50051")
	server.start();
}
