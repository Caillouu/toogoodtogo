import { Organizer } from "../../models/organizer.js"

export const Event = {
    organizers: async(parent, args, context, info) => {
        const dbOrganizers = await Organizer.find()
        return dbOrganizers.filter((organizer) => 
        {
            return parent.organizers.includes(organizer.id)
        })
    }
}