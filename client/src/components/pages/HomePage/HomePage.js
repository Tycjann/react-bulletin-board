import { Row, Col } from 'react-bootstrap';
import Posts from '../../features/Posts/Posts';

const HomePage = () => {
  return (
    <>
      <Row className="mt-4">
        <Col>
          <h2>All post</h2>
        </Col>
      </Row>
      <Posts />
    </>
  );
};

export default HomePage;
