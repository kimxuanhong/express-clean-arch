const request = require('supertest');
const makeApp = require('../src/app/app');

let app;
beforeEach(() => { app = makeApp(); });

test('create order and get it', async () => {
  const res = await request(app).post('/orders').send({ items: ['apple'], total: 100 });
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  const id = res.body.id;
  const get = await request(app).get(`/orders/${id}`);
  expect(get.status).toBe(200);
  expect(get.body.total).toBe(100);
});

test('create payment for order and get payment', async () => {
  const orderRes = await request(app).post('/orders').send({ items: ['item'], total: 50 });
  const orderId = orderRes.body.id;
  const payRes = await request(app).post('/payments').send({ orderId, amount: 50 });
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
