import { Event } from "../../models/event.js"

export const Organizer = {
    events: async(parent, args, context, info) => {
        const dbEvents = await Event.find()
        return dbEvents.filter((event) => 
        {
            return parent.events.includes(event.id)
        })
    }
}