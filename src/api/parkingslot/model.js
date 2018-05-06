import mongoose, { Schema } from 'mongoose'

const parkingslotSchema = new Schema({
  number: {
    type: String
  },
  section: {
    type: String
  },
  occupied: {
    type: Boolean,
    default: false
  },
  waiting: {
    type: Boolean,
    default: false
  },
  invaded: {
    type: Boolean,
    default: false
  },
  preferential: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

parkingslotSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      number: this.number,
      section: this.section,
      occupied: this.occupied,
      waiting: this.waiting,
      invaded: this.invaded,
      preferential: this.preferential,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Parkingslot', parkingslotSchema)

export const schema = model.schema
export default model
