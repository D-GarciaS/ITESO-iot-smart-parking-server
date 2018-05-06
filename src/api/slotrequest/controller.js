import { notFound, success } from '../../services/response/'
// import { validateCredentials } from '../../services/credentialsvalidator'

import { Slotrequest } from '.'

import Parkingslot, { schema } from '../parkingslot/model'

export const create = ({ bodymen: { body } }, res, next) =>
  Slotrequest.create(body)
    .then(slotrequest => slotrequest.view(true))
    .then(() =>
      Parkingslot.findOne({
        occupied: false,
        waiting: false,
        invaded: false,
        preferential: true
      })
    )
    .then(notFound(res))
    .then(entity => Object.assign(entity, { waiting: true }).save())
    .then(entity => ({
      section: entity.section,
      number: entity.number
    }))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Slotrequest.find(query, select, cursor)
    .then((slotrequests) => slotrequests.map((slotrequest) => slotrequest.view()))
    .then(success(res))
    .catch(next)
