import { Router } from "express"
import Projections from "../models/Projection.js"

const router = Router()

router.get("/:sport/:season", async (req, res) => {
  try {
    const projections = await Projections.aggregate([
      {
        $match: {
          sport: req.params.sport,
          season: req.params.season,
          stats: { $exists: true, $ne: {} },
        },
      },
      {
        $project: {
          _id: false,
          id: "$player_id",
          first_name: "$player.first_name",
          last_name: "$player.last_name",
          stats: true,
          position: { $last: "$player.fantasy_positions" }, // Last element in positions array
        },
      },
    ])
    res.json(projections)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
