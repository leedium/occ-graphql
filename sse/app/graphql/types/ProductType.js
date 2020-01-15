import {GraphQLObjectType, GraphQLString} from 'graphql';

export default new GraphQLObjectType({
  name: 'ProductType',
  description: 'Products type definition',
  fields: () => ({
    id: {type: GraphQLString},
    displayName: {type: GraphQLString},
    longDescription: {type: GraphQLString}
  })
});
