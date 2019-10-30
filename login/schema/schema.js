import {
    GraphQLSchema
} from 'graphql'

import RootQuery from './rootquery'
import Mutation from './mutations'


export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
