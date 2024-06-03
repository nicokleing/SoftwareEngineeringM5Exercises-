const { app, server } = require('../index');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const supertest = require('supertest');
const request = supertest(app);

describe('API Tests', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  it('should fetch all products', async () => {
    const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    mock.onGet('https://fakestoreapi.com/products').reply(200, products);

    const res = await request.get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(products);
  });

  it('should fetch product by id', async () => {
    const product = { id: 1, name: 'Product 1' };
    mock.onGet('https://fakestoreapi.com/products/1').reply(200, product);

    const res = await request.get('/api/products/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(product);
  });
});
