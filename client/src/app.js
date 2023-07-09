import { Box } from '@mui/material';
import Header from './components/header';
import TodoForm from './components/todo-form/todoForm';

const App = () => {
  return (
    <Box>
      <Header />
      <TodoForm />
    </Box>
  );
};

export default App;
