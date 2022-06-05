const express = require("express");
const Artist = require("../models/artist.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find(); // get all artists
    return res.status(200).send(artists); // return artists
  } catch (e) {
    return res.status(500).send({ message: e.message }); // return error
  }
});

router.post("/", async (req, res) => {
  try {
    let artist = await Artist.findOne({ name: req.body.name }); // check if artist exists
    if (artist) {
      return res.status(400).send({ message: "Artist already exists" }); // if artist exists, return error
    }
    artist = await Artist.create(req.body); // create artist
    return res.status(200).send(artist); // return artist
  } catch (e) {
    return res.status(500).send({ message: e.message }); // return error
  }
});

router.get("/songs/:id", async (req, res) => {
  try {
    const songs = await Artist.findById(req.params.id).populate(
      // get all songs of artist
      "songs",
      "name"
    ); // populate songs with name
    return res.status(200).send({ songs: songs.songs }); // return songs
  } catch (e) {
    return res.status(500).send({ message: e.message }); // return error
  }
});

module.exports = router;
