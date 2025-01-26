import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import { authRouters } from "./routers/index.js"

dotenv.config()

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  credentials: true,
  methods: ['GET', 'POST'],
  origin: process.env.CLIENT_URL,
}))

app.use("/api", authRouters)


const main = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

main()