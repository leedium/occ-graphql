import fetch from 'node-fetch';

import {GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString} from 'graphql';
import ProductType from './types/ProductType';

const BASE_URL = 'https://ccstore-z4ma.oracleoutsourcing.com/ccstore/v1';

function fetchResponseByURl (path) {
  return fetch(`${BASE_URL}/${path}`)
    .then(res => res.json());
}

function getProduct(id) {
  return fetchResponseByURl(`/products/${id}`);
}

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Main for all queries',
  fields: () => ({
    listProducts: {
      type: new GraphQLList(ProductType),
      resolve: root => ({})
    },
    getProduct: new GraphQLObjectType({
      type: ProductType,
      args: {
        id: {type: GraphQLString},
        resolve: (root, {id}) => getProduct(id)
      }
    })
  })
});

export default new GraphQLSchema({
  query: QueryType
});
