import { join } from "path";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";
import User from "../entity/User";
import chatResolver from "./resolvers/chatResolvers";
import messageResolver from "./resolvers/messageResolvers";
import userResolver from "./resolvers/userResolvers";

const allTypes = fileLoader(join(__dirname, "/typeDefs.graphql"));

const resolvers = {
	Query: {
		...chatResolver.Query,
		...userResolver.Query,
		...messageResolver.Query
	},
	Mutation: {
		...chatResolver.Mutation,
		...userResolver.Mutation,
		...messageResolver.Mutation
	}
};

export type contextType = {
	user: User;
};

const schema = makeExecutableSchema({
	typeDefs: mergeTypes(allTypes),
	resolvers: resolvers
});
export default schema;
