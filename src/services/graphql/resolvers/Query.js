import mongoose from "mongoose"
import { Event } from "../../models/event.js"
import { User } from "../../models/user.js"
import { Organizer } from "../../models/organizer.js"

export const Query = {
    events : async () => {
        try {
            const dbEvents = await Event.find()
            return dbEvents.map(event => {
                return {
                    ...event._doc,
                    _id: event.id
                }   
            })
        } catch (error) {
            throw error
        }
    },
    eventById : async (args) => {
        try {
            const id = new mongoose.Types.ObjectId(args.id)
            const event = await Event.findById(id).exec()
            if(!event) {
                throw new Error("Event ID not found")
            }
            return event
        } catch (error) {
            throw error
        }
    },
    users: async () => {
        try {
            const dbUsers = await User.find()
            return dbUsers.map(user => {
                return {
                    ...user._doc,
                    _id: user.id
                }
            })
        } catch (error) {
            throw error
        }
    },
    userById: async (args) => {
        try {
            const id = new mongoose.Types.ObjectId(args.id)
            const user = await User.findById(id).exec()
            if(!user) {
                throw new Error("User ID not found")
            }
            return user
        } catch (error) {
            throw error
        }
    },
    organizers: async () => {
        try {
            const dbOrganizers = await Organizer.find()
            return dbOrganizers.map(organizer => {
                return {
                    ...organizer._doc,
                    _id: organizer.id
                }
            })
        } catch (error) {
            throw error
        }
    },
    organizerById: async (args) => {
        try {
            const id = new mongoose.Types.ObjectId(args.id)
            const organizer = await Organizer.findById(id).exec()
            if(!organizer) {
                throw new Error("Organizer ID not found")
            }
            return organizer
        } catch (error) {
            throw error
        }
    }
}