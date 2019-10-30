import {
    GraphQLObjectType,
    GraphQLList
} from 'graphql';

import UserType from './types/user_type'
import User from '../models/user'

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            resolve(parent, args, req) {
                return req.user;
            }
        }
        // users: {
        //     type: new GraphQLList(UserType),
        //     resolve(parent, args) {
        //         return User.find({});
        //     }
        // }
    })
})

export default RootQuery;