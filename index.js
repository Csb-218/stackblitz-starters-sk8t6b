const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

const app = express();
const port = 3010;

app.use(cors());

// database connection
(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

app.get('/', (req, res) => {
  res.send('Gaming Community Platform');
});

// Exercise 1: Get All Games
// http://localhost:3000/games

app.get('/games', async (req, res) => {
  try {
    let query = 'SELECT * FROM games';
    let response = await db.all(query, []);

    if (response.length === 0) {
      res.status(404).json({
        message: ' No games found.',
      });
    } else {
      res.status(200).json({
        games: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Exercise 2: Get Game by ID
// http://localhost:3000/games/details/1

app.get('/games/details/:id', async (req, res) => {
  try {
    const { id } = req.params;

    let query = `SELECT * 
    FROM games
    WHERE id = ?
    `;

    let response = await db.all(query, [parseFloat(id)]);

    if (response.length === 0) {
      res.status(404).json({
        message: ` No game found for id = ${id}`,
      });
    } else {
      res.status(200).json({
        game: response[0],
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Exercise 3: Get Games by Genre
// http://localhost:3000/games/genre/FPS

app.get('/games/genre/:genre', async (req, res) => {
  try {
    const { genre } = req.params;

    let query = `SELECT * 
    FROM games
    WHERE genre = ?
    `;

    let response = await db.all(query, [genre]);

    if (response.length === 0) {
      res.status(404).json({
        message: ` No game found for genre = ${genre}`,
      });
    } else {
      res.status(200).json({
        games: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Exercise 4: Get Games by Platform
// http://localhost:3000/games/platform/PC

app.get('/games/platform/:platform', async (req, res) => {
  try {
    const { platform } = req.params;

    let query = `SELECT * 
    FROM games
    WHERE platform = ?
    `;

    let response = await db.all(query, [platform]);

    if (response.length === 0) {
      res.status(404).json({
        message: ` No game found for platform = ${platform}`,
      });
    } else {
      res.status(200).json({
        games: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Exercise 5: Get Games Sorted by Rating
// http://localhost:3000/games/sort-by-rating

app.get('/games/sort-by-rating', async (req, res) => {
  try {
    let query = `SELECT * 
    FROM games
    ORDER BY rating DESC
    `;

    let response = await db.all(query, []);

    if (response.length === 0) {
      res.status(404).json({
        message: ` No game found `,
      });
    } else {
      res.status(200).json({
        games: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Exercise 6: Get All Players
// http://localhost:3000/players

app.get('/players', async (req, res) => {
  try {
    let query = `SELECT * FROM players`;

    let response = await db.all(query, []);

    if (response.length === 0) {
      res.status(404).json({
        message: ` No player found `,
      });
    } else {
      res.status(200).json({
        players: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Exercise 6: Get All Players
// http://localhost:3000/players

app.get('/players', async (req, res) => {
  try {
    let query = `SELECT * FROM players`;

    let response = await db.all(query, []);

    if (response.length === 0) {
      res.status(404).json({
        message: ` No player found `,
      });
    } else {
      res.status(200).json({
        players: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Exercise 7: Get Player by ID
// http://localhost:3000/players/details/1

app.get('/players/details/:id', async (req, res) => {
  try {
    const { id } = req.params;

    let query = `SELECT * FROM players WHERE id = ?`;

    let response = await db.all(query, [parseFloat(id)]);

    if (response.length === 0) {
      res.status(404).json({
        message: ` No player found `,
      });
    } else {
      res.status(200).json({
        player: response[0],
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Exercise 8: Get Players by Platform
// http://localhost:3000/players/platform/PC

app.get('/players/platform/:platform', async (req, res) => {
  try {
    const { platform } = req.params;

    let query = `SELECT * FROM players WHERE platform = ?`;

    let response = await db.all(query, [platform]);

    if (response.length === 0) {
      res.status(404).json({
        message: ` No player found `,
      });
    } else {
      res.status(200).json({
        players: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Exercise 9: Get Players Sorted by Rating
// http://localhost:3000/players/sort-by-rating

app.get('/players/sort-by-rating', async (req, res) => {
  try {
    let query = `SELECT * 
    FROM players
    ORDER BY rating DESC
    `;

    let response = await db.all(query, []);

    if (response.length === 0) {
      res.status(404).json({
        message: ` No player found `,
      });
    } else {
      res.status(200).json({
        players: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Exercise 10: Get All Tournaments
// http://localhost:3000/tournaments

app.get('/tournaments', async (req, res) => {
  try {
    let query = `SELECT * FROM tournaments`;

    let response = await db.all(query, []);

    if (response.length === 0) {
      res.status(404).json({
        message: ` No tournament found `,
      });
    } else {
      res.status(200).json({
        tournaments: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Exercise 11: Get Tournament by ID
// http://localhost:3000/tournaments/details/1

app.get('/tournaments/details/:id', async (req, res) => {
  try {
    const { id } = req.params;

    let query = `SELECT * FROM tournaments WHERE id = ?`;

    let response = await db.all(query, [parseFloat(id)]);

    if (response.length === 0) {
      res.status(404).json({
        message: ` No tournaments found `,
      });
    } else {
      res.status(200).json({
        tournament: response[0],
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Exercise 12: Get Tournaments by Game ID
// http://localhost:3000/tournaments/game/1

app.get('/tournaments/game/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;

    let query = `SELECT * FROM tournaments WHERE gameId = ?`;

    let response = await db.all(query, [parseFloat(gameId)]);

    if (response.length === 0) {
      res.status(404).json({
        message: ` No tournament found `,
      });
    } else {
      res.status(200).json({
        tournament: response[0],
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Exercise 13: Get Tournaments Sorted by Prize Pool
// http://localhost:3000/tournaments/sort-by-prize-pool

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    let query = `SELECT * FROM tournaments ORDER BY prizePool DESC`;

    let response = await db.all(query, []);

    if (response.length === 0) {
      res.status(404).json({
        message: ` No tournament found `,
      });
    } else {
      res.status(200).json({
        tournament: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
