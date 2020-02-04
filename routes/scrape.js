const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");



module.exports = function (app) {

    app.get("/scrape", function (req, res) {
        axios.get("https://www.reuters.com/news/technology").then(function (response) {
            const $ = cheerio.load(response.data);

            $("div[class='story-content']").each(function (i, element) {
                let result = {};

                let title = $(this)
                    .children("a")
                    .children("h3")
                    .text();

                result.title = title.replace(/\n\t\t\t\t\t\t\t\t/, "");

                let linkFragment = $(this)
                    .children("a")
                    .attr("href");

                result.link = `https://www.reuters.com${linkFragment}`

                result.description = $(this)
                    .children("p")
                    .text();

                db.Article.create(result)
                    .then(function (newArticle) {
                        console.log(newArticle);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });
            res.send("Scrape Complete");
        });
    });
};

