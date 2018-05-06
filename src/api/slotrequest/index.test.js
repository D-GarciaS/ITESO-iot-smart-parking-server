import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Slotrequest } from '.'

const app = () => express(apiRoot, routes)

let slotrequest

beforeEach(async () => {
  slotrequest = await Slotrequest.create({})
})

test('POST /slotrequests 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ plates: 'test', driver: 'test', passenger: 'test', retry: 'test', successful: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.plates).toEqual('test')
  expect(body.driver).toEqual('test')
  expect(body.passenger).toEqual('test')
  expect(body.retry).toEqual('test')
  expect(body.successful).toEqual('test')
})

test('GET /slotrequests 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})
