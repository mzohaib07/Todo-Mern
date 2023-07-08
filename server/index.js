import Routes from "./routes/routes.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import Connection from "./database/db.js";

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/", Routes);

const PORT = process.env.PORT || 3500;

Connection();
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
