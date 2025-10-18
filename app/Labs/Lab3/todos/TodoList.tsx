import todosJSON from "./todos.json";
import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";

type Todo = {
  title: string;
  status: string;
  done: boolean;
};

const todos = todosJSON as Todo[];

export default function TodoList() {
  return (
    <>
      <h3>Todo List</h3>
      <ListGroup>
        {todos.map((todo) => (
          <TodoItem key={todo.title} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </>
  );
}