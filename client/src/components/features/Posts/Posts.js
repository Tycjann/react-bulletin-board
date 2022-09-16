import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPosts, loadPostsRequest, getRequest } from '../../../redux/postsRedux.js';
import PostCard from '../../view/PostCard/PostCard';
import AlertComponent from '../../common/AlertComponent/AlertComponent';
import SpinnerComponent from '../../common/SpinnerComponent/SpinnerComponent';
import dateToStr from '../../../utils/dateToStr.js';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadPostsRequest());
  }, [dispatch]);

  if (request.pending) return <SpinnerComponent />;
  else if (request.error) return <AlertComponent text={request.error} color={'warning'} />;
  else if (!request.success || !posts.length) return <AlertComponent text={'No posts'} color={'info'} />;
  else if (request.success)
    return (
      <Row className="g-2">
        {posts.map((post) => (
          <Col key={post._id} xs={12} md={6} lg={4}>
            <PostCard
              id={post._id}
              title={post.title}
              author={post.authorId.name}
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
