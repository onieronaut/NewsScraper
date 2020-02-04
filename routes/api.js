const db = require("../models");

module.exports = app => {

    app.post("/saved/:id", (req, res) => {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true }, () => {
            res.end();
        })
    })
};