const express = require('express');
const breedRoutes = require("./src/dogs/routes");

const app = express();
const port = 2552;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/v1/breeds", breedRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));

//For Docker
const { Client } = require('pg');

const connectionString = 'postgres://postgres:3006@postgres:5432/breeds';

// Update the connection URL to use the service name instead of 'localhost'
const updatedConnectionString = connectionString.replace('postgres', 'localhost');

const client = new Client({
  connectionString: updatedConnectionString
});

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });
