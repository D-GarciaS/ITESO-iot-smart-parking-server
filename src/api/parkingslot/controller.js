import { success, notFound } from '../../services/response/'
import { Parkingslot } from '.'

const checkInvasion = (entity, current) => {
  var isInvasion = entity.occupied ? entity.occupied === current : false
  var body = {
    occupied: current,
    invaded: isInvasion
  }
  console.log(body)
  console.log(Object.assign(entity, body))
  return Object.assign(entity, body).save()
}

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

export const updateState = ({ bodymen: { body }, params }, res, next) =>
  Parkingslot.findById(params.id)
    .then(notFound(res))
    .then((res) => checkInvasion(res, body.occupied))
    .then((parkingslot) => parkingslot ? parkingslot.view(true) : null)
    .then(success(res))
    .catch(next)

export const indexSection = ({ params }, res, next) =>
  Parkingslot.find({ section: params.sec })
    .then(notFound(res))
    .then((parkingslots) => parkingslots.map((parkingslot) => parkingslot.view()))
    .then(success(res))
    .catch(next)

export const findOccupied = ({params, res, next}) =>
  Parkingslot.find({ occupied: true })
    .then(notFound(res))
    .then((parkingslots) => parkingslots.map((parkingslot) => parkingslot.view()))
    .then(success(res))
    .catch(next)
