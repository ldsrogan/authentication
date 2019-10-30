import AuthService from '../services/auth'
import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';


import UserType from './types/user_type';

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        signup: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, { username, password, email }, req) {
                return AuthService.signup({ username, password, email, req });
            }
        },
        logout: {
            type: UserType,
            resolve (parent, args, req) {
                return AuthService.logout({req});
            }
        },
        login: {
            type: UserType,
            args: {
                usrename: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, { username, password }, req) {
                return AuthService.login({username, password, req});
            }
        }
    })
})

export default Mutation;