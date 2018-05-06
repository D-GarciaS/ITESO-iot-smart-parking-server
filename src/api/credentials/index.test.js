import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Credentials } from '.'

const app = () => express(apiRoot, routes)

let credentials

beforeEach(async () => {
  credentials = await Credentials.create({})
})

test('POST /credentials 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ barcode: 'test', userId: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.barcode).toEqual('test')
  expect(body.userId).toEqual('test')
})

test('GET /credentials 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /credentials/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${credentials.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(credentials.id)
})

test('GET /credentials/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /credentials/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${credentials.id}`)
    .send({ barcode: 'test', userId: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(credentials.id)
  expect(body.barcode).toEqual('test')
  expect(body.userId).toEqual('test')
})

test('PUT /credentials/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ barcode: 'test', userId: 'test' })
  expect(status).toBe(404)
})

test('DELETE /credentials/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${credentials.id}`)
  expect(status).toBe(204)
})

test('DELETE /credentials/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
