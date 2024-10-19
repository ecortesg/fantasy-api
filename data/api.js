import axios from "axios"

const sleeperUnofficialApi = axios.create({
  baseURL: "https://api.sleeper.com",
})

const sleeperApi = axios.create({
  baseURL: "https://api.sleeper.app/v1",
})

export async function getStatistics(year, week, seasonType) {
  const url = week ? `/stats/nfl/${year}/${week}` : `/stats/nfl/${year}`

  const response = await sleeperUnofficialApi.get(url, {
    params: {
      season_type: seasonType, // regular or post
      position: ["DB", "DEF", "DL", "K", "LB", "QB", "RB", "TE", "WR"],
      order_by: "pts_half_ppr",
    },
  })

  return response.data
}

export async function getProjections(year, week, seasonType) {
  const url = week
    ? `/projections/nfl/${year}/${week}`
    : `/projections/nfl/${year}`

  const response = await sleeperUnofficialApi.get(url, {
    params: {
      season_type: seasonType, // regular or post
      position: ["DB", "DEF", "DL", "K", "LB", "QB", "RB", "TE", "WR"],
      order_by: "pts_half_ppr",
    },
  })

  return response.data
}

export async function getPlayers() {
  const url = "/players/nfl"

  const response = await sleeperApi.get(url)

  // Transform the single object into an array of player objects
  const players = Object.entries(response.data).map(
    ([playerId, playerData]) => {
      return {
        sleeper_id: playerId,
        ...playerData,
      }
    }
  )

  return players
}
