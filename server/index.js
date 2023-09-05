const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const { InitiateMongoServer } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const teamsRoutes = require("./routes/teamRoutes");
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require("./routes/adminRoutes");


require("dotenv").config();
InitiateMongoServer();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/", function (req, res) {
  res.send("Welcome to Revels backend");
});

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admins", adminRoutes);
