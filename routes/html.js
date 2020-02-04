const db = require("../models");


module.exports = app => {

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
};