import { Category } from "../../models/category.js"
import { Organizer } from "../../models/organizer.js"
import mongoose from "mongoose"

export const Event = {
    organizers: async (parent, args, context, info) => {
        const dbOrganizers = await Organizer.find()
        return dbOrganizers.filter((organizer) => {
            return parent.organizers.includes(organizer.id)
        })
    },
    category: async (parent, args, context, info) => {
        const dbCategories = await Category.find()
        const category = dbCategories.find((category) => {
            return parent.category.includes(category.id)
        })
        return category
    }
}