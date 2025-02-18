require("dotenv").config();
const express = require("express");
const connectMongoDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("./middleware/passport");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const calorieRoutes = require("./routes/calorieRoutes");

const app = express();

const logger = app.get("env") === "development" ? "dev" : "short";

connectMongoDB();

app.use(express.static("public"));
app.use(morgan(logger));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Documentație API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rute API
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api", calorieRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
