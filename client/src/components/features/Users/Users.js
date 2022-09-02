import { Row, Col, Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../../redux/usersRedux.js';
import UserCard from '../../view/UserCard/UserCard';
import dateToStr from '../../../utils/dateToStr.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Users = () => {

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleDelete = () => {
    setShow(false);
    // security: no delete master admin
    // dispatch(removeUser(userId));
    navigate('/admin');
    console.log('delete user');
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const users = useSelector(getAllUsers);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete this post: ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="g-2">
        {users.map((user) => (
          <Col key={user.id} xs={12} md={6} lg={4}>
            <UserCard
              id={user.id}
              admin={user.admin}
              master={user.master}
              email={user.email}
              name={user.name}
              addDate={dateToStr(user.addDate)}
              handleDelete={handleDelete}
              handleShow={handleShow}
              handleClose={handleClose}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Users;
