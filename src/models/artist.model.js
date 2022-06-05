const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  avgRating: {
    type: Number,
    required: true,
    default: 0,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "song",
    },
  ],
});

artistSchema.methods.avgRate = async function () {
  // calculate average rating
  let songs = await this.model("song").find({ artists: this._id });
  let sum = 0;
  songs.forEach((e) => {
    sum += e.rating;
  });
  this.avgRating = sum / songs.length;
  return this.save();
};

const Artist = mongoose.model("artist", artistSchema);

module.exports = Artist;
