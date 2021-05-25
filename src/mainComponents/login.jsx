import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { asyncLocalStorage, TOKEN, USER } from "../utility/global";

import clientService from "../services/clientService";
import { Link, Redirect } from "react-router-dom";
const Login = (props) => {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(async () => {
    const getUser = await asyncLocalStorage.getUser();
    console.log(JSON.parse(getUser));
  }, []);

  const login = async (e) => {
    setLoading(true);
    const response = await clientService.signIn({ email, password });
    const { message, error } = response.data;

    if (error) {
      setIsShowMessage(true);
      setErrorMessage(message);
    } else {
      const { data, token, isAdmin } = response.data;

      const setToken = await asyncLocalStorage.setItem(TOKEN, token);
      const setUser = await asyncLocalStorage.setItem(
        USER,
        JSON.stringify(data)
      );
      let { from } = props.location.state || {
        from: { pathname: isAdmin ? `admin_dashboard` : `/dashboard` },
      };
      props.history.replace(from);
    }
    setLoading(false);
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Link to={"/"}>
          <Image
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
              width: "55%",
            }}
            size="small"
            src="/images/logo-white.png"
          />
        </Link>
        <hr></hr>
        <Header as="h2" color="blue" textAlign="center">
          Log-in to your account
        </Header>
        {isShowMessage ? (
          <Message warning>
            <Message.Header>{errorMessage}</Message.Header>
          </Message>
        ) : (
          ""
        )}

        <Form onSubmit={login} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              onChange={onChange}
              required
              icon="user"
              name="email"
              iconPosition="left"
              placeholder="E-mail address"
              type="email"
            />
            <Form.Input
              fluid
              onChange={onChange}
              required
              icon="lock"
              name="password"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button loading={loading} color="blue" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to={"/register"}>Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
