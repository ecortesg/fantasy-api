import { Router } from "express";
import Statistics from "../models/Statistics.js";

const router = Router();

router.get("/:sport/:season/:week?", async (req, res) => {
  try {
    const statistics = await Statistics.aggregate([
      {
        $match: {
          sport: req.params.sport,
          season: req.params.season,
          week: req.params.week,
          "stats.gp": { $ne: null }, //Games played
        },
      },
      {
        $project: {
          _id: false,
          id: "$player_id",
          first_name: "$player.first_name",
          last_name: "$player.last_name",
          stats: true,
          position: { $last: "$player.fantasy_positions" }, //Last element in positions array
        },
      },
    ]);
    res.json(statistics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
