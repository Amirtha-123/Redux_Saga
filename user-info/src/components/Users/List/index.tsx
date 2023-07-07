import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  getUserAction,
} from "../../../store/action/users/users.action";
import { RootState } from "../../../store/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user?.users);

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);
  console.log(users, "users");

  const handleDeleteUser = (userId: undefined | string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      dispatch(deleteUserAction());
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>Title: {user.title}</p>
              <p>
                Name: {user.firstName} {user.lastName}
              </p>
              {user.picture ? (
                <img src={user.picture} alt="User" />
              ) : (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBzOxY12dE5g9Vk3dM5XedbEKAKVL2QhALI3wQOU7GUQ&s"
                  alt="Default User"
                />
              )}
              <br></br>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              <button>
                <Link to={`/edit/${user.id}`}>Edit</Link>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default List;
