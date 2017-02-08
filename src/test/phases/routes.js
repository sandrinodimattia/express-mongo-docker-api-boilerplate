import test from 'ava';
import request from 'supertest';
import server from '../helpers/server';

test.beforeEach.cb(server.start);
test.afterEach.cb(server.stop);

test.serial('responds with 200 when calling /test', async (t) => {
  t.plan(1);

  const response = await request(t.context.server).get('/test');
  t.is(response.status, 200);
});

test.serial('responds with 200 when creating the user', async (t) => {
  t.plan(2);

  const response = await request(t.context.server)
    .post('/users')
    .send({ username: 'sandrino' });
  t.is(response.status, 200);
  t.is(response.body.username, 'sandrino');
});

test.serial('responds with 400 for user creation when validation fails', async (t) => {
  t.plan(2);

  const response = await request(t.context.server)
    .post('/users')
    .send({ });
  t.is(response.status, 400);
  t.is(response.body.error_code, 'validation_error');
});
