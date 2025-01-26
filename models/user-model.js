import { Schema, model } from "mongoose"

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, { timestamps: true })

export const userModel = model("User", UserSchema)