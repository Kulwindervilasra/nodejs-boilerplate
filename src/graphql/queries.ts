import { GraphQLError } from 'graphql';
import prisma, { GraphQLContext } from '../lib/db';

export function allUsers(
	_parent: any,
	_args: unknown,
	_contextValue: GraphQLContext,
) {
	console.log('HERE CURRENT USER', _contextValue.currentUser);
	if (!_contextValue.currentUser) {
		throw new GraphQLError('You are not authorized to perform this action');
	}
	return prisma.user.findMany();
}
