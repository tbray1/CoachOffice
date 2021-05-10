const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.json({ msg: "Welcome to the Coach Office..." }));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/players", require("./routes/players"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
