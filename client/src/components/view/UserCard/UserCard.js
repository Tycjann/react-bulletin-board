import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const UserCard = ({ id, admin, master, email, name, addDate, handleShow }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mt-1 mt-2">
          Email: <span className="fw-normal">{email}</span>
        </Card.Subtitle>
        <Card.Subtitle className="mt-2">
          Type: <span className="fw-normal">{admin === '0' ? 'User' : 'Admin'}</span>
        </Card.Subtitle>
        <Card.Subtitle className="mt-1 mt-2 mb-2">
          Add: <span className="fw-normal">{addDate}</span>
        </Card.Subtitle>
        {master === '0' ? (
          // <Button variant="danger" onClick={handleShow}>
          <Button variant="danger" onClick={() => handleShow(id)}>
            Delete
          </Button>
        ) : (
          <Button variant="secondary" disabled>
            Master admin (no delete)
          </Button>
        )}
        <Button as={NavLink} to={'/admin/edit/' + id} variant="primary" className="ms-2">
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
