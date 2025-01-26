import { model, Schema } from "mongoose";

const dateSchema = new Schema({
  day: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }
}, { timestamps: true })

export const dateTimeModel = model("DateTime", dateSchema)