import { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';

interface TodoListProps {
  data: string;
  id: string;
}
const TodoForm = () => {
  const [text, setText] = useState('');
  const [todoList, setTodoList] = useState<TodoListProps[]>();

  const onInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setText(e.target.value);
  };

  const onHandleForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios.post(`http://localhost:3500/todos`, {
      todo: text
    });
    setText('');
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3500/todos`)
      .then((res) => {
        setTodoList(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  return (
    <div>
      <form className="form" onSubmit={onHandleForm}>
        <input
          placeholder="Enter new todo..."
          className="input"
          onChange={onInputChange}
          value={text}
        />
      </form>
      {todoList?.map((item) => {
        return <div key={item?.id}>{item?.data}</div>;
      })}
    </div>
  );
};

export default TodoForm;
