import PostForm from '../../view/PostForm/PostForm';
import { useDispatch } from 'react-redux';
import { addPostRequest, loadPostsRequest } from '../../../redux/postsRedux.js';
import { useNavigate } from 'react-router-dom';
// import waitTimer from '../../../utils/waitTimer.js';


const AddPostForm = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = (post) => {
    console.log('post:', post);
    post.editDate = new Date();
    post.authorId = '6315dc331f4146b38b56c9ce';
    
    dispatch(addPostRequest(post))
      .then(dispatch(loadPostsRequest()))
      // .then(waitTimer(5000))
      .then(navigate('/'));
  };

  return <PostForm action={handleSubmit} actionText="Add post" />;
};

export default AddPostForm;
