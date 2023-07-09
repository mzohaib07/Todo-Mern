import { SetStateAction } from 'react';
import { IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { TodoListType } from '../todoForm';
import { ItemWrapperStyled } from './todo-list.styles';

interface TodoListPropsType {
  item: TodoListType;
  isEdit: boolean;
  updateText: string;
  onHanldeIsEdit: () => void;
  onHandleDelete: (id: string) => void;
  onUpdateFormChange: (e: { target: { value: SetStateAction<string> } }) => void;
  onHandleUpdateForm: (event: { preventDefault: () => void }, id: string) => void;
}

const TodoList = ({
  item,
  isEdit,
  updateText,
  onHanldeIsEdit,
  onHandleDelete,
  onUpdateFormChange,
  onHandleUpdateForm
}: TodoListPropsType) => {
  return (
    <ItemWrapperStyled className="item" key={item?._id}>
      {isEdit ? (
        <form className="form" onSubmit={(e) => onHandleUpdateForm(e, item?._id)}>
          <TextField
            className="input"
            onChange={onUpdateFormChange}
            placeholder="Enter new todo..."
            id="standard-basic"
            label="Todo"
            variant="standard"
            defaultValue={item?.data || updateText}
          />
        </form>
      ) : (
        <span style={{ display: isEdit ? 'none' : '' }}>{item?.data}</span>
      )}
      <IconButton onClick={onHanldeIsEdit}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onHandleDelete(item?._id)}>
        <DeleteIcon />
      </IconButton>
    </ItemWrapperStyled>
  );
};

export default TodoList;
