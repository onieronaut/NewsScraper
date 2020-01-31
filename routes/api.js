const db = require("../models");

module.exports = app => {
    app.get("/articles", (req, res) => {
        db.Article.find({})
        .then(function(articles) {
            res.json(articles);
        })
        
    });
};