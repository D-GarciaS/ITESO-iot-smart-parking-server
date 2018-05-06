import mongoose, { Schema } from 'mongoose'

const slotrequestSchema = new Schema({
  plates: {
    type: String
  },
  driver: {
    type: String
  },
  passenger: [{
    type: String
  }],
  retry: {
    type: Boolean
  },
  successful: {
    type: Boolean
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

slotrequestSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      plates: this.plates,
      driver: this.driver,
      passenger: this.passenger,
      retry: this.retry,
      successful: this.successful,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Slotrequest', slotrequestSchema)

export const schema = model.schema
export default model
