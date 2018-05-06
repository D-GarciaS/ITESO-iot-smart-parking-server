import { Schema } from 'bodymen'
import Credentials, { schema } from '../../api/credentials/model'

export const validateCredentials = () => (err, req, res) => {
  if (err) throw err

  var credentials = req.body.credentials

}