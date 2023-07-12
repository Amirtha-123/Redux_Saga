import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../../store/store";
import {
  deleteUserAction,
  getUserAction,
} from "../../../store/action/users/users.action";
import "../../../style/style.css";
import userSlice from "../../../store/reducers/users/userSlice.create";

const { userDeleteReset } = userSlice.actions;
const List = () => {
  const dispatch = useDispatch();
  const { isLoading, isDelete, isDeleteLoading } = useSelector(
    (state: RootState) => state.user
  );
  const users = useSelector((state: RootState) => state.user.users);
  useEffect(() => {
    const fetchData = () => {
      try {
        
        dispatch(getUserAction());
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if(isDelete){
      dispatch(userDeleteReset());
    }
  }, [dispatch,isDelete]);
  console.log(isDeleteLoading,"isDeleteLoading",isLoading);
  

  const handleDeleteUser = (userId: undefined) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      if (!isDeleteLoading) {
        dispatch(deleteUserAction(userId));
      }
    }
  };

  return (
    <div>
      <h2>User List</h2>
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
                  disabled={isLoading || isDeleteLoading}
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
            <p>Loading...</p>
          )}
        </ul>
      
    </div>
  );
};

export default List;
