import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { setSession } from "../store/app/actions";
import { connect } from "react-redux";
import { captureException, setSessionInStorage } from "../lib";

const initialState = {
  password: "",
  username: "",
};

const Login = ({ history, setSession, session }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (session && session.loggedIn) history.push("/");
  }, []);

  const handleInput =
    (key) =>
    ({ target: { value } }) =>
      setForm((data) => ({ ...data, [key]: value }));

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/login", form);

      setSessionInStorage(data);
      await setSession({
        loggedIn: true,
        info: "LOGIN",
        ...data,
      });
      axios.defaults.headers.common["authorization"] = data.token;
      history.push("/");
    } catch (err) {
      const { response: { data: errorMessage = "Error." } = {} } = err;
      message.error(errorMessage);
      captureException(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login" className="curve-border-1">
      <h3>Login</h3>
      <form>
        <Input
          className="mb"
          value={form.username}
          onChange={handleInput("username")}
          placeholder="Username"
        />
        <Input.Password
          className="mb"
          value={form.password}
          onChange={handleInput("password")}
          placeholder="Password"
          onPressEnter={handleLogin}
        />
        <br />
        <Button onClick={handleLogin} loading={loading}>
          Login
        </Button>

        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </form>
    </section>
  );
};

const mapStateToProps = ({ session }) => ({
  session,
});

export default connect(mapStateToProps, { setSession })(withRouter(Login));
