import { Col, Row, Button, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, removePostRequest, loadPostsRequest, getRequest } from '../../../redux/postsRedux.js';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { removePost } from '../../../redux/postsRedux.js';
import AlertComponent from '../../common/AlertComponent/AlertComponent';
import SpinnerComponent from '../../common/SpinnerComponent/SpinnerComponent';

import dateToStr from '../../../utils/dateToStr.js';
import authorName from '../../../utils/authorName.js';

const PostDetails = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const post = useSelector((state) => getPostById(state, id));
  const request = useSelector(getRequest);

  // useEffect(() => {
  //   dispatch(loadPostsRequest());
  // }, [dispatch]);
  
  const handleDelete = () => {
    setShow(false);
    dispatch(removePostRequest(id));
    console.log('id:', id);
    navigate('/');
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  if (request.pending) return <SpinnerComponent />;
  else if (request.error) return <AlertComponent text={request.error} color={'warning'} />;
  else if (!request.success || !post) return <AlertComponent text={'No post'} color={'info'} />;
  else if (request.success)
    return (
      <>
        <Row className="mb-2 justify-content-md-center">
          <Col xs={8} md={8} lg={8}>
            <h1 className="display-6">{post.title}</h1>
          </Col>
          <Col xs={8} md={8} lg={8} className="text-end">
            <Button as={NavLink} to={'/post/edit/' + id} variant="outline-info">
              Edit
            </Button>
            <Button variant="outline-danger" className="ms-2" onClick={handleShow}>
              Delete
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>Delete this post: {post.title}?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={8} md={8} lg={8}>
            <p className="mb-0">
              <span className="fw-bold">Author:</span> {authorName(post.authorId.name)}
            </p>
            <p className="mb-0">
              <span className="fw-bold">Published:</span> {dateToStr(post.publishedDate)}
            </p>
            <p className="mb-0">
              <span className="fw-bold">Edit:</span> {dateToStr(post.editDate)}
            </p>
            <p className="mb-0">
              <span className="fw-bold">Price:</span> ${post.price}
            </p>
            <p>
              <span className="fw-bold">Telephone:</span> {post.telephone}
            </p>
            <p dangerouslySetInnerHTML={{ __html: post.content }} />
            <hr />
          </Col>
        </Row>
      </>
    );
};;

export default PostDetails;
