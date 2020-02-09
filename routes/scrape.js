const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");



module.exports = function (app) {


    // Scrapes Reuters for new articles
    app.get("/scrape", function (req, res) {
        axios.get("https://www.reuters.com/news/technology").then(function (response) {
            const $ = cheerio.load(response.data);

            $("div[class='story-content']").each(function (i, element) {
                let result = {};

                let title = $(this)
                    .children("a")
                    .children("h3")
                    .text();

                // The result of the title scrape had a new line followed by multiple tabs so this RegEx will remove that
                result.title = title.replace(/\n\t\t\t\t\t\t\t\t/, "");

                let linkFragment = $(this)
                    .children("a")
                    .attr("href");

                result.link = `https://www.reuters.com${linkFragment}`

                result.description = $(this)
                    .children("p")
                    .text();

                // Submitting the new article object into our database
                db.Article.create(result)
                    .then(function (newArticle) {
                        
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });
            res.redirect("/");
        });
    });
};

