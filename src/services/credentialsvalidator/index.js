import mongoose from 'mongoose'
import { Schema } from 'bodymen'
import Credentials, { schema } from '../../api/credentials/model'
export const findCredentials = (res) => (entity) => {
  var idArrays = entity.passenger.map(p => mongoose.Types.ObjectId(p.id))
  console.log("ids", idArrays)
  return Credentials.find({
    '_id': { $in: idArrays }
  })
}

export const credentialsFound = res => (entity) => {
  console.log('Credenciales', entity)
  return entity
}
