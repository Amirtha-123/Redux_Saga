import React, { useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../../types/users/users.types";
import { USER_INIT_STATE } from "../../../utils/constants/users.constants";
import { validateForm } from "../../../utils/helpers/common.helpers";
import "../../../App.css";

import { ROUTERS } from "../../../utils/constants/router.constants";
import { useNavigate } from "react-router-dom";
import {
  editUserAction,
  updateUserAction,
} from "../../../store/action/users/users.action";
import { RootState } from "../../../store/store";

const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users); // Assuming 'user' is the correct slice name in the rootReducer

  const [currentData, setCurrentData] = useState<IUser>({ ...USER_INIT_STATE });

  useEffect(() => {
    dispatch(editUserAction());
  }, [dispatch]);

  console.log(users, "users");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = validateForm(currentData);
    if (isValid) {
      dispatch(updateUserAction());
      setTimeout(() => {
        navigate(ROUTERS.home);
      }, 1000);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { target } = event;
    const { name, value } = target;

    if (name === "title") {
      handleTitleChange(target as HTMLSelectElement);
    }

    setCurrentData({ ...currentData, [name]: value });
  };

  const handleTitleChange = (target: HTMLSelectElement) => {
    const { name, value } = target;
    setCurrentData({ ...currentData, [name]: value });
  };

  const handleReset = () => {
    setCurrentData({ ...USER_INIT_STATE });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Editing User Form...</h1>
        <div>
          <label>Title :</label>
          <select
            id="title"
            name="title"
            onChange={handleChange}
            value={currentData.title}
          >
            <option value="">Select title</option>
            <option value="mr">mr</option>
            <option value="mrs">mrs</option>
            <option value="miss">miss</option>
            <option value="ms">ms</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            value={currentData.firstName}
          />
        </div>
        <br />
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={currentData.lastName}
          />
        </div>{" "}
        <br />
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={currentData.email}
          />
        </div>
        <br />
        <div>
          <button type="submit">Update</button>
          &nbsp;&nbsp;
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
