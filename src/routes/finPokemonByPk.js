const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
    app.get("/api/pokemons/:id", auth, (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then((pokemon) => {
                if (pokemon === null) {
                    const message = "le pokemon demandé n'existe pas. Réessayez avec un autre identifiant.";
                    res.json({ message, data: pokemon });
                }
                const message = "Un pokémon a bien été trouvé.";
                res.json({ message, data: pokemon });
            })
            .catch((error) => {
                const message =
                    "La liste des pokemons n'a pas pu être récypérer. Réessayez dnas quelques instants.";
                res.status(500).json({ message, data: error });
            });
    });
};
