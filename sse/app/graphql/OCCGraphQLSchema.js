const fetch = require('node-fetch');

const {GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString} = require('graphql');
const ProductType = require('./types/ProductType');

const BASE_URL = 'https://ccstore-z4ma.oracleoutsourcing.com/ccstore/v1';

function fetchResponseByURl (path) {
  return fetch(`${BASE_URL}${path}`, {
    headers: {
      'Authorization': '{YOUR_SERVERS_AUTHENTICATION}'
    }
  })
    .then(res => res.json());
}

function listProducts () {
  return fetchResponseByURl('/products');
}

function getProduct (id) {
  return fetchResponseByURl(`/products/${id}`);
}

const OccRootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Main for all queries',
  fields: () => ({
    listProducts: {
      type: new GraphQLList(ProductType),
      resolve: root => listProducts()
    },
    getProduct: {
      type: ProductType,
      args: {
        id: {type: GraphQLString}
      },
      resolve: (root, {id}) => getProduct(id)
    }
  })
});

module.exports = new GraphQLSchema({
  query: OccRootQuery
});
