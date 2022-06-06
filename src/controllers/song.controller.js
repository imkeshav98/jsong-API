const express = require("express");
const Song = require("../models/song.model");
const router = express.Router();
const Artist = require("../models/artist.model");
const User = require("../models/user.model");

router.post("/", async (req, res) => {
  try {
    let song = await Song.findOne({ name: req.body.name }); // check if song exists
    if (song) {
      return res.status(400).send({ message: "Song already exists" }); // if song exists, return error
    }
    song = await Song.create(req.body); // create song
    let artists = req.body.artists;
    artists.forEach((e) => {
      Artist.findByIdAndUpdate(e, { $push: { songs: song._id } }).exec(); // add song to artist
    });
    return res.status(200).send(song); // return song
  } catch (e) {
    return res.status(500).send({ message: e.message }); // return error
  }
});

router.get("/", async (req, res) => {
  try {
    const songs = await Song.find().populate("artists", "name"); // get all songs
    return res.status(200).send(songs); // return songs
  } catch (e) {
    return res.status(500).send({ message: e.message }); // return error
  }
});

router.post("/rating", async (req, res) => {
  try {
    let song = await Song.findById(req.body.songId); // find song by id
    let artist = song.artists; // find all artists of song
    let user = await User.findById(req.body.userId); // find user by id

    if (user.ratedSongs.includes(song._id)) {
      return res.status(400).send({ message: "User already rated this song" }); // if user already rated this song
    }

    user.ratedSongs.push(song._id); // add song id to user rated songs
    user.save();

    let rating = (
      (song.rating * song.ratingCount + req.body.rating) /
      (song.ratingCount + 1)
    ).toFixed(2); // calculate new song rating

    song.rating = rating;
    song.ratingCount++;
    song.save(); // save new song rating

    for (art of artist) {
      let artist = await Artist.findById(art);
      artist.avgRate(); // update artist average rating
    }

    return res.status(200).send(song); // return song
  } catch (e) {
    return res.status(500).send({ message: e.message }); // return error
  }
});

module.exports = router;
