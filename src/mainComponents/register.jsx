import React, { useState, useEffect } from "react";
import clientService from "../services/clientService";
import { asyncLocalStorage, TOKEN, USER } from "../utility/global";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";

const Register = (props) => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [selectedGender, setSelectedGender] = useState("");
  let [selectedMarital, setSelectedMarital] = useState("");

  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [contactEmail, setContactEmail] = useState("");
  let [firstname, setFirstname] = useState("");
  let [middlename, setMiddlename] = useState("");
  let [lastname, setLastname] = useState("");
  let [dob, setDob] = useState("");
  let [homeAddress, setHomeAddress] = useState("");
  let [postalAddress, setPostalAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let [selectedCountry, setSelectedCountry] = useState("");
  let [country, setCountry] = useState([]);

  useEffect(async () => {
    const allCountries = await clientService.countries();

    let countryData = allCountries.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        flag: item.code,
        text: item.name,
      };
    });
    setCountry(countryData);
  });

  const onChangeDropdown = async (e, data) => {
    const name = data.name;
    const value = data.value;
    let courseResult;

    if (name == "selectedGender") {
      setSelectedGender(value);
    } else if (name == "selectedMarital") {
      setSelectedMarital(value);
    } else if (name == "selectedCountry") {
      setSelectedCountry(value);
    }
  };
  const onChange = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "phone") {
      setPhone(value);
    }
    if (name == "email") {
      setEmail(value);
    }
    if (name == "password") {
      setPassword(value);
    }
    if (name == "confirmPassword") {
      setConfirmPassword(value);
    }
    if (name == "contactEmail") {
      setContactEmail(value);
    }

    if (name == "firstname") {
      setFirstname(value);
    }
    if (name == "middlename") {
      setMiddlename(value);
    }
    if (name == "lastname") {
      setLastname(value);
    }
    if (name == "dob") {
      setDob(value);
    }
    if (name == "homeAddress") {
      setHomeAddress(value);
    }
    if (name == "postalAddress") {
      setPostalAddress(value);
    }
  };

  const register = async (e) => {
    if (password == confirmPassword) {
      setLoading(true);
      const response = await clientService.signUp({
        email,
        password,
        phone,
        firstname,
        middlename,
        lastname,
        marital: selectedMarital,
        gender: selectedGender,
        dob,
        homeAddress,
        postalAddress,
        contactEmail,
        countyId: selectedCountry,
      });
      const { message, error } = response.data;

      if (error) {
        setIsShowMessage(true);
        setErrorMessage(message);
        window.scrollTo(500, 0);
      } else {
        const { data, token } = response.data;

        const setToken = await asyncLocalStorage.setItem(TOKEN, token);
        const setUser = await asyncLocalStorage.setItem(
          USER,
          JSON.stringify(data)
        );
        let { from } = props.location.state || {
          from: { pathname: `/dashboard` },
        };
        props.history.replace(from);
      }
      setLoading(false);
    } else {
      setIsShowMessage(true);
      setErrorMessage("Passwords do not match");
      window.scrollTo(500, 0);
    }
  };
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 550 }}>
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
          Create an account
        </Header>
        {isShowMessage ? (
          <Message warning>
            <Message.Header>{errorMessage}</Message.Header>
          </Message>
        ) : (
          ""
        )}
        <Form onSubmit={register} size="large">
          <Segment stacked style={{ textAlign: "left" }}>
            <Divider horizontal>Login Details</Divider>
            <Form.Input
              fluid
              icon="user"
              name="email"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={onChange}
            />

            <Form.Input
              fluid
              icon="lock"
              name="password"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={onChange}
            />
            <Form.Input
              fluid
              icon="lock"
              name="confirmPassword"
              iconPosition="left"
              placeholder="Confirm-password"
              type="password"
              onChange={onChange}
            />
            <Divider horizontal>Personal Information</Divider>
            <Form.Field>
              <label>Contact email </label>
              <input
                onChange={onChange}
                name="contactEmail"
                type="email"
                placeholder="Contact Email"
              />
            </Form.Field>
            <Form.Field required>
              <label>First name</label>
              <input
                onChange={onChange}
                name="firstname"
                required
                placeholder="Firstname"
              />
            </Form.Field>
            <Form.Field>
              <label>Middle name</label>
              <input
                name="middlename"
                placeholder="Middle name"
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>Last name</label>
              <input
                name="lastname"
                required
                placeholder="Last name"
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>Phone</label>

              <Form.Input
                fluid
                required
                name="phone"
                placeholder="Phone"
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>Country of residence</label>
              <Dropdown
                required
                fluid
                selection
                name="selectedCountry"
                placeholder={"Country of residence"}
                options={country}
                onChange={onChangeDropdown}
              />
            </Form.Field>
            <Form.Field required>
              <label>Date of birth</label>
              <input
                name="dob"
                placeholder="Date of birth"
                required
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>Gender</label>
              <Dropdown
                selection
                onChange={onChangeDropdown}
                name="selectedGender"
                options={[
                  { key: 1, text: "Male", value: "Male" },
                  { key: 2, text: "Female", value: "Female" },
                ]}
                placeholder="Choose an option"
              />
            </Form.Field>
            <Form.Field required>
              <label>Marital</label>
              <Dropdown
                selection
                onChange={onChangeDropdown}
                name="selectedMarital"
                options={[
                  { key: 1, text: "Single", value: "Single" },
                  { key: 2, text: "Married", value: "Married" },
                ]}
                placeholder="Choose an option"
              />
            </Form.Field>
            <Form.Field required>
              <label>Home address</label>
              <input
                name="homeAddress"
                placeholder="Home address"
                required
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>Contact address</label>
              <input
                name="postalAddress"
                placeholder="Contact address"
                required
                onChange={onChange}
              />
            </Form.Field>
            <Button loading={loading} color="blue" fluid size="large">
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          I am already Registered <Link to={"/login"}>Log-in</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
