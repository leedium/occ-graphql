const {GraphQLObjectType, GraphQLString} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'ProductType',
  description: 'Products type definition',
  fields: () => ({
    id: {type: GraphQLString},
    displayName: {type: GraphQLString},
    longDescription: {type: GraphQLString}
  })
});
