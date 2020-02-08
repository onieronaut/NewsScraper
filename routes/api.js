const db = require("../models");

module.exports = app => {

    app.get("/articles/:id", (req,res) => {
        db.Article.findOne({ _id: req.params.id})
        .populate("note")
        .then(function(data){
            res.json(data);
            console.log(data)
        })
        .catch(function(err){
            res.json(err)
        })
    })

    app.post("/articles/:id", (req,res) => {
        db.Note.create(req.body)
        .then(function(newNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id}, {note: newNote._id}, {new: true});
        }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
    })

    app.post("/saved/:id", (req, res) => {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true }, () => {
            res.end();
        });
    });

    app.post("/unsaved/:id", (req, res) => {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false }, () => {
            res.end();
        });
    });

    app.delete("/clear", (req,res) => {
        db.Article.deleteMany({}, () => {
            res.end();
        })

        db.Note.deleteMany({}, () => {
            res.end();
        })
    })
};