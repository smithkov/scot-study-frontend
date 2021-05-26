import React, { useState, useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import clientService from "../services/clientService";
import { asyncLocalStorage, TOKEN, USER } from "../utility/global";
import { Link, Redirect } from "react-router-dom";
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
  Input,
  Modal,
} from "semantic-ui-react";
const Application = (props) => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [highSchoolName, setHighSchoolName] = useState("");
  let [selectedCompletionYear, setSelectedCompletionYear] = useState("");
  let [completedYear, setCompletedYear] = useState([]);
  let [userId, setUserId] = useState("");
  let [schoolOne, setSchoolOne] = useState([]);
  let [schoolTwo, setSchoolTwo] = useState([]);
  let [selectedSchoolOne, setSelectedSchoolOne] = useState("");
  let [selectedSchoolTwo, setSelectedSchoolTwo] = useState("");
  let [selectedSchoolOneName, setSelectedSchoolOneName] = useState("");
  let [selectedSchoolTwoName, setSelectedSchoolTwoName] = useState("");
  let [isOpenModal, setIsOpenModal] = useState(false);
  let [institutions, setInstitutions] = useState([]);
  let [degreeTypes, setDegreeTypes] = useState([]);
  let [selectedDegreeType, setSelectedDegreeType] = useState("");
  let [search, setSearch] = useState("");

  let [isCourse1, setIsCourse1] = useState(false);
  let [isCourse2, setIsCourse2] = useState(false);

  let [courseOne, setCourseOne] = useState("");
  let [courseTwo, setCourseTwo] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  let [hasApplied, setHasApplied] = useState(false);
  let [submitFlag, setSubmitFlag] = useState(false);

  useEffect(async () => {
    const degreeTypeResult = await clientService.degreeTypes();

    let degreeTypeData = degreeTypeResult.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        text: item.name,
      };
    });

    setDegreeTypes(degreeTypeData);

    const schools = await clientService.institutions();

    let schoolData = schools.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        text: item.name,
      };
    });

    setSchoolOne(schoolData);
    setSchoolTwo(schoolData);

    const getUser = await asyncLocalStorage.getUser();
    const userId = getUser.id;
    setUserId(userId);

    const highestQuali = await clientService.findHighestQualification({
      userId,
    });
    if (!highestQuali.data.data) {
      props.history.push("/edu_background");
    }

    const highSchool = await clientService.findHighSchool({
      userId,
    });

    if (!highSchool.data.data) {
      props.history.push("/highSchool");
    }

    const englishTest = await clientService.findEnglish({
      userId,
    });

    if (!englishTest.data.data) {
      props.history.push("/english_test");
    }

    const sponsor = await clientService.findSponsor({
      userId,
    });
    if (!sponsor.data.data) {
      props.history.push("/sponsorship");
    }
    const visaHistory = await clientService.findVisa({
      userId,
    });
    if (!visaHistory.data.data) {
      props.history.push("/visa_history");
    }

    const findApplications = await clientService.findApplicationsByUser({
      userId,
    });

    setHasApplied(findApplications.data.data.length > 0 ? true : false);
  }, []);
  const onChangeDropdown = async (e, data) => {
    const name = data.name;
    const value = data.value;
    const text = e.target.innerText;

    if (name == "selectedSchoolOne") {
      setSelectedSchoolOne(value);
      setSelectedSchoolOneName(text);
    } else if (name == "selectedSchoolTwo") {
      setSelectedSchoolTwo(value);
      setSelectedSchoolTwoName(text);
    } else if (name == "selectedDegreeType") {
      setSelectedDegreeType(value);
    }
  };
  const selectCourse = async (course) => {
    if (isCourse1) {
      setCourseOne(course);
    } else if (isCourse2) {
      setCourseTwo(course);
    }
    setIsOpenModal(false);
  };

  const newApplication = () => {
    setHasApplied(false);
  };
  const loadSchoolOne = async () => {
    setIsOpenModal(true);
    setIsCourse1(true);
    setIsCourse2(false);
    const school = await clientService.findCourseByInstitutionForReg({
      institutionId: selectedSchoolOne,
      degreeTypeId: selectedDegreeType,
      search: search,
    });
    const data = school.data.data;

    setInstitutions(data);
  };

  const loadSchoolTwo = async () => {
    setIsOpenModal(true);
    setIsCourse1(false);
    setIsCourse2(true);
    const school = await clientService.findCourseByInstitutionForReg({
      institutionId: selectedSchoolTwo,
      degreeTypeId: selectedDegreeType,
      search: search,
    });
    const data = school.data.data;

    setInstitutions(data);
  };
  const removeCourse = (courseNumber) => {
    if (courseNumber == 1) {
      setCourseOne("");
    } else if (courseNumber == 2) {
      setCourseTwo("");
    }
  };
  const searchCourse = async (e) => {
    const value = e.target.value;
    const school = await clientService.findCourseByInstitutionForReg({
      institutionId: selectedSchoolTwo,
      degreeTypeId: selectedDegreeType,
      search: value,
    });
    const data = school.data.data;

    setInstitutions(data);
  };
  const update = async () => {
    if (courseOne != "") {
      setLoading(true);

      const updateUser = await clientService.saveApplication({
        courseOne: courseOne ? courseOne.name : "",
        courseTwo: courseTwo ? courseTwo.name : "",
        institutionOne: selectedSchoolOneName,
        institutionTwo: selectedSchoolTwoName,
        degreeTypeId: selectedDegreeType,
        userId: userId,
      });

      const result = updateUser.data;
      if (!result.error) {
        setIsShowMessage(true);
        setErrorMessage(result.message);
        setSubmitFlag(true);
      }

      setLoading(false);
    } else {
      setIsShowMessage(true);
      setErrorMessage("Please select at least a first course of choice.");
    }
    window.scrollTo(500, 0);
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
                  <h4>Application</h4>
                </CCardHeader>
                <CCardBody>
                  {hasApplied || submitFlag ? (
                    <>
                      <Segment textAlign="center" color="blue">
                        <h2>Your application has been submitted</h2>
                      </Segment>
                      <hr />
                      {hasApplied ? (
                        <Button onClick={newApplication} color="blue">
                          Start a new application
                        </Button>
                      ) : (
                        <Button as="a" href="/dashboard" color="blue">
                          Return to dashboard
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      {" "}
                      {isShowMessage ? (
                        <Message warning>
                          <Message.Content>
                            <p style={{ textAlign: "center" }}>
                              {errorMessage}
                            </p>
                          </Message.Content>
                        </Message>
                      ) : (
                        ""
                      )}
                      <Form onSubmit={update}>
                        <Modal
                          style={{ height: "auto" }}
                          size="small"
                          open={isOpenModal}
                        >
                          <Modal.Header>Delete Your Account</Modal.Header>
                          <Modal.Content scrolling>
                            <Input
                              name="search"
                              onChange={searchCourse}
                              fluid
                              placeholder="Search course"
                            />
                            {institutions.length > 0 ? (
                              <Table unstackable color="blue">
                                <Table.Header>
                                  <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Faculty</Table.HeaderCell>
                                    <Table.HeaderCell>Degree</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                  {institutions.map((item) => {
                                    return (
                                      <Table.Row>
                                        <Table.Cell>{item.name}</Table.Cell>
                                        <Table.Cell>
                                          {item.Faculty.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                          {item.DegreeType.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                          <Button
                                            onClick={() => selectCourse(item)}
                                            size="mini"
                                            color="blue"
                                          >
                                            Select
                                          </Button>
                                        </Table.Cell>
                                      </Table.Row>
                                    );
                                  })}
                                </Table.Body>
                              </Table>
                            ) : (
                              <Message floating>No result found</Message>
                            )}
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              onClick={() => setIsOpenModal(false)}
                              negative
                            >
                              Close
                            </Button>
                          </Modal.Actions>
                          <br />
                          <br />
                        </Modal>
                        <Form.Field required>
                          <label>Degree of choice</label>
                          <Dropdown
                            required
                            fluid
                            selection
                            search
                            name="selectedDegreeType"
                            label="Degree Type"
                            placeholder={"Degree Type"}
                            options={degreeTypes}
                            onChange={onChangeDropdown}
                          />
                        </Form.Field>
                        <Form.Field required>
                          <label> Preferred institution first choice</label>
                          <Dropdown
                            disabled={selectedDegreeType ? false : true}
                            required
                            fluid
                            selection
                            search
                            name="selectedSchoolOne"
                            label="School"
                            placeholder={"Institution"}
                            options={schoolOne}
                            onChange={onChangeDropdown}
                          />
                        </Form.Field>
                        {selectedSchoolOne ? (
                          <>
                            <Button
                              type="button"
                              onClick={loadSchoolOne}
                              positive
                            >
                              Select first course of choice
                            </Button>{" "}
                            <br />
                            <br />
                          </>
                        ) : (
                          ""
                        )}
                        {courseOne ? (
                          <Table unstackable compact color="blue">
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>
                                  First course of choice{" "}
                                </Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              <Table.Row>
                                <Table.Cell>{courseOne.name}</Table.Cell>
                                <Table.Cell>
                                  <Link onClick={() => removeCourse(1)}>
                                    {" "}
                                    <Icon
                                      color="red"
                                      size="large"
                                      name="cancel"
                                    />
                                  </Link>
                                </Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                        ) : (
                          ""
                        )}

                        <Form.Field required>
                          <label>
                            {" "}
                            Preferred institution second choice (if any)
                          </label>
                          <Dropdown
                            disabled={
                              selectedDegreeType && courseOne ? false : true
                            }
                            required
                            fluid
                            selection
                            search
                            name="selectedSchoolTwo"
                            label="School"
                            placeholder={"Institution"}
                            options={schoolTwo}
                            onChange={onChangeDropdown}
                          />
                        </Form.Field>
                        {selectedSchoolTwo ? (
                          <>
                            <Button
                              type="button"
                              onClick={loadSchoolTwo}
                              positive
                            >
                              Select second course of choice
                            </Button>{" "}
                            <br />
                            <br />
                          </>
                        ) : (
                          ""
                        )}
                        {courseTwo ? (
                          <Table unstackable compact color="blue">
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>
                                  Second course of choice{" "}
                                </Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              <Table.Row>
                                <Table.Cell>{courseTwo.name}</Table.Cell>
                                <Table.Cell>
                                  <Link onClick={() => removeCourse(2)}>
                                    {" "}
                                    <Icon
                                      color="red"
                                      size="large"
                                      name="cancel"
                                    />
                                  </Link>
                                </Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                        ) : (
                          ""
                        )}

                        <hr />

                        <Button loading={loading} color="blue" type="submit">
                          Submit
                        </Button>
                      </Form>
                      <br />
                    </>
                  )}
                </CCardBody>
              </CCard>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default Application;
