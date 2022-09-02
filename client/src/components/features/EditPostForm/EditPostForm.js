import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { editPost } from '../../../redux/postsRedux.js';
import PostForm from '../../view/PostForm/PostForm.js';
import { getSinglePostById } from '../../../redux/postsRedux.js';
import { useParams } from 'react-router';

const EditPostForm = (props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { id } = useParams();

  const post = useSelector((state) => getSinglePostById(state, id));

  const handleSubmit = (post) => {
    post.editDate = new Date();
    dispatch(editPost({ ...post, id }));
    navigate('/')
  };

  if (!post) return <Navigate to="/" />;
  else
    return (
      <PostForm
        action={handleSubmit}
        actionText="Save edit post"
        title={post.title}
        statusId={post.statusId}
        publishedDate={post.publishedDate}
        content={post.content}
        price={post.price}
        telephone={post.telephone}
      />
    );
};

export default EditPostForm;
