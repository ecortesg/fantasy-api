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
        position: ["DEF", "K", "QB", "RB", "TE", "WR"],
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

// Function to fetch data for multiple years and weeks
export async function fetchYearsAndWeeksStatisticsData() {
  const years = [
    2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
    2021, 2022,
  ]; // Add more years if needed
  const weeks = [...Array(18).keys()].map((week) => week + 1);

  for (const year of years) {
    for (const week of weeks) {
      await fetchAndStoreStatisticsData(year, week);
    }

    // Fetch data for the entire season (week = null)
    await fetchAndStoreStatisticsData(year, null);
  }
}
