import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editPostRequest } from '../../../redux/postsRedux.js';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import PostForm from '../../view/PostForm/PostForm';
import AlertComponent from '../../common/AlertComponent/AlertComponent';
import SpinnerComponent from '../../common/SpinnerComponent/SpinnerComponent';
import { getPostById, loadPostsRequest, getRequest } from '../../../redux/postsRedux';
import dateToStr from '../../../utils/dateToStr';

const EditPostForm = (props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { id } = useParams();

  let post = useSelector((state) => getPostById(state, id));
  const request = useSelector(getRequest);
  // console.log('request:', request);

  useEffect(() => {
    dispatch(loadPostsRequest());
  }, [dispatch]);

  const handleSubmit = (post) => {
    post.editDate = new Date();
    dispatch(editPostRequest(post, id));
    navigate('/');
  };

  // console.log('post2:', post);

  // if (!post.length) return <Navigate to="/" />;
  if (request.pending) return <SpinnerComponent />;
  else if (request.error) return <AlertComponent text={request.error} color={'warning'} />;
  else if (!request.success || !post) return <AlertComponent text={'No post'} color={'info'} />;
  else if (request.success)
    return (
      <PostForm
        action={handleSubmit}
        actionText="Save edit post"
        title={post.title}
        statusId={post.statusId._id}
        publishedDate={dateToStr(post.publishedDate)}
        content={post.content}
        price={post.price}
        telephone={post.telephone}
      />
    );
};

export default EditPostForm;
