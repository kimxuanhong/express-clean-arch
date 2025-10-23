const request = require('supertest');
const makeApp = require('../src/app/app');

let app;
beforeEach(() => { app = makeApp(); });

test('create and get user', async () => {
  const res = await request(app).post('/users').send({ name: 'Alice', email: 'alice@example.com' });
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe('Alice');

  const id = res.body.id;
  const get = await request(app).get(`/users/${id}`);
  expect(get.status).toBe(200);
  expect(get.body.email).toBe('alice@example.com');
});

test('list users empty then one', async () => {
  const list1 = await request(app).get('/users');
  expect(list1.status).toBe(200);
  expect(Array.isArray(list1.body)).toBe(true);
  expect(list1.body.length).toBe(0);

  await request(app).post('/users').send({ name: 'Bob', email: 'bob@example.com' });
  const list2 = await request(app).get('/users');
  expect(list2.body.length).toBe(1);
});
