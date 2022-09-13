import { Row, Col, Spinner, ProgressBar, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPublishedPosts, loadPublishedPostsRequest, getRequest } from '../../../redux/postsRedux.js';
import PostCard from '../../view/PostCard/PostCard';
import dateToStr from '../../../utils/dateToStr.js';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getAllPublishedPosts);
  const request = useSelector(getRequest);
  // console.log('posts:', posts);

  useEffect(() => {
    dispatch(loadPublishedPostsRequest());
  }, [dispatch]);

  if (posts.length === 0) {
    return (
      <Spinner animation="grow" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (request.pending) return <ProgressBar animated now={70} className="mb-5" />;
  else if (request.error) return <Alert color="warning">{request.error}</Alert>;
  else if (!request.success || !posts.length) return <Alert color="info">No posts</Alert>;
  else if (request.success)
    return (
      <Row className="g-2">
        {posts.map((post) => (
          <Col key={post.id} xs={12} md={6} lg={4}>
            <PostCard
              id={post.id}
              title={post.title}
              authorId={post.authorId}
              price={post.price}
              content={post.content}
              publishedDate={dateToStr(post.publishedDate)}
            />
          </Col>
        ))}
      </Row>
    );
};

export default Posts;
