import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../../store/action/users/users.action";
import { RootState } from "../../../store/store";

const List = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);
  console.log(users, "users");
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
