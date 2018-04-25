import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, indexSection, updateState } from './controller'
import { schema } from './model'
export Parkingslot, { schema } from './model'

const router = new Router()
const { number, section, occupied, waiting, invaded, preferential } = schema.tree

/**
 * @api {post} /parkingslots Create parkingslot
 * @apiName CreateParkingslot
 * @apiGroup Parkingslot
 * @apiParam number Parkingslot's number.
 * @apiParam section Parkingslot's section.
 * @apiParam occupied Parkingslot's occupied.
 * @apiParam preferential Parkingslot's preferential.
 * @apiSuccess {Object} parkingslot Parkingslot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Parkingslot not found.
 */
router.post('/',
  body({ number, section, occupied, waiting, invaded, preferential }),
  create)

/**
 * @api {get} /parkingslots Retrieve parkingslots
 * @apiName RetrieveParkingslots
 * @apiGroup Parkingslot
 * @apiUse listParams
 * @apiSuccess {Object[]} parkingslots List of parkingslots.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /parkingslots/:id Retrieve parkingslot
 * @apiName RetrieveParkingslot
 * @apiGroup Parkingslot
 * @apiSuccess {Object} parkingslot Parkingslot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Parkingslot not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /parkingslots/:id Update parkingslot
 * @apiName UpdateParkingslot
 * @apiGroup Parkingslot
 * @apiParam number Parkingslot's number.
 * @apiParam section Parkingslot's section.
 * @apiParam occupied Parkingslot's occupied.
 * @apiParam preferential Parkingslot's preferential.
 * @apiSuccess {Object} parkingslot Parkingslot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Parkingslot not found.
 */
router.put('/:id',
  body({ number, section, occupied, waiting, invaded, preferential }),
  update)

/**
 * @api {delete} /parkingslots/:id Delete parkingslot
 * @apiName DeleteParkingslot
 * @apiGroup Parkingslot
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Parkingslot not found.
 */
router.delete('/:id',
  destroy)

/**
 * TODO: Comment
 */
router.get('/section/:sec',
  indexSection)

/**
 * TODO: Comment
 */
router.post('/state/:id',
  body({ number, section, occupied, waiting, invaded, preferential }),
  updateState)

export default router
