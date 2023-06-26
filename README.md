# Fantasy API

REST API that serves statistics and projections data for Fantasy sports tools.

## Routes

### Projections

Structure: /projections/:sport/:season
Example: /projections/nfl/2023

```
[
  {
    stats: {...}, // Projected stats
    id: "1",
    first_name: "Patrick",
    last_name: "Mahomes",
    position: "QB",
  }
]
```

### Statistics

Structure: /statistics/:sport/:season/:week
Example: /statistics/nfl/2022/1

```
[
  {
    stats: {...}, // Historical stats
    id: "2",
    first_name: "Chris",
    last_name: "Olave",
    position: "WR",
  }
]
```

## Tech Stack

- Node.js
- Express
- Mongoose
- Cors
- Axios

## Database

- MongoDB

## Projects that use this API

- [Fantasy Score Gap](https://github.com/ecortesg/fantasy-score-gap)
- [Fantasy Player Gap](https://github.com/ecortesg/fantasy-player-gap)
