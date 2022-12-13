const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
require("dotenv/config");

const Port = process.env.PORT || 3000;
const url = process.env.URL || "";

// .image

const extrectRows = ($) =>
  $("tbody tr").map((_, row) => {
    const $row = $(row);
    const no = $row.find("th[scope=row] > a").text(),
      image = $row.find(".image > img").attr("src"),
      name = $row.find("td > b > a").text();

    if ((no && image, name))
      return {
        no,
        image,
        name,
      };
  });
  
async function scrap() {
  try {
    const rows = await axios.get(url).then(({ data }) => {
      const $ = cheerio.load(data);
      return [...extrectRows($)];
    });

    return rows;
  } catch (err) {
    console.error(err);
  }
}

app.get("/", async (req, res) => {
  const dataScraped = await scrap().then((data) => data);
  res.json(dataScraped);
});

app.listen(Port, () => console.log(`localhost:${Port} is runinng...`));
