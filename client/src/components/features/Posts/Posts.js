import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getOnlyPublishedPost } from '../../../redux/postsRedux.js';
import PostCard from '../../view/PostCard/PostCard';
import dateToStr from '../../../utils/dateToStr.js';

const Posts = () => {
  const posts = useSelector(getOnlyPublishedPost);

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