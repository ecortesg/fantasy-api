import axios from "axios";
import Projection from "../models/Projection.js";

// Fetch and store new data, and delete old data
async function updateProjectionsData(year, week) {
  try {
    const url = week
      ? `https://api.sleeper.com/projections/nfl/${year}/${week}`
      : `https://api.sleeper.com/projections/nfl/${year}`;

    const response = await axios.get(url, {
      params: {
        season_type: "regular",
        position: ["DEF", "K", "QB", "RB", "TE", "WR"],
        order_by: "pts_half_ppr",
      },
    });

    const data = response.data;

    // If data is returned, insert while deleting old data
    if (data.length > 0) {
      await Projection.deleteMany({});
      await Projection.insertMany(data);
    }

    if (week) {
      console.log(
        `Projections data for ${year}, Week ${week} stored successfully.`
      );
    } else {
      console.log(
        `Projections data for ${year}, entire season stored successfully.`
      );
    }
  } catch (error) {
    if (week) {
      console.error(
        `Error fetching or storing projections data for ${year}, Week ${week}:`,
        error
      );
    } else {
      console.error(
        `Error fetching or storing projections data for ${year}, entire season:`,
        error
      );
    }
  }
}

// Function to fetch data for multiple years and weeks
export async function fetchYearsAndWeeksProjectionsData() {
  const years = [2023]; // Add more years if needed
  const weeks = [...Array(1).keys()].map((week) => week + 1);

  for (const year of years) {
    // for (const week of weeks) {
    //   await fetchAndStoreProjectionsData(year, week);
    // }

    // Fetch data for the entire season (week = null)
    await updateProjectionsData(year, null);
  }
}
