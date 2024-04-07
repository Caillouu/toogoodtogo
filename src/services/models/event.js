import mongoose from "mongoose"

const Schema = mongoose.Schema

const eventSchema = new Schema(
  {
    place: {
      type: String,
      required: true,
    },
    event: {
      type: String,
      required: true,
    },
    organizers: {
      type: Array,
      ref: 'Organizer'
    },
    dateStart: {
      type: Number,
      required: true,
    },
    dateEnd: {
      type: Number,
      required: true,
    },
    category: {
      type: Object,
      ref: 'Category',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    status: {
      type: String,
      enum: ['WAITING', 'PENDING', 'DONE'],
      default: 'WAITING',
      required: true
    }
  },
  { timestamps: true }
)

export const Event = mongoose.model("Event", eventSchema)
