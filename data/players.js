import Player from "../models/Player.js"
import { getPlayers } from "./api.js"

// Fetch and store players data
export async function fetchAndStorePlayersData() {
  try {
    const data = await getPlayers()

    await Player.insertMany(data)

    console.log("Players data stored successfully.")
  } catch (error) {
    console.log(`Error storing players data:`, error)
  }
}
