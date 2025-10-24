import request from 'supertest';
import { makeApp } from '../src/app/app';
import { Application } from 'express';

/**
 * @fileoverview Order and Payment Tests - Test cases for order and payment functionality
 */

let app: Application;

beforeEach(() => { 
  app = makeApp(); 
});

test('create order and get it', async () => {
  const res = await request(app).post('/orders').send({ 
    userId: 'user-123', 
    amount: 100, 
    items: ['apple'] 
  });
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  const id = res.body.id;
  const get = await request(app).get(`/orders/${id}`);
  expect(get.status).toBe(200);
  expect(get.body.amount).toBe(100);
});

test('create payment for order and get payment', async () => {
  const orderRes = await request(app).post('/orders').send({ 
    userId: 'user-123', 
    amount: 50, 
    items: ['item'] 
  });
  const orderId = orderRes.body.id;
  const payRes = await request(app).post('/payments').send({ 
    orderId, 
    amount: 50, 
    method: 'credit_card' 
  });
  expect(payRes.status).toBe(201);
  expect(payRes.body.id).toBeDefined();
  const payId = payRes.body.id;
  // payment should start pending
  const get1 = await request(app).get(`/payments/${payId}`);
  expect(get1.body.status).toBe('pending');
  // complete payment
  const put = await request(app).put(`/payments/${payId}`).send({ status: 'completed' });
  expect(put.status).toBe(200);
  expect(put.body.status).toBe('completed');
});
