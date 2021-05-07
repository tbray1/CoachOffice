const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { validationResult, check } = require("express-validator/check");
const User = require("../models/User");
const Player = require("../models/Player");

//@route      Get api/players
//@desc       Get all players
//@access     Private
router.get("/", auth, async (req, res) => {
  try {
    const players = await Player.find({ user: req.user.id }).sort({ date: -1 });
    res.json(players);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route      Post api/players
//@desc       Add new players
//@access     Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("jersey", "Name is required").not().isEmpty(),
      check("year", "Name is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, jersey, height, weight, position, year } = req.body;
    try {
      const newPlayer = new Player({
        name,
        jersey,
        height,
        weight,
        position,
        year,
        user: req.user.id,
      });
      const player = await newPlayer.save();

      res.json(player);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route      PUT api/players/:id
//@desc       updateplayer
//@access     Private
router.put("/:id", auth, async (req, res) => {
  const { name, jersey, height, weight, position, year } = req.body;

  //Build player object
  const playerFields = {};
  if (name) playerFields.name = name;
  if (jersey) playerFields.jersey = jersey;
  if (height) playerFields.height = height;
  if (weight) playerFields.weight = weight;
  if (position) playerFields.position = position;
  if (year) playerFields.year = year;

  try {
    let player = await Player.findById(req.params.id);

    if (!player) return res.status(404).json({ msg: "Player not found" });

    //make sure user owns player
    if (player.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "Not allowed" });
    }
    player = await Player.findByIdAndUpdate(
      req.params.id,
      { $set: playerFields },
      { new: true }
    );
    res.json(player);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route      Delete api/players/:id
//@desc       Delete player
//@access     Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let player = await Player.findById(req.params.id);

    if (!player) return res.status(404).json({ msg: "Player not found" });

    //make sure user owns player
    if (player.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "Not allowed" });
    }
    await Player.findByIdAndDelete(req.params.id);

    res.json({ msg: "Player Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
