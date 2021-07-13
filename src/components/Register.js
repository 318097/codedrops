import React, { useState } from "react";
import { Input, Button } from "antd";
import { withRouter } from "react-router-dom";
import axios from "axios";
// import { setSession } from "../store/app/actions";
// import { connect } from "react-redux";
import { handleError, notify } from "../lib";
import tracking from "../lib/mixpanel";

const initialState = {
  name: "",
  username: "",
  password: "",
  email: "",
};

const Register = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialState);

  const handleInput =
    (key) =>
    ({ target: { value } }) =>
      setForm((data) => ({ ...data, [key]: value }));

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/register", form);
      history.push("/login");
      tracking.register(data);
      tracking.track("REGISTER");
      notify("Success");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="curve-border-1">
      <h3>Register</h3>
      <form>
        <Input
          className="mb"
          value={form.name}
          onChange={handleInput("name")}
          placeholder="Name"
        />
        <Input
          className="mb"
          value={form.username}
          onChange={handleInput("username")}
          placeholder="Username"
        />
        <Input
          className="mb"
          value={form.email}
          onChange={handleInput("email")}
          placeholder="Email"
        />
        <Input.Password
          className="mb"
          value={form.password}
          onChange={handleInput("password")}
          placeholder="Password"
          onPressEnter={handleRegister}
        />
        <br />
        <Button onClick={handleRegister} loading={loading}>
          Register
        </Button>
      </form>
    </section>
  );
};

export default withRouter(Register);
