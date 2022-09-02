import { Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorTextValidate from '../../common/ErrorTextValidate/ErrorTextValidate.js';
import { NavLink } from 'react-router-dom';

const UserForm = ({ action, actionText, ...props }) => {
  const [admin, setAdmin] = useState(props.admin || '');
  const [email, setEmail] = useState(props.email || '');
  const [name, setName] = useState(props.name || '');
  const [master, setMaster] = useState(props.master || '');

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const errorsMessages = {
    thisFieldRequired: 'This field is required',
    minLength10: 'Minimum 10 characters',
    thisFieldNotEmail: 'This field not is email address',
  };

  const handleSubmit = () => {
      action({
        admin,
        email,
        name,
      });
  };

  

  return (
    <Form onSubmit={validate(handleSubmit)}>
      <Form.Select
        {...register('admin', {
          required: true,
          disabled: master === '1' ? true : false,
        })}
        aria-label="Select status..."
        name="admin"
        value={admin}
        onChange={(e) => setAdmin(e.target.value)}
      >
        <option value="">Select type...</option>
        <option key="0" value="0">
          User
        </option>
        <option key="1" value="1">
          Administrator
        </option>
      </Form.Select>

      {errors.admin && <ErrorTextValidate text={errorsMessages.thisFieldRequired} />}

      <FloatingLabel controlId="nameInput" label="Name" className="mb-2">
        <Form.Control
          {...register('name', {
            required: true,
            minLength: 10,
          })}
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2"
        />
        {errors.name && errors.name.type === 'required' && (
          <ErrorTextValidate text={errorsMessages.thisFieldRequired} />
        )}
        {errors.name && errors.name.type === 'minLength' && (
          <ErrorTextValidate text={errorsMessages.minLength10} />
        )}
      </FloatingLabel>

      <FloatingLabel controlId="emailInput" label="Email" className="mb-2">
        <Form.Control
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && errors.email.type === 'required' && (
          <ErrorTextValidate text={errorsMessages.thisFieldRequired} />
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <ErrorTextValidate text={errorsMessages.thisFieldNotEmail} />
        )}
      </FloatingLabel>

      <Row className="mt-2">
        <Col className="text-end">
          <Button as={NavLink} to={'/admin/'} variant="danger" className="me-2">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {actionText}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UserForm;
