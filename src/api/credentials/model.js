import mongoose, { Schema } from 'mongoose'

const credentialsSchema = new Schema({
  barcode: {
    type: String
  },
  userId: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

credentialsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      barcode: this.barcode,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Credentials', credentialsSchema)

export const schema = model.schema
export default model
