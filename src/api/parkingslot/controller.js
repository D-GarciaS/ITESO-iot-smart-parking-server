import { success, notFound } from '../../services/response/'
import { Parkingslot } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Parkingslot.create(body)
    .then((parkingslot) => parkingslot.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Parkingslot.find(query, select, cursor)
    .then((parkingslots) => parkingslots.map((parkingslot) => parkingslot.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Parkingslot.findById(params.id)
    .then(notFound(res))
    .then((parkingslot) => parkingslot ? parkingslot.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Parkingslot.findById(params.id)
    .then(notFound(res))
    .then((parkingslot) => parkingslot ? Object.assign(parkingslot, body).save() : null)
    .then((parkingslot) => parkingslot ? parkingslot.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Parkingslot.findById(params.id)
    .then(notFound(res))
    .then((parkingslot) => parkingslot ? parkingslot.remove() : null)
    .then(success(res, 204))
    .catch(next)
