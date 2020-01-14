const Products = `
  type Product {
    id: String
    displayName: String
    longDescription: String
  }

  type Query {
    getProduct(id: String): Product
  }
`;

module.exports = Products;
