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
  Placeholder,
  Divider,
  List,
  Message,
} from "semantic-ui-react";
const English = (props) => {
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [selectedName, setSelectedName] = useState("");
  let [score, setScore] = useState("");
  let [userId, setUserId] = useState("");
  let [hasApplied, setHasApplied] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(async () => {
    const getUser = await asyncLocalStorage.getUser();
    const userId = getUser.id;
    setUserId(userId);

    const findEnglishResult = await clientService.findEnglish({
      userId,
    });
    const currentData = findEnglishResult.data.data;
    if (currentData) {
      setScore(currentData.score);
      setSelectedName(currentData.name);
    } else {
      //alert("No  data");
    }
    const findApplications = await clientService.findApplicationsByUser({
      userId,
    });

    setHasApplied(findApplications.data.data.length > 0 ? true : false);
  }, []);
  const onChangeDropdown = async (e, data) => {
    const name = data.name;
    const value = data.value;

    if (name == "selectedName") {
      setSelectedName(value);
    }
  };
  const update = async () => {
    if (selectedName != "") {
      setLoading(true);

      const updateUser = await clientService.saveEnglishTest({
        score: score,
        name: selectedName,
        userId: userId,
      });

      const result = updateUser.data;
      if (!result.error) {
        setIsShowMessage(true);
        setErrorMessage(result.message);
      }
      setLoading(false);
      if (!hasApplied) {
        props.history.push("/sponsorship");
      }
    } else {
      setIsShowMessage(true);
      setErrorMessage("Please select test type");
    }
    window.scrollTo(500, 0);
  };
  const onChange = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "score") {
      setScore(value);
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
            <Grid.Column width={8}>
              {isShowMessage ? (
                <Message warning>
                  <Message.Content>
                    <p style={{ textAlign: "center" }}>{errorMessage}</p>
                  </Message.Content>
                </Message>
              ) : (
                ""
              )}
              <Form onSubmit={update}>
                <Form.Field required>
                  <label>Test type</label>
                  <Dropdown
                    selection
                    onChange={onChangeDropdown}
                    name="selectedName"
                    options={[
                      { key: 1, text: "TOEFL", value: "TOEFL" },
                      { key: 2, text: "IELTS", value: "IELTS" },
                    ]}
                    placeholder={selectedName || "Choose an option"}
                  />
                </Form.Field>

                <Form.Field required>
                  <label>Score</label>
                  <input
                    name="score"
                    value={score}
                    placeholder="Score"
                    required
                    onChange={onChange}
                  />
                </Form.Field>

                <hr />

                <Button loading={loading} color="blue" type="submit">
                  Save
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default English;
