import { Col, Row, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Users from '../../features/Users/Users';

const AdminHome = () => {

  return (
    <>
      <Row className="mb-2">
        <Col md={8}>
          <h1>Admin Panel</h1>
        </Col>
        <Col md={4} className="text-end">
          <Button as={NavLink} to={'/admin/add'} variant="success" className="ms-2">
            Add user/admin
          </Button>
        </Col>
      </Row>
      <Users />
    </>
  );
};

export default AdminHome;
