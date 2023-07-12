import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { IUser } from "../../../types/users/users.types";
import { USER_INIT_STATE } from "../../../utils/constants/users.constants";
import { validateForm } from "../../../utils/helpers/common.helpers";
import "../../../App.css";

import { ROUTERS } from "../../../utils/constants/router.constants";
import { useNavigate } from "react-router-dom";
import {
  createUserAction,
  createUserReset,
} from "../../../store/action/users/users.action";
import "../../../style/style.css";

const UserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<IUser>({
    ...USER_INIT_STATE,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = validateForm(formData);
    if (await isValid) {
      setIsLoading(true);
      const data = {
        ...formData,
        //firstName: "test",
      };
      dispatch(createUserAction(data));
      navigate(ROUTERS.home);
      setIsLoading(false);
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

    setFormData({ ...formData, [name]: value });
  };

  const handleTitleChange = (target: HTMLSelectElement) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    dispatch(createUserReset());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>User Form</h1>
        <div>
          <label>Title :</label>
          <select id="title" name="title" onChange={handleChange}>
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
          />
        </div>{" "}
        <br />
        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" onChange={handleChange} />
        </div>
        <br />
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          &nbsp;&nbsp;
          <button type="reset" onClick={handleReset} disabled={isLoading}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
