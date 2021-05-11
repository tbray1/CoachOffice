const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
connectDB();

app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.json({ msg: "Welcome to the Coach Office..." }));
//Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/players", require("./routes/players"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
