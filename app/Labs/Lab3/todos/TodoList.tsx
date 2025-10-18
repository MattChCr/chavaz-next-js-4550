import ListGroup from "react-bootstrap/esm/ListGroup";
import TodoItem from "./TodoItem";
import todosJSON from "./todos.json";

// Define the type
type Todo = {
  title: string;
  status: string;
  done: boolean;
};

// Cast the JSON import
const todos = todosJSON as Todo[];

export default function TodoList() {
 return(
   <>
     <h3>Todo List</h3>
     <ListGroup>
       { todos.map(todo => {
           return(<TodoItem todo={todo}/>);   })}
     </ListGroup><hr/>
   </>
);}

