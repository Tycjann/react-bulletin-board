import UserForm from '../../view/UserForm/UserForm';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../redux/usersRedux.js';
import { useNavigate } from 'react-router-dom';

const AddUserForm = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = (user) => {
    user.addDate = new Date();
    user.master='0';
    dispatch(addUser(user));
    navigate('/admin');
  };

  return <UserForm action={handleSubmit} actionText="Add post" />;
};

export default AddUserForm;
