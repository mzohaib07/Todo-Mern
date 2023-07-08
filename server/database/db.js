import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = () => {
  const DB_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ontv3b1.mongodb.net/?retryWrites=true&w=majority`;

  mongoose.connect(DB_URL);
  mongoose.connection.on("connected", () => {
    console.log("Connection Successfully");
  });

  mongoose.connection.on("diconnected", () => {
    console.log("Database not connected");
  });

  mongoose.connection.on("error", () => {
    console.log("Error while connecting with the Database");
  });
};

export default Connection;
