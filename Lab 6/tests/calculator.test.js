const request = require('supertest');
const app = require('../app'); // Asegúrate de que este path sea correcto

describe('Calculator Routes', () => {
  test('GET /add should return the sum of two numbers', async () => {
    const response = await request(app).get('/calculator/add?num1=5&num2=3');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ result: 8 });
  });

  test('GET /subtract should return the difference of two numbers', async () => {
    const response = await request(app).get('/calculator/subtract?num1=5&num2=3');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ result: 2 });
  });

  test('GET /multiply should return the product of two numbers', async () => {
    const response = await request(app).get('/calculator/multiply?num1=5&num2=3');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ result: 15 });
  });

  test('GET /divide should return the quotient of two numbers', async () => {
    const response = await request(app).get('/calculator/divide?num1=6&num2=3');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ result: 2 });
  });

  test('GET /divide should return error when dividing by zero', async () => {
    const response = await request(app).get('/calculator/divide?num1=6&num2=0');
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Cannot divide by zero' });
  });
});
