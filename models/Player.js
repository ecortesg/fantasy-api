import mongoose from "mongoose"

const playerSchema = new mongoose.Schema({}, { strict: false })

const Player = mongoose.model("Player", playerSchema)
export default Player
