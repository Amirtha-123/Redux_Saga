import React, { useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../../types/users/users.types";
import { validateForm } from "../../../utils/helpers/common.helpers";
import "../../../App.css";
import { RootState } from "../../../store/store";
import { useNavigate, useParams } from "react-router-dom";

import { ROUTERS } from "../../../utils/constants/router.constants";
import {
  editUserAction,
  updateUserAction,
} from "../../../store/action/users/users.action";
import userSlice from "../../../store/reducers/users/userSlice.create";

const { userUpdateReset } = userSlice.actions;
const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: undefined }>();

  const dispatch = useDispatch();
  const { currentUser, isLoading, isUpdated, isUpdateLoading } = useSelector(
    (state: RootState) => state.user
  );
  const [currentFormData, setCurrentFormData] = useState<IUser | null>(
    currentUser
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (id) {
          dispatch(editUserAction(id));
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, [dispatch, id]);

  useEffect(() => {
    if (currentUser) {
      setCurrentFormData({ ...currentUser });
    }
  }, [currentUser]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = validateForm(currentFormData);
    if (isValid && currentFormData && !isLoading) {
      try {
        dispatch(updateUserAction({ id, ...currentFormData }));
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { target } = event;
    const { name, value } = target;
    setCurrentFormData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setCurrentFormData(currentUser);
  };
  useEffect(() => {
    if (isUpdated) {
      dispatch(userUpdateReset());
      navigate(ROUTERS.home);
    }
  }, [dispatch, isUpdated, navigate]);
  console.log(isUpdateLoading, "isUpdateLoading", isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <form>
        <h1>Editing User Form...</h1>
        <div>
          <label>Title :</label>
          <select
            id="title"
            name="title"
            onChange={handleChange}
            value={currentFormData?.title}
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
            value={currentFormData?.firstName}
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
            value={currentFormData?.lastName}
          />
        </div>{" "}
        <br />
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={currentFormData?.email}
          />
        </div>{" "}
        <br /> <br />
        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={isUpdateLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          &nbsp;&nbsp;
          <button type="reset" onClick={handleReset} disabled={isUpdateLoading}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
