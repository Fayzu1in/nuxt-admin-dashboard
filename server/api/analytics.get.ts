export default defineEventHandler(async () => {
  await new Promise(r => setTimeout(r, 800))

  return {
    partners: [
      {
        id: 1,
        partner: "Partner 1",
        fact_volume: 72,
        target_volume: 80,
        first_shows_count: 1240,
        first_shows_percent: 30,
        success_percent: 68,
        color: "#FF9F66",
      },
      {
        id: 2,
        partner: "Partner 2",
        fact_volume: 55,
        target_volume: 60,
        first_shows_count: 970,
        first_shows_percent: 23,
        success_percent: 59, 
        color: "#4D79A8",
      },
      {
        id: 3,
        partner: "Partner 3",
        fact_volume: 83,
        target_volume: 75,
        first_shows_count: 1580,
        first_shows_percent: 23,
        success_percent: 77,
        color: "#FFC470",
    },
    {
        id: 4,
        partner: "Partner 4",
        fact_volume: 48,
        target_volume: 65,
        first_shows_count: 350,
        first_shows_percent: 23,
        success_percent: 43,
        color: "#4DB68D",
    },
    ]
  }
})
