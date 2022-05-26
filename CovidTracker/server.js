const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

app.use(routes);

const PORT = process.env.PORT || 5000;

connectDB.then(() => app.listen(PORT, () => console.log(`Server started on port ${PORT}`)));
