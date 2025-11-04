import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import { formatDateTime } from "./FormatDate";

export default function Assignments() {
  const { assignments } = useSelector((state: RootState) => state.assignmentReducer);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(id));
    }
  };

  return (
    <ListGroup>
      {assignments.map(a => (
        <ListGroupItem key={a.id} className="d-flex justify-content-between align-items-center">
          <div>
            <BsGripVertical className="me-2" /> <MdOutlineAssignment /> {a.title}
            <div>
              Due: {formatDateTime(a.dueDate)} | {a.points} pts
            </div>
          </div>
          <Button variant="danger" onClick={() => handleDelete(a.id)}>Delete</Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}