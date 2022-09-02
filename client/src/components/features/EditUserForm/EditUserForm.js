import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { editUser, getUserById } from '../../../redux/usersRedux.js';
import UserForm from '../../view/UserForm/UserForm.js';

const EditUserForm = (props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { id } = useParams();

  const user = useSelector((state) => getUserById(state, id));

  const handleSubmit = (user) => {
    dispatch(editUser({ ...user, id }));
    navigate('/admin');
  };

  if (!user) return <Navigate to="/" />;
  else
    return (
      <UserForm
        action={handleSubmit}
        actionText="Save edit user"
        admin={user.admin}
        master={user.master}
        email={user.email}
        name={user.name}
        addDate={user.addDate}
      />
    );
};

export default EditUserForm;
