const mongoose = require("mongoose");

const songsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dor: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  spotifyUrl: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
  ratingCount: {
    type: Number,
    required: false,
    default: 0,
  },
  artists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
  ],
});

const Song = mongoose.model("song", songsSchema);

module.exports = Song;
