import mongoose from "mongoose"

const Schema = mongoose.Schema

const categorySchema = new Schema(
    {
        icon: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

export const Category = mongoose.model("Category", categorySchema)
