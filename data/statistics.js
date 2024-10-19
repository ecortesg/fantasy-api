import Statistic from "../models/Statistic.js"
import { range } from "../lib/utils.js"

// Fetch and store statistics data
async function fetchAndStoreStatisticsData(year, week, seasonType) {
  try {
    const data = await getStatistics(year, week, seasonType)

    await Statistic.insertMany(data)

    console.log(
      `Statistics data for ${
        week ? "week " + week + " of the" : "the"
      } ${year} ${seasonType} season stored successfully.`
    )
  } catch (error) {
    console.log(
      `Error storing statistics data for ${
        week ? "week " + week + " of the" : "the"
      } ${year} ${seasonType} season:`,
      error
    )
  }
}

// Delete statistics data
export async function deleteStatisticsData(year, week, seasonType) {
  try {
    await Statistic.deleteMany({
      season: year.toString(),
      week: week,
      season_type: seasonType,
    })

    console.log(
      `Statistics data for ${
        week ? "week " + week + " of the" : "the"
      } ${year} ${seasonType} season deleted successfully.`
    )
  } catch (error) {
    console.log(
      `Error deleting statistics data for ${
        week ? "week " + week + " of the" : "the"
      } ${year} ${seasonType} season:`,
      error
    )
  }
}

// Function to fetch data for multiple years and weeks
export async function fetchYearsAndWeeksStatisticsData() {
  const years = range(2024, 2024)
  const weeks = range(2, 6)

  // Fetch weekly data
  for (const year of years) {
    for (const week of weeks) {
      await fetchAndStoreStatisticsData(year, week, "regular")
    }

    // Fetch data for the entire season (week = null)
    await fetchAndStoreStatisticsData(year, null, "regular")
  }
}

// Function to delete data for multiple years and weeks
export async function deleteYearsAndWeeksStatisticsData() {
  const years = range(2024, 2024)
  const weeks = range(1, 6)

  // Delete weekly data
  for (const year of years) {
    for (const week of weeks) {
      await deleteStatisticsData(year, week, "post")
    }

    // Delete data for the entire season (week = null)
    await deleteStatisticsData(year, null, "post")
  }
}
