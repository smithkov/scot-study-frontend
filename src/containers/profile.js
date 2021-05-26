import React, { useState, useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import clientService from "../services/clientService";
import { asyncLocalStorage, TOKEN, USER } from "../utility/global";
import {
  Menu,
  Dropdown,
  Header,
  Button,
  Icon,
  Image,
  Table,
  Segment,
  Grid,
  Form,
  Message,
  Placeholder,
  Divider,
  List,
} from "semantic-ui-react";
import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";
const Profile = () => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [selectedGender, setSelectedGender] = useState("");
  let [selectedMarital, setSelectedMarital] = useState("");
  let [userId, setUserId] = useState("");
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
  let [isDisabled, setIsDisabled] = useState(true);
  let [country, setCountry] = useState([]);
  let [selectedCountry, setSelectedCountry] = useState("");
  let [countryText, setCountryText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(async () => {
    const getUser = await asyncLocalStorage.getUser();
    const userId = getUser.id;
    const findUserById = await clientService.findUserById({ userId });

    const userData = findUserById.data.data;

    setEmail(userData.email);
    setFirstname(userData.firstname);
    setLastname(userData.lastname);
    setDob(userData.dob);
    setUserId(userData.id);
    setSelectedGender(userData.gender);
    setSelectedMarital(userData.marital);
    setHomeAddress(userData.homeAddress);
    setPostalAddress(userData.postalAddress);
    setContactEmail(userData.contactEmail);
    setPhone(userData.phone);
    setSelectedCountry(userData.Country ? userData.Country.id : "");
    setCountryText(userData.Country ? userData.Country.name : "");
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
  }, []);
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
  const update = async () => {
    setLoading(true);

    const updateUser = await clientService.updateUserInfo(
      {
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
      },
      userId
    );
    const updateResult = updateUser.data;

    if (!updateResult.error) {
      setIsShowMessage(true);
      setErrorMessage(updateResult.message);
    }
    setLoading(false);
    window.scrollTo(500, 0);
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
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          {/* <TheContent /> */}
          <br />
          <Grid columns="equal">
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={14}>
              <CCard borderColor="primary">
                <CCardHeader>
                  <h4>My Profile</h4>
                </CCardHeader>
                <CCardBody>
                  {isShowMessage ? (
                    <Message warning>
                      <Message.Content>
                        <p style={{ textAlign: "center" }}>{errorMessage}</p>
                      </Message.Content>
                    </Message>
                  ) : (
                    ""
                  )}
                  <Form>
                    <Form.Field>
                      <label>Contact email </label>
                      <input
                        onChange={onChange}
                        value={contactEmail}
                        name="contactEmail"
                        type="email"
                        placeholder="Contact Email"
                        disabled={isDisabled}
                      />
                    </Form.Field>
                    <Form.Field required>
                      <label>First name</label>
                      <input
                        value={firstname}
                        placeholder="First name"
                        disabled={isDisabled}
                      />
                    </Form.Field>
                    <Form.Field required>
                      <label>Last name</label>
                      <input
                        value={lastname}
                        placeholder="Last name"
                        disabled={isDisabled}
                      />
                    </Form.Field>
                    <Form.Field required>
                      <label>Phone</label>
                      <Form.Input
                        fluid
                        required
                        name="phone"
                        value={phone}
                        placeholder="Phone"
                        onChange={onChange}
                        disabled={isDisabled}
                      />
                    </Form.Field>
                    <Form.Field required>
                      <label>Country of residence</label>
                      <Dropdown
                        required
                        fluid
                        selection
                        disabled={isDisabled}
                        name="selectedCountry"
                        placeholder={countryText || "Country of residence"}
                        options={country}
                        onChange={onChangeDropdown}
                      />
                    </Form.Field>
                    <Form.Field required>
                      <label>Date of birth</label>
                      <input
                        value={dob}
                        name="dob"
                        placeholder="Date of birth"
                        required
                        onChange={onChange}
                        disabled={isDisabled}
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
                        placeholder={selectedGender || "Choose an option"}
                        disabled={isDisabled}
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
                        placeholder={selectedMarital || "Choose an option"}
                        disabled={isDisabled}
                      />
                    </Form.Field>
                    <Form.Field required>
                      <label>Home address</label>
                      <input
                        name="homeAddress"
                        value={homeAddress}
                        placeholder="Home address"
                        required
                        onChange={onChange}
                        disabled={isDisabled}
                      />
                    </Form.Field>
                    <Form.Field required>
                      <label>Postal address</label>
                      <input
                        name="postalAddress"
                        value={postalAddress}
                        placeholder="Contact address"
                        required
                        onChange={onChange}
                        disabled={isDisabled}
                      />
                    </Form.Field>
                    <hr />
                    <Button
                      onClick={() => {
                        setIsDisabled(false);
                      }}
                      type="submit"
                    >
                      Edit
                    </Button>
                    <Button
                      loading={loading}
                      onClick={update}
                      color="blue"
                      type="submit"
                    >
                      Update
                    </Button>
                  </Form>
                </CCardBody>
              </CCard>

              <br />
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default Profile;
