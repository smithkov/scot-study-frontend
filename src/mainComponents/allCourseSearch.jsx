import React, { useState, useEffect } from "react";
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
  Input,
} from "semantic-ui-react";
import TextLogo from "../widgets/textLogo";
import Loading from "../widgets/loading";
import NoTableData from "../widgets/noTableData";
import clientService from "../services/clientService";
import { primaryColor, imageStyles } from "../utility/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import Footer from "../widgets/footer";

import CourseItem from "../widgets/courseItem";
import MainMenu from "../widgets/mainMenu";
import PopularList from "../widgets/popularList";
import { icon } from "@fortawesome/fontawesome-svg-core";
import Banner from "../widgets/banner";
let offset = 1;
function AllCourseSearch(props) {
  let [isDisableNextButton, setIsDisableNextButton] = useState(false);
  let [isEmpty, setIsEmpty] = useState(false);
  let [hasData, setHasData] = useState(false);
  let [isDisablePreviousButton, setIsDisablePreviousButton] = useState(false);
  let [courses, setCourses] = useState([]);
  let [institutions, setInstitutions] = useState([]);
  let [faculties, setFaculties] = useState([]);
  let [degreeTypes, setDegreeTypes] = useState([]);
  let [loading, setLoading] = useState(false);
  let [selectedFaculty, setSelectedFaculty] = useState("");
  let [search, setSearch] = useState("");
  let [selectedInstitution, setSelectedInstitution] = useState("");
  let [selectedDegreeType, setSelectedDegreeType] = useState("");
  let [isPreviousBtnLoading, setIsPreviousBtnLoading] = useState(false);
  let [isNextBtnLoading, setIsNextBtnLoading] = useState(false);

  let limit = 10;
  let totalLoad = limit;

  useEffect(async () => {
    const facultyResult = await clientService.faculties();
    let facultyData = facultyResult.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        text: item.name,
      };
    });
    setFaculties(facultyData);
    const degreeTypeResult = await clientService.degreeTypes();
    let degreeTypeData = degreeTypeResult.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        text: item.name,
      };
    });

    setDegreeTypes(degreeTypeData);
    const institutionResult = await clientService.institutionsLighter();
    console.log(institutionResult.data.data);
    let institutionData = institutionResult.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        text: item.name,
      };
    });
    setInstitutions(institutionData);
    const courseResult = await schoolCourse(
      selectedFaculty,
      offset,
      limit,
      selectedDegreeType,
      selectedInstitution,
      search
    );

    setCourses(courseResult.data.data);
  }, []);
  const onChange = async (e) => {
    const value = e.target.value;
    const courseResult = await schoolCourse(
      selectedFaculty,
      offset,
      limit,
      selectedDegreeType,
      selectedInstitution,
      value
    );
    setSearch(value);
    setCourses(courseResult.data.data);
  };
  const onChangeDropdown = async (e, data) => {
    const name = data.name;
    const value = data.value;
    let courseResult;

    if (name == "selectedFaculty") {
      setSelectedFaculty(value);
      courseResult = await schoolCourse(
        value,
        offset,
        limit,
        selectedDegreeType,
        selectedInstitution,
        search
      );
    } else if (name == "selectedDegreeType") {
      setSelectedDegreeType(value);
      courseResult = await schoolCourse(
        selectedFaculty,
        offset,
        limit,
        value,
        selectedInstitution,
        search
      );
    } else if (name == "selectedInstitution") {
      setSelectedInstitution(value);
      courseResult = await schoolCourse(
        selectedFaculty,
        offset,
        limit,
        selectedDegreeType,
        value,
        selectedInstitution,
        search
      );
    }

    setCourses(courseResult.data.data);
  };

  const previous = async () => {
    canDisablePrevious();
    if (offset >= 1) {
      setIsPreviousBtnLoading(true);
      offset -= limit;
      let courseResult = await schoolCourse(
        selectedFaculty,
        offset,
        limit,
        selectedDegreeType,
        selectedInstitution,
        search
      );
      setCourses(courseResult.data.data);
      setIsPreviousBtnLoading(false);
    }
  };
  const next = async () => {
    setIsNextBtnLoading(true);
    offset += limit;

    let courseResult = await schoolCourse(
      selectedFaculty,
      offset,
      limit,
      selectedDegreeType,
      selectedInstitution,
      search
    );
    setCourses(courseResult.data.data);
    setIsNextBtnLoading(false);
  };
  function canDisableNext(totalLoad) {
    if (totalLoad != limit) {
      setIsDisableNextButton(true);
    } else {
      setIsDisableNextButton(false);
    }
  }

  async function reset() {
    window.location.reload(false);
  }
  function canDisablePrevious() {
    if (offset <= 1) {
      setIsDisablePreviousButton(true);
    } else {
      setIsDisablePreviousButton(false);
    }
  }

  async function schoolCourse(
    selectedFaculty,
    offset,
    limit,
    selectedDegree,
    selectedInstitution,
    search
  ) {
    const result = await clientService.allCoursesSearch({
      institutionId: selectedInstitution,
      facultyId: selectedFaculty,
      offset,
      limit,
      degreeTypeId: selectedDegree,
      search: search,
    });
    totalLoad = result.data.data;
    setIsEmpty(totalLoad.length > 0 ? false : true);
    canDisableNext(totalLoad.length);
    setHasData(true);
    canDisablePrevious();
    return result;
  }
  return (
    <div>
      <MainMenu />
      <Banner caption={`Search Courses`} />

      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={12}>
          <hr></hr>
          <Divider horizontal>
            <Header as="h4">
              <Icon color="blue" name="graduation cap" />
              Courses
            </Header>
          </Divider>
          <Segment>
            <Grid stackable columns="equal">
              <Grid.Column width="2">
                <Button size="mini" onClick={reset}>
                  <Icon name="redo alternate" /> Reset
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Input
                  fluid
                  name="search"
                  onChange={onChange}
                  placeholder="Search course..."
                />
              </Grid.Column>
              <Grid.Column>
                <Dropdown
                  required
                  fluid
                  selection
                  search
                  name="selectedInstitution"
                  label="Institution"
                  placeholder="Select institution"
                  options={institutions}
                  onChange={onChangeDropdown}
                />
              </Grid.Column>
              <Grid.Column>
                <Dropdown
                  required
                  fluid
                  selection
                  search
                  name="selectedDegreeType"
                  label="Degree Type"
                  placeholder="Select degree type"
                  options={degreeTypes}
                  onChange={onChangeDropdown}
                />
              </Grid.Column>
              <Grid.Column>
                <Dropdown
                  required
                  fluid
                  selection
                  search
                  name="selectedFaculty"
                  label="Faculty"
                  placeholder="Select faculty"
                  options={faculties}
                  onChange={onChangeDropdown}
                />
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment color="red">
            {hasData ? (
              isEmpty ? (
                <NoTableData />
              ) : (
                <>
                  <Table unstackable striped>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Course</Table.HeaderCell>
                        <Table.HeaderCell>Faculty</Table.HeaderCell>
                        <Table.HeaderCell>Fee</Table.HeaderCell>
                        <Table.HeaderCell>Degree Type</Table.HeaderCell>
                        <Table.HeaderCell>Institutions</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {courses.map((item) => {
                        return (
                          <Table.Row>
                            <Table.Cell>
                              <h4>
                                <Link to={`/course/${item.id}`}>
                                  {item.name}
                                </Link>
                              </h4>
                            </Table.Cell>
                            <Table.Cell>
                              {" "}
                              <h4>{item.Faculty.name}</h4>
                            </Table.Cell>
                            <Table.Cell>
                              <h4>{item.fee}</h4>
                            </Table.Cell>
                            <Table.Cell>
                              <h4>{item.DegreeType.name}</h4>
                            </Table.Cell>
                            <Table.Cell singleLine>
                              <h4> {item.Institution.name}</h4>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                    <Table.Footer>
                      <Table.Row>
                        <Table.HeaderCell>
                          {" "}
                          <Button
                            color="blue"
                            onClick={previous}
                            disabled={isDisablePreviousButton}
                            floated="left"
                            loading={isPreviousBtnLoading}
                          >
                            <Icon name="arrow alternate circle left" /> Previous
                          </Button>
                        </Table.HeaderCell>
                        <Table.HeaderCell colSpan="4">
                          <Button
                            onClick={next}
                            loading={isNextBtnLoading}
                            color="blue"
                            disabled={isDisableNextButton}
                            floated="right"
                          >
                            Next <Icon name="arrow alternate circle right" />
                          </Button>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>
                </>
              )
            ) : (
              <Loading />
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
      <Footer />
    </div>
  );
}

export default AllCourseSearch;
