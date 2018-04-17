import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Parkingslot } from '.'

const app = () => express(apiRoot, routes)

let parkingslot

beforeEach(async () => {
  parkingslot = await Parkingslot.create({})
})

test('POST /parkingslots 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ number: 'test', section: 'test', occupied: 'test', preferential: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.number).toEqual('test')
  expect(body.section).toEqual('test')
  expect(body.occupied).toEqual('test')
  expect(body.preferential).toEqual('test')
})

test('GET /parkingslots 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /parkingslots/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${parkingslot.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(parkingslot.id)
})

test('GET /parkingslots/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /parkingslots/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${parkingslot.id}`)
    .send({ number: 'test', section: 'test', occupied: 'test', preferential: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(parkingslot.id)
  expect(body.number).toEqual('test')
  expect(body.section).toEqual('test')
  expect(body.occupied).toEqual('test')
  expect(body.preferential).toEqual('test')
})

test('PUT /parkingslots/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ number: 'test', section: 'test', occupied: 'test', preferential: 'test' })
  expect(status).toBe(404)
})

test('DELETE /parkingslots/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${parkingslot.id}`)
  expect(status).toBe(204)
})

test('DELETE /parkingslots/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
