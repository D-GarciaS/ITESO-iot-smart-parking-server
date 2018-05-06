import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, validate } from './controller'
import { schema } from './model'
export Credentials, { schema } from './model'

const router = new Router()
const { barcode, userId } = schema.tree

/**
 * @api {post} /credentials Create credentials
 * @apiName CreateCredentials
 * @apiGroup Credentials
 * @apiParam barcode Credentials's barcode.
 * @apiParam userId Credentials's userId.
 * @apiSuccess {Object} credentials Credentials's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Credentials not found.
 */
router.post('/',
  body({ barcode, userId }),
  create)

/**
 * @api {get} /credentials Retrieve credentials
 * @apiName RetrieveCredentials
 * @apiGroup Credentials
 * @apiUse listParams
 * @apiSuccess {Object[]} credentials List of credentials.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /credentials/:id Retrieve credentials
 * @apiName RetrieveCredentials
 * @apiGroup Credentials
 * @apiSuccess {Object} credentials Credentials's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Credentials not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /credentials/:id Update credentials
 * @apiName UpdateCredentials
 * @apiGroup Credentials
 * @apiParam barcode Credentials's barcode.
 * @apiParam userId Credentials's userId.
 * @apiSuccess {Object} credentials Credentials's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Credentials not found.
 */
router.put('/:id',
  body({ barcode, userId }),
  update)

/**
 * @api {delete} /credentials/:id Delete credentials
 * @apiName DeleteCredentials
 * @apiGroup Credentials
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Credentials not found.
 */
router.delete('/:id',
  destroy)

/**
 * TODO: docs
 */
router.get('/validate/:', validate)

export default router
