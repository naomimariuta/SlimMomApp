require("dotenv").config();
const express = require("express");
const connectMongoDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const diaryRoutes = require("./routes/diaryRoutes");

const app = express();

connectMongoDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Documentație API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rute API
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/diary", diaryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
