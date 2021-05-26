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
} from "semantic-ui-react";
import TextLogo from "../widgets/textLogo";
import Footer from "../widgets/footer";
import Loading from "../widgets/loading";
import clientService from "../services/clientService";
import { primaryColor, imageStyles } from "../utility/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

import CourseItem from "../widgets/courseItem";
import MainMenu from "../widgets/mainMenu";
import PopularList from "../widgets/popularList";
import { icon } from "@fortawesome/fontawesome-svg-core";
let offset = 1;
function Institution(props) {
  const [isDisableNextButton, setIsDisableNextButton] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [isDisablePreviousButton, setIsDisablePreviousButton] = useState(false);
  const [institution, setInstitution] = useState([]);
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [degreeTypes, setDegreeTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDegreeType, setSelectedDegreeType] = useState("");
  const [isPreviousBtnLoading, setIsPreviousBtnLoading] = useState(false);
  const [isNextBtnLoading, setIsNextBtnLoading] = useState(false);

  let limit = 10;
  let totalLoad = limit;
  const id = props.match.params.id;
  useEffect(async () => {
    const result = await clientService.findInstitutionById({ id });

    const facultyResult = await clientService.faculties();
    let facultyData = facultyResult.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        text: item.name,
      };
    });
    setFaculties([{ key: "", text: "--Select faculty--" }].concat(facultyData));

    const degreeTypeResult = await clientService.degreeTypes();
    let degreeTypeData = degreeTypeResult.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        text: item.name,
      };
    });
    setDegreeTypes(
      [{ key: "", text: "--Select degree type--" }].concat(degreeTypeData)
    );
    const courseResult = await schoolCourse(
      id,
      selectedFaculty,
      offset,
      limit,
      selectedDegreeType
    );

    setInstitution(result.data.data);
    setCourses(courseResult.data.data);
  }, []);

  const onChangeDropdown = async (e, data) => {
    const name = data.name;
    const value = data.value;
    let courseResult;

    if (name == "selectedFaculty") {
      setSelectedFaculty(data.value);
      courseResult = await schoolCourse(
        id,
        value,
        offset,
        limit,
        selectedDegreeType
      );
    } else {
      setSelectedDegreeType(data.value);
      courseResult = await schoolCourse(
        id,
        selectedFaculty,
        offset,
        limit,
        value
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
        id,
        selectedFaculty,
        offset,
        limit,
        selectedDegreeType
      );
      setCourses(courseResult.data.data);
      setIsPreviousBtnLoading(false);
    }
  };
  const next = async () => {
    setIsNextBtnLoading(true);
    offset += limit;

    let courseResult = await schoolCourse(
      id,
      selectedFaculty,
      offset,
      limit,
      selectedDegreeType
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
    id,
    selectedFaculty,
    offset,
    limit,
    selectedDegree
  ) {
    const result = await clientService.findCourseByInstitution({
      institutionId: id,
      facultyId: selectedFaculty,
      offset,
      limit,
      degreeTypeId: selectedDegree,
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
      {hasData ? (
        <Image
          fluid
          className="img-fluid shadow-2-strong"
          style={imageStyles(200)}
          src={`${institution ? institution.banner : ""}`}
        />
      ) : (
        <Placeholder fluid>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      )}

      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={12}>
          <hr></hr>
          <Segment color="blue">
            {" "}
            {hasData ? parse(`${institution.about}`) : <Loading />}
          </Segment>
          <br />
          <br />
          <br />

          <br />
          <Divider horizontal>
            <Header as="h4">
              <Icon color="blue" name="graduation cap" />
              Courses
            </Header>
          </Divider>
          <Segment color="red">
            <Grid columns="equal">
              <Grid.Column>
                <Button size="mini" onClick={reset}>
                  <Icon name="redo alternate" /> Reset
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Dropdown
                  required
                  fluid
                  selection
                  search
                  name="selectedDegreeType"
                  label="Degree Type"
                  placeholder="Degree Type"
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
                  placeholder="Faculty"
                  options={faculties}
                  onChange={onChangeDropdown}
                />
              </Grid.Column>
            </Grid>
            {hasData ? (
              isEmpty ? (
                <Segment textAlign="center" tertiary>
                  <strong> No result found</strong>{" "}
                  <Icon size="large" name="frown outline" />
                </Segment>
              ) : (
                <>
                  <Table unstackable striped>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Course</Table.HeaderCell>
                        <Table.HeaderCell>Faculty</Table.HeaderCell>
                        <Table.HeaderCell>Fee</Table.HeaderCell>
                        <Table.HeaderCell>Degree Type</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
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
                              <button
                                as="a"
                                href="/dashboard"
                                type="button"
                                class="btn btn-primary btn-rounded"
                              >
                                <Icon name="pencil" /> Apply
                              </button>
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

export default Institution;
