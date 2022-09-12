import { Row, Col, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, removeUser, getUserById } from '../../../redux/usersRedux';
import UserCard from '../../view/UserCard/UserCard';
import dateToStr from '../../../utils/dateToStr.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Users = () => {

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  
  const userById = useSelector((state) => getUserById(state, idDelete));
  

  const handleDelete = () => {
    setShow(false);
    // security: no delete master admin
    userById.master === '0' ? dispatch(removeUser(idDelete)) : navigate('/admin/warning');
    // console.log('delete user', userById.name);
  };

  const handleShow = (id) => {
    setShow(true);
    setIdDelete(id);
  };

  const handleClose = () => {
    setShow(false);
    setIdDelete(null);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete this user: {userById ? userById.name : false} ?</Modal.Body>
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
