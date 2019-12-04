const express = require("express");
const cors = require("cors");
const app = express();

const { ENVIRONMENT, PORT } = process.env;
const IS_DEVELOPMENT = ENVIRONMENT === "development";

// middleware
app.use(express.json());
app.use(
  cors({
    origin: IS_DEVELOPMENT ? "http://localhost:3000" : "http://localhost:3000"
  })
);

const db = {
  players: [
    {
      id: 1,
      first_name: "Sid",
      last_name: "Begani",
      element_type: "Mid",
      team: "MU"
    }
  ]
};

app.get("/api/players", (request, response) => {
  response.json(db.players);
});

app.post("/api/players", (request, response) => {
  const favPlayer = request.body;
  favPlayer.id = db.players.length + 1;
  db.players.push(favPlayer);
  response.json(favPlayer);
});

app.get("/api/players/:id", (request, response) => {
  const id = Number(request.params.id);
  const favPlayer = db.players.find(favPlayer => {
    return favPlayer.id === id;
  });

  if (favPlayer) {
    response.json(favPlayer);
  } else {
    response.status(404).send();
  }
});

app.delete("/api/players/:id", (request, response) => {
  const id = Number(request.params.id);
  const favPlayer = db.players.find(favPlayer => {
    return favPlayer.id === id;
  });

  if (favPlayer) {
    db.players = db.players.filter(favPlayer => {
      return favPlayer.id !== id;
    });
    response.status(204).send();
  } else {
    response.status(404).send();
  }
});

app.put("/api/players/:id", (request, response) => {
  const id = Number(request.params.id);
  const favPlayer = db.players.find(favPlayer => {
    return favPlayer.id === id;
  });

  if (favPlayer) {
    Object.assign(favPlayer, request.body);
    response.json(favPlayer);
  } else {
    response.status(404).send();
  }
});

app.listen(PORT || 8000);
