import React, { useState, useEffect } from "react";
import { Input, Button, message as antMessage } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { captureException } from "../../lib";
import tracking from "../../lib/mixpanel";

const { TextArea } = Input;

const initialState = {
  name: "",
  email: "",
  message: "",
};

const Feedback = ({ session, history }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialState);
  const loggedInUser = session && session.loggedIn;

  useEffect(() => {
    if (loggedInUser) {
      const { name, email } = session || {};
      setForm({ name, email });
    }
  }, [loggedInUser]);

  const handleInput =
    (key) =>
    ({ target: { value } }) =>
      setForm((data) => ({ ...data, [key]: value }));

  const submitResponse = async () => {
    try {
      setLoading(true);
      const { name, email, message } = form;
      if (!name || !email || !message)
        return antMessage.error("All fields are required");

      await axios.post("/feedback", form);
      antMessage.success("Submitted");
      setForm(initialState);
      tracking.track("FEEDBACK");
      history.push("/");
    } catch (err) {
      console.log(err);
      captureException(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="feedback">
      <h3>Feedback</h3>
      <Input
        className="mb"
        value={form.name}
        onChange={handleInput("name")}
        placeholder="Name"
        disabled={loggedInUser}
      />
      <Input
        className="mb"
        value={form.email}
        onChange={handleInput("email")}
        placeholder="Email"
        disabled={loggedInUser}
      />
      <TextArea
        placeholder="Feedback..."
        onChange={handleInput("message")}
        rows={4}
      />
      <br />
      <Button onClick={submitResponse} loading={loading}>
        Submit
      </Button>
    </section>
  );
};

const mapStateToProps = ({ app: { session } }) => ({
  session,
});

export default connect(mapStateToProps)(Feedback);
