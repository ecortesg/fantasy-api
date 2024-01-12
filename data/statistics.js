import axios from "axios";
import Statistic from "../models/Statistic.js";

// Fetch and store statistics data
async function fetchAndStoreStatisticsData(year, week) {
  try {
    const url = week
      ? `https://api.sleeper.com/stats/nfl/${year}/${week}`
      : `https://api.sleeper.com/stats/nfl/${year}`;

    const response = await axios.get(url, {
      params: {
        season_type: "regular",
        position: ["DB", "DEF", "DL", "K", "LB", "QB", "RB", "TE", "WR"],
        order_by: "pts_half_ppr",
      },
    });

    const data = response.data;
    await Statistic.insertMany(data);

    if (week) {
      console.log(
        `Statistics data for ${year}, Week ${week} stored successfully.`
      );
    } else {
      console.log(
        `Statistics data for ${year}, entire season stored successfully.`
      );
    }
  } catch (error) {
    if (week) {
      console.error(
        `Error fetching or storing statistics data for ${year}, Week ${week}:`,
        error
      );
    } else {
      console.error(
        `Error fetching or storing statistics data for ${year}, entire season:`,
        error
      );
    }
  }
}

// Delete statistics data
export async function deleteStatisticsData(year, week) {
  try {
    await Statistic.deleteMany({ season: year.toString(), week: week });

    if (week) {
      console.log(
        `Statistics data for ${year}, Week ${week} deleted successfully.`
      );
    } else {
      console.log(
        `Statistics data for ${year}, entire season deleted successfully.`
      );
    }
  } catch (error) {
    if (week) {
      console.error(
        `Error deleting statistics data for ${year}, Week ${week}:`,
        error
      );
    } else {
      console.error(
        `Error deleting statistics data for ${year}, entire season:`,
        error
      );
    }
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
  const years = range(2023, 2023);
  const weeks = range(1, 18);

  // Fetch weekly data
  for (const year of years) {
    for (const week of weeks) {
      await fetchAndStoreStatisticsData(year, week);
    }

    // Fetch data for the entire season (week = null)
    await fetchAndStoreStatisticsData(year, null);
  }
}

// Function to delete data for multiple years and weeks
export async function deleteYearsAndWeeksStatisticsData() {
  const years = range(2023, 2023);
  const weeks = range(1, 18);

  // Delete weekly data
  for (const year of years) {
    for (const week of weeks) {
      await deleteStatisticsData(year, week);
    }

    // Delete data for the entire season (week = null)
    await deleteStatisticsData(year, null);
  }
}
