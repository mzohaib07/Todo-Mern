import Todo from "../models/todo.js";

export const addTodo = async (req, res) => {
  try {
    const { todo } = req.body;
    const formData = new Todo({
      data: todo,
      createdAt: Date.now(),
    });
    await formData.save();
    return res.status(200).json(formData);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

export const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    return res.status(200).json(todos);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};
