import mongoose from "mongoose"

const Schema = mongoose.Schema

const organizerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    events: {
        type: Array,
        ref: 'Event'
    }
  },
  { timestamps: true }
)

export const Organizer = mongoose.model("Organizer", organizerSchema)
