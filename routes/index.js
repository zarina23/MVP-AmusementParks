//const fetch = require('node-fetch');
const axios = require("axios");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const db = require("../model/helper");
const { YELP_API_KEY } = process.env;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Express" });
});

//GET all the results from the API based on the location
router.get("/search/:location", async (req, res) => {
  const { location } = req.params;
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${YELP_API_KEY}`,
    },
  };
  axios(
    `https://api.yelp.com/v3/businesses/search?location=${location}&categories=amusementparks&sort_by=best_match`,
    config
  )
    //It shows all the results matching that location.

    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// INSERT the items in the DB (parks)
router.post("/wishlist", async function (req, res, next) {
  console.log("Post succeeded");
  const { id, name, rating, address, image_url, latitude, longitude } = req.body;
  console.log(req.body);
  try {
    await db(
      `INSERT INTO parks (google_id, name, rating, address, image_url, latitude, longitude) VALUES ("${id}", "${name}", "${rating}", "${address}", "${image_url}", "${latitude}", "${longitude}")`
    );
    res.send({ message: "Saved in your wishlist!" });
  } catch (err) {
    console.log("in catch");
    res.status(500).send(err);
  }
});

//GET the items from the wishlist

router.get("/wishlist", function (req, res, next) {
  db("SELECT * FROM parks;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// REMOVE item from the wishlist

router.delete("/wishlist/:id", async function (req, res, next) {
  const { id } = req.params;

  try {
    await db(`DELETE FROM parks WHERE id = "${id}"`);

    res.send({ message: "Park deleted!" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
