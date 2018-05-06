import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index } from './controller'
import { schema } from './model'
export Slotrequest, { schema } from './model'

const router = new Router()
const { plates, driver, passenger, retry, successful } = schema.tree

/**
 * @api {post} /slotrequests Create slotrequest
 * @apiName CreateSlotrequest
 * @apiGroup Slotrequest
 * @apiParam plates Slotrequest's plates.
 * @apiParam driver Slotrequest's driver.
 * @apiParam passenger Slotrequest's passenger.
 * @apiParam retry Slotrequest's retry.
 * @apiParam successful Slotrequest's successful.
 * @apiSuccess {Object} slotrequest Slotrequest's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Slotrequest not found.
 */
router.post('/',
  body({ plates, driver, passenger, retry, successful }),
  create)

/**
 * @api {get} /slotrequests Retrieve slotrequests
 * @apiName RetrieveSlotrequests
 * @apiGroup Slotrequest
 * @apiUse listParams
 * @apiSuccess {Object[]} slotrequests List of slotrequests.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

export default router
