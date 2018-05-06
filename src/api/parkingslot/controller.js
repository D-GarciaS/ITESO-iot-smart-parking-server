import { success, notFound } from '../../services/response/'
import { Parkingslot } from '.'

const checkInvasion = (entity, current) => {
  // var isInvasion = entity.occupied ? entity.occupied !== current : false
  var isInvasion = !entity.occupied && !entity.waiting && current
  if (!isInvasion) return entity
  var body = {
    invaded: isInvasion,
    occupied: true
  }
  return Object.assign(entity, body)
}

const checkArrival = (entity, current) => {
  var isArrival = entity.waiting && current
  if (!isArrival) return entity
  var body = {
    waiting: false,
    occupied: true
  }
  return Object.assign(entity, body)
}

const checkDeparture = (entity, current) => {
  var isArrival = entity.occupied && !current
  if (!isArrival) return entity
  var body = {
    invaded: false,
    occupied: false
  }
  return Object.assign(entity, body)
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
    .then(res => {
      console.log('received', body)
      return res
    })
    .then(res => checkInvasion(res, body.occupied))
    .then(res => checkArrival(res, body.occupied))
    .then(res => checkDeparture(res, body.occupied))
    .then(res => res.save())
    .then(parkingslot => (parkingslot ? parkingslot.view(true) : null))
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
