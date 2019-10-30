import {
    GraphQLObjectType, GraphQLString, GraphQLID, 
} from 'graphql'

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString}
    })
})

export default UserType;