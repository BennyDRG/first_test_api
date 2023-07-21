const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyparser = require("body-parser");
const sequelize = require("./src/db/sequelize");

//_____Insomina_____
const app = express();
const port = 3000;

app.use(favicon(__dirname + "/favicon.ico"))
    .use(morgan("dev"))
    .use(bodyparser.json());

sequelize.initDb();

// Ici, nous placerons nos futurs points de terminaison.
require("./src/routes/findAllPokemons")(app);
require("./src/routes/finPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);

//On aujoute la gestion des erreurs 4040
app.use(({ res }) => {
    const message = "impossible de trouver la ressource demandée ! Vous pouvez essayer un autre URL.";
    res.status(404).json({ message });
});

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`));
