import { Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import ErrorTextValidate from '../../common/ErrorTextValidate/ErrorTextValidate.js';
import { useSelector, useDispatch } from 'react-redux';
import { getStatuses, loadStatusesRequest, getRequest } from '../../../redux/statusesRedux.js';

const PostForm = ({ action, actionText, ...props }) => {

  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [price, setPrice] = useState(props.price || '');
  const [telephone, setTelephone] = useState(props.telephone || '');
  const newDate = new Date();
  const [publishedDate, setPublishedDate] = useState(props.publishedDate || newDate);
  const [statusId, setStatusId] = useState(props.statusId || '');
  const [contentError, setContentError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const emailUser = 'mgucwa@gmail.com';

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const statuses = useSelector(getStatuses);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadStatusesRequest());
  }, [dispatch]);

  const errorsMessages = {
    thisFieldRequired: 'This field is required',
    minLength10: 'Minimum 10 characters',
    minLength20: 'Minimum 20 characters',
  };

  const handleSubmit = () => {
    setContentError(!content);
    setDateError(!publishedDate);
    if (content && publishedDate) {
      action({
        title,
        content,
        publishedDate,
        emailUser,
        statusId,
        price,
        telephone,
      });
    }
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  return (
    <Form onSubmit={validate(handleSubmit)}>
      <Row>
        <Col md={1}>
          <Form.Label className="pt-2 align-baseline">Published</Form.Label>
        </Col>
        <Col sm={11}>
          <DatePicker
            placeholder="Published"
            // selected={publishedDate}
            value={publishedDate}
            onChange={setPublishedDate}
            className="mb-2 form-control"
            dateFormat="dd/MM/yyyy"
          />
          {dateError && <ErrorTextValidate text={errorsMessages.thisFieldRequired} />}
        </Col>
      </Row>

      <Form.Select
        {...register('statusId', {
          required: true,
        })}
        aria-label="Select status..."
        name="statusId"
        value={statusId}
        onChange={(e) => setStatusId(e.target.value)}
      >
        <option value="">Select status...</option>
        {statuses.map((status) => (
          <option key={'' + status._id + ''} value={'' + status._id + ''}>
            {status.name}
          </option>
        ))}
      </Form.Select>

      {errors.statusId && <ErrorTextValidate text={errorsMessages.thisFieldRequired} />}

      <FloatingLabel controlId="titleInput" label="Title" className="mb-2">
        <Form.Control
          {...register('title', {
            required: true,
            minLength: 10,
          })}
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2"
        />
        {errors.title && errors.title.type === 'required' && (
          <ErrorTextValidate text={errorsMessages.thisFieldRequired} />
        )}
        {errors.title && errors.title.type === 'minLength' && (
          <ErrorTextValidate text={errorsMessages.minLength10} />
        )}
      </FloatingLabel>

      <FloatingLabel controlId="priceInput" label="Price" className="mb-2">
        <Form.Control
          {...register('price', {
            required: true,
          })}
          type="text"
          placeholder="Price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && errors.price.type === 'required' && (
          <ErrorTextValidate text={errorsMessages.thisFieldRequired} />
        )}
      </FloatingLabel>

      <ReactQuill
        name="mainContentInput"
        modules={modules}
        className="mb-2"
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder=""
      />
      {contentError && <ErrorTextValidate text={errorsMessages.thisFieldRequired} />}

      <FloatingLabel controlId="telephoneInput" label="Telephone" className="mb-2">
        <Form.Control
          {...register('telephone', {
            required: true,
          })}
          type="text"
          placeholder="Telephone"
          name="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        {errors.telephone && errors.telephone.type === 'required' && (
          <ErrorTextValidate text={errorsMessages.thisFieldRequired} />
        )}
      </FloatingLabel>

      <Row className="mt-2">
        <Col className="text-end">
          <Button variant="primary" type="submit">
            {actionText}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PostForm;
