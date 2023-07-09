import Routes from "./routes/routes.js";
import express from "express";
import cors from "cors";

import Connection from "./database/db.js";

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/", Routes);

const PORT = process.env.PORT || 3500;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}

Connection();
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
