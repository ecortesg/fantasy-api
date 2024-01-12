import axios from "axios";
import Statistic from "../models/Statistic.js";

// Fetch and store statistics data
async function fetchAndStoreStatisticsData(year, week, season_type) {
  try {
    const url = week
      ? `https://api.sleeper.com/stats/nfl/${year}/${week}`
      : `https://api.sleeper.com/stats/nfl/${year}`;

    const response = await axios.get(url, {
      params: {
        season_type: season_type, // regular or post
        position: ["DB", "DEF", "DL", "K", "LB", "QB", "RB", "TE", "WR"],
        order_by: "pts_half_ppr",
      },
    });

    const data = response.data;
    await Statistic.insertMany(data);

    console.log(
      `Statistics data for ${
        week ? "week " + week + " of the" : "the"
      } ${year} ${season_type} season stored successfully.`
    );
  } catch (error) {
    console.log(
      `Error storing statistics data for ${
        week ? "week " + week + " of the" : "the"
      } ${year} ${season_type} season:`,
      error
    );
  }
}

// Delete statistics data
export async function deleteStatisticsData(year, week, season_type) {
  try {
    await Statistic.deleteMany({
      season: year.toString(),
      week: week,
      season_type: season_type,
    });

    console.log(
      `Statistics data for ${
        week ? "week " + week + " of the" : "the"
      } ${year} ${season_type} season deleted successfully.`
    );
  } catch (error) {
    console.log(
      `Error deleting statistics data for ${
        week ? "week " + week + " of the" : "the"
      } ${year} ${season_type} season:`,
      error
    );
  }
}

// Function to generate an array containing the numbers within a range
function range(start, end) {
  const arr = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );
  return arr;
}

// Function to fetch data for multiple years and weeks
export async function fetchYearsAndWeeksStatisticsData() {
  const years = range(2015, 2022);
  const weeks = range(1, 4);

  // Fetch weekly data
  for (const year of years) {
    for (const week of weeks) {
      await fetchAndStoreStatisticsData(year, week, "post");
    }

    // Fetch data for the entire season (week = null)
    await fetchAndStoreStatisticsData(year, null, "post");
  }
}

// Function to delete data for multiple years and weeks
export async function deleteYearsAndWeeksStatisticsData() {
  const years = range(2023, 2023);
  const weeks = range(1, 18);

  // Delete weekly data
  for (const year of years) {
    for (const week of weeks) {
      await deleteStatisticsData(year, week, "regular");
    }

    // Delete data for the entire season (week = null)
    await deleteStatisticsData(year, null, "regular");
  }
}
