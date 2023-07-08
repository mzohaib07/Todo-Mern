import express from "express";
import { addTodo, getAllTodo } from "../controller/todo.contoller.js";

const route = express.Router();

route.post("/todos", addTodo);
route.get("/todos", getAllTodo);

export default route;
