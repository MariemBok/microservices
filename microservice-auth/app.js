// app.js (Entry point)

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const morgan = require("morgan");

const eurekaHelper = require("./eureka-helper");

const app = express();
const port = process.env.PORT || 9086;

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// Connect to MongoDB (make sure MongoDB is running)
mongoose
  .connect(
    "mongodb+srv://mariembok:mariembok1998@cluster0.ucbvufk.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to DB"));

// Use authentication routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// eurekaHelper.registerWithEureka("microservice-auth", port);
