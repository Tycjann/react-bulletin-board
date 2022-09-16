import { Alert } from 'react-bootstrap';

const AlertComponent = (props) => {
  return <Alert color={props.color}>{props.text}</Alert>;
};

export default AlertComponent;
