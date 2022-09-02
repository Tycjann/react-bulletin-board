import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import PostDetails from '../../view/PostDetails/PostDetails';

const PostSingle = () => {
  const { id } = useParams();
  if (!id) return <Navigate to="/NotFound" />;
  return <PostDetails id={id} />;
};

export default PostSingle;
