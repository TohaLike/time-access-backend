import { model, Schema } from "mongoose";

const token = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true }
})

export const tokenModel = model("Token", token)