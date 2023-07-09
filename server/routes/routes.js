import express from "express";
import {
  addTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from "../controller/todo.contoller.js";

const route = express.Router();

route.post("/todos", addTodo);
route.get("/todos", getAllTodo);
route.put("/todos/:id", updateTodo);
route.delete("/todos/:id", deleteTodo);

export default route;
