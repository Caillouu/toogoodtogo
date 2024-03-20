import { db } from "../db/db.mjs"

export const Mutation = {
    addEvent: (parent, args, context, infos) => {
        if(!existInArray(db.events, 'args.id', args.id)) {
            throw new Error("Event ID not found")
        } else {
            const newEvent = {
                ...args.addEventInput,
                id: db.events.length + 1
            }
            db.events.push(newEvent)
            return newEvent
        }
    },
    updateEvent: (parent, args, context, infos) => {
        if(args.updateEventInput.id && !existInArray(db.events, 'args.id', args.updateEventInput.id)) {
            throw new Error("Event ID not found")
        } else {
            const event = db.events.find(event => event.id === args.id)
            if(!event) {
                throw new Error("Event ID not found")
            } else {
                for(let key in args.updateEventInput) {
                    event[key] = args.updateEventInput[key]
                }
                return event
            }
        }
    },
    deleteEvent: (parent, args, context, infos) => {
        const indexEvent = db.events.findIndex(event => event.id === args.id)
        if(indexEvent === -1) {
            throw new Error("Event ID not found")
        } else {
            const [event] = db.events.splice(indexEvent, 1)
            return event
        }
    },
}

const existInArray = (array, attribut, value) => {
    return array.some(element => element[attribut] === value)
}