import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../../store/store";
import {
  deleteUserAction,
  getUserAction,
} from "../../../store/action/users/users.action";
import "../../../style/style.css";

const List = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      try {
        setIsLoading(true);
        dispatch(getUserAction());
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleDeleteUser = (userId: undefined) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserAction(userId));
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                <p>
                  Title: {user.title}
                  <br />
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
                <br />
                <br />
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  disabled={isLoading}
                >
                  Delete
                </button>
                &nbsp;&nbsp;
                <Link to={`/edit/${user.id}`}>
                  <button>Edit</button>
                </Link>
              </li>
            ))
          ) : (
            <p>No users found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default List;
