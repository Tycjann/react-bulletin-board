import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import EditUserForm from '../../features/EditUserForm/EditUserForm';

const UserEdit = () => {
  const { id } = useParams();
  if (!id) return <Navigate to="/NotFound" />;
  return (
    <Row className="mb-2 justify-content-md-center">
      <Col xs={8} md={8} lg={8}>
        <h1>User Edit</h1>
        <EditUserForm />
      </Col>
    </Row>
  );
};

export default UserEdit;
