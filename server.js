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

