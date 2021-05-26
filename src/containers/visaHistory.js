import React, { useState, useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import clientService from "../services/clientService";
import { asyncLocalStorage, TOKEN, USER } from "../utility/global";
import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";
import { years } from "../utility/constants";
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
const YES = "Yes";
const VisaHistory = (props) => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [selectedHasApplied, setSelectedHasApplied] = useState("");
  let [purpose, setPurpose] = useState("");
  let [reason, setReason] = useState("");
  let [isShowReason, setIsShowReason] = useState(false);
  let [isShowPurpose, setIsShowPurpose] = useState(false);
  let [moreInfo, setMoreInfo] = useState("");
  let [selectedHasRefused, setSelectedHasRefused] = useState("");

  let [userId, setUserId] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  let [hasApplied, setHasApplied] = useState(false);

  useEffect(async () => {
    const getUser = await asyncLocalStorage.getUser();
    const userId = getUser.id;
    setUserId(userId);

    const findVisaResult = await clientService.findVisa({
      userId,
    });

    const currentData = findVisaResult.data.data;
    if (currentData) {
      setSelectedHasApplied(currentData.hasApplied);
      setSelectedHasRefused(currentData.hasRefused);
      setMoreInfo(currentData.moreInfo);
      setReason(currentData.reason);
      setPurpose(currentData.purpose);

      if (currentData.hasApplied == YES) {
        setIsShowPurpose(true);
      }
      if (currentData.hasRefused == YES) {
        setIsShowReason(true);
      }
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

    if (name == "selectedHasRefused") {
      setSelectedHasRefused(value);

      if (value == YES) {
        setIsShowReason(true);
      } else {
        setIsShowReason(false);
      }
    }
    if (name == "selectedHasApplied") {
      setSelectedHasApplied(value);
      if (value == YES) {
        setIsShowPurpose(true);
      } else {
        setIsShowPurpose(false);
      }
    }
  };
  const update = async () => {
    if (selectedHasRefused != "" && selectedHasApplied != "") {
      if (selectedHasRefused == YES && reason == "") {
        setIsShowMessage(true);
        setErrorMessage("Reason of Visa refusal is required");
        window.scrollTo(500, 0);
        return;
      }
      if (selectedHasApplied == YES && purpose == "") {
        setIsShowMessage(true);
        setErrorMessage("Purpose of travel is required");
        window.scrollTo(500, 0);
        return;
      }
      setLoading(true);

      const updateUser = await clientService.saveVisa({
        hasApplied: selectedHasApplied,
        hasRefused: selectedHasRefused,
        purpose: purpose,
        moreInfo: moreInfo,
        reason: reason,
        userId: userId,
      });

      const result = updateUser.data;
      if (!result.error) {
        setIsShowMessage(true);
        setErrorMessage(result.message);
        if (!hasApplied) {
          props.history.push("/application");
        }
      }

      setLoading(false);
    } else {
      setIsShowMessage(true);
      setErrorMessage("All fields marked '*' are required");
    }
    window.scrollTo(500, 0);
  };
  const onChange = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "reason") {
      setReason(value);
    }
    if (name == "purpose") {
      setPurpose(value);
    }
    if (name == "moreInfo") {
      setMoreInfo(value);
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
                  <h4>Visa History</h4>
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
                    <Form.Field required>
                      <label>Have you applied for a UK Visa before ?</label>
                      <Dropdown
                        selection
                        onChange={onChangeDropdown}
                        name="selectedHasApplied"
                        options={[
                          {
                            key: 1,
                            text: "Yes",
                            value: "Yes",
                          },
                          { key: 2, text: "No", value: "No" },
                        ]}
                        placeholder={selectedHasApplied || "Choose an option"}
                      />
                    </Form.Field>
                    {isShowPurpose ? (
                      <Form.Field required>
                        <label>Purpose</label>
                        <Form.TextArea
                          value={purpose}
                          name="purpose"
                          onChange={onChange}
                          placeholder="Tell us purpose of Visa application..."
                        />
                      </Form.Field>
                    ) : (
                      ""
                    )}

                    <Form.Field required>
                      <label>Have you been refused UK Visa before?</label>
                      <Dropdown
                        selection
                        onChange={onChangeDropdown}
                        name="selectedHasRefused"
                        options={[
                          {
                            key: 1,
                            text: "Yes",
                            value: "Yes",
                          },
                          { key: 2, text: "No", value: "No" },
                        ]}
                        placeholder={selectedHasRefused || "Choose an option"}
                      />
                    </Form.Field>
                    {isShowReason ? (
                      <Form.Field required>
                        <label>Reason of refusal</label>
                        <Form.TextArea
                          value={reason}
                          name="reason"
                          onChange={onChange}
                          placeholder="Reason of refusal..."
                        />
                      </Form.Field>
                    ) : (
                      ""
                    )}

                    <Form.Field>
                      <label>More info</label>
                      <Form.TextArea
                        value={moreInfo}
                        onChange={onChange}
                        name="moreInfo"
                        placeholder="More info..."
                      />
                    </Form.Field>

                    <hr />

                    <Button
                      loading={loading}
                      onClick={update}
                      color="blue"
                      type="submit"
                    >
                      Save
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

export default VisaHistory;
