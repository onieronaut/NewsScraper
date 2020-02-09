const db = require("../models");


module.exports = app => {

    // Index page. Populates articles from our database
    app.get("/", (req, res) => {

        db.Article.find({})
            .then(function (data) {

                let articleInfo = [];

                data.forEach(data => {

                    articleInfo.push({
                        id: data._id,
                        title: data.title,
                        link: data.link,
                        description: data.description,
                        saved: data.saved
                    })
                })

                res.render("index",
                    { articles: articleInfo })

            })

    });
    
    // Populates all articles, Handlebars deals with the conditional to only show saved articles
    app.get("/saved", (req, res) => {

        db.Article.find({})
            .then(function (data) {

                let articleInfo = [];

                data.forEach(data => {

                    articleInfo.push({
                        id: data._id,
                        title: data.title,
                        link: data.link,
                        description: data.description,
                        saved: data.saved
                    })
                })

                res.render("saved",
                    { articles: articleInfo })

            })

    });
};