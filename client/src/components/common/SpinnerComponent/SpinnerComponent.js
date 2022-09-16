import { Spinner } from 'react-bootstrap';

const SpinnerComponent = (props) => {
  return (
    <Spinner animation="grow" role="status" className="d-block mx-auto">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
};

export default SpinnerComponent;