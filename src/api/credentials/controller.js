import { success, notFound } from '../../services/response/'
import { Credentials } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Credentials.create(body)
    .then((credentials) => credentials.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Credentials.find(query, select, cursor)
    .then((credentials) => credentials.map((credentials) => credentials.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Credentials.findById(params.id)
    .then(notFound(res))
    .then((credentials) => credentials ? credentials.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Credentials.findById(params.id)
    .then(notFound(res))
    .then((credentials) => credentials ? Object.assign(credentials, body).save() : null)
    .then((credentials) => credentials ? credentials.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Credentials.findById(params.id)
    .then(notFound(res))
    .then((credentials) => credentials ? credentials.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const validate = ({ params, body }, res, next) =>
  Credentials.findOne({ barcode: body.barcode })
    .then(notFound(res))
    .then(success(res, 204))
    .catch(next)
