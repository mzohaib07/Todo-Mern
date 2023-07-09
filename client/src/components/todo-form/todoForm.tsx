/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './todo-list/todo-list';
import { TextField } from '@mui/material';

import { TodoFormStyled } from './todo-form.styles';

export interface TodoListType {
  data: string;
  _id: string;
  createdAt: string;
}

const TodoForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [todoAdded, setTodoAdded] = useState(false);
  const [text, setText] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [todoList, setTodoList] = useState<TodoListType[]>();

  const onInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setText(e.target.value);
  };

  const onHandleForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios.post(`http://localhost:3500/todos`, {
      todo: text
    });
    setText('');
    setTodoAdded(true);
  };

  const onUpdateFormChange = (e: { target: { value: SetStateAction<string> } }) => {
    setUpdateText(e.target.value);
  };

  const onHandleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3500/todos/${id}`);
      if (response) {
        setTodoList((prev) => prev?.filter((item) => item?._id !== id));
      }
    } catch (err: any) {
      return err?.message;
    }
  };

  const onHandleUpdateForm = async (e: { preventDefault: () => void }, id: string) => {
    try {
      e.preventDefault();
      const response = await axios.put(`http://localhost:3500/todos/${id}`, {
        todo: updateText
      });
      if (response) {
        console.log({ response });

        setTodoList(
          (prev) =>
            prev?.map((item) => {
              if (item._id === id) {
                return { ...item, item: updateText };
              }
              return item;
            })
        );
      }
    } catch (err: any) {
      return err?.message;
    } finally {
      setIsEdit(false);
    }
  };

  const getAllTodos = () => {
    axios
      .get(`http://localhost:3500/todos`)
      .then((res) => {
        setTodoList(res.data);
        setTodoAdded(false);
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    getAllTodos();
  }, [todoAdded, isEdit]);

  return (
    <TodoFormStyled>
      <form className="form" onSubmit={onHandleForm}>
        <TextField
          className="input"
          onChange={onInputChange}
          value={text}
          placeholder="Enter new todo..."
          id="standard-basic"
          label="Todo"
          variant="standard"
        />
      </form>
      {todoList && todoList?.length >= 1 ? (
        todoList?.map((item) => {
          return (
            <TodoList
              key={item?._id}
              item={item}
              isEdit={isEdit}
              updateText={updateText}
              onHanldeIsEdit={() => setIsEdit((prev) => !prev)}
              onUpdateFormChange={onUpdateFormChange}
              onHandleDelete={onHandleDelete}
              onHandleUpdateForm={onHandleUpdateForm}
            />
          );
        })
      ) : (
        <span>There is no todo.....</span>
      )}
    </TodoFormStyled>
  );
};

export default TodoForm;
