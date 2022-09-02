import PostForm from '../../view/PostForm/PostForm';
import { useDispatch } from 'react-redux';
import { addPost } from '../../../redux/postsRedux.js';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = (post) => {
    post.editDate = new Date();
    post.authorId = '1';
    dispatch(addPost(post));
    navigate('/');
  };

  return <PostForm action={handleSubmit} actionText="Add post" />;
};

export default AddPostForm;
