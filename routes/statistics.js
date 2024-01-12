import { Router } from "express";
import Statistics from "../models/Statistic.js";

const router = Router();

router.get("/:sport/:season/:season_type/:week?", async (req, res) => {
  try {
    const statistics = await Statistics.aggregate([
      {
        $match: {
          sport: req.params.sport,
          season: req.params.season,
          season_type: req.params.season_type,
          week:
            req.params.week === undefined ? null : parseInt(req.params.week),
          "stats.gp": { $ne: null }, // Games played
        },
      },
      {
        $project: {
          _id: false,
          id: "$player_id",
          first_name: "$player.first_name",
          last_name: "$player.last_name",
          team: "$team",
          stats: true,
          position: { $last: "$player.fantasy_positions" }, // Last element in positions array
        },
      },
    ]);
    res.json(statistics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
