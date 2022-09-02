import { Col, Row } from 'react-bootstrap';
import AddUserForm from '../../features/AddUserForm/AddUserForm';

const UserAdd = () => {
  return (
    <Row className="mb-2 justify-content-md-center">
      <Col xs={8} md={8} lg={8}>
        <h1>User/Admin Add</h1>
        <AddUserForm />
      </Col>
    </Row>
  );
};

export default UserAdd;
