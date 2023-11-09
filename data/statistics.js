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

// Function to generate an array of years
function generateYearsArray(startYear, endYear) {
  const yearsArray = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );
  return yearsArray;
}

// Function to fetch data for multiple years and weeks
export async function fetchYearsAndWeeksStatisticsData() {
  const years = generateYearsArray(2023, 2023);
  const weeks = [...Array(8).keys()].map((week) => week + 1);

  for (const year of years) {
    for (const week of weeks) {
      await fetchAndStoreStatisticsData(year, week);
    }
    await fetchAndStoreStatisticsData(year, 9);

    // Fetch data for the entire season (week = null)
    await fetchAndStoreStatisticsData(year, null);
  }
}

// Delete statistics data
export async function deleteStatisticsData(year, week) {
  try {
    await Statistic.deleteMany({ season: year, week: week });

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
