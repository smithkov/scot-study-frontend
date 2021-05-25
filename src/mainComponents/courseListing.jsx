import React, { useState, useEffect } from "react";
import {
  Menu,
  Dropdown,
  Header,
  Button,
  Icon,
  Image,
  Input,
  Segment,
  Grid,
  Search,
  Table,
  List,
} from "semantic-ui-react";
import TextLogo from "../widgets/textLogo";
import Loading from "../widgets/loading";
import NoTableData from "../widgets/noTableData";
import clientService from "../services/clientService";
import { primaryColor, imageStyles } from "../utility/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../widgets/footer";
import Banner from "../widgets/banner";

import CourseItem from "../widgets/courseItem";
import PopularList from "../widgets/popularList";
import MainMenu from "../widgets/mainMenu";
let offset = 1;
let limit = 10;
let totalLoad = limit;
function CourseListing(props) {
  let [isDisableNextButton, setIsDisableNextButton] = useState(false);

  let [isDisablePreviousButton, setIsDisablePreviousButton] = useState(false);
  const [courses, setCourses] = useState([]);
  const [images, setImages] = useState([]);
  let [institutions, setInstitutions] = useState([]);
  let [selectedInstitution, setSelectedInstitution] = useState("");
  let [degreeTypes, setDegreeTypes] = useState([]);
  let [isEmpty, setIsEmpty] = useState(false);
  let [selectedDegreeType, setSelectedDegreeType] = useState("");
  const [facultyName, setFacultyName] = useState("");
  let [isPreviousBtnLoading, setIsPreviousBtnLoading] = useState(false);
  let [isNextBtnLoading, setIsNextBtnLoading] = useState(false);
  let [search, setSearch] = useState("");

  const [hasData, setHasData] = useState(false);
  const facultyId = props.match.params.facultyId;
  useEffect(async () => {
    const result = await schoolCourse(
      offset,
      limit,
      selectedDegreeType,
      selectedInstitution,
      search
    );
    const courseData = result.data.data;

    setCourses(courseData);
    setFacultyName(courseData[0].Faculty.name);

    const photosResponse = await clientService.findFacultyPhotos({ facultyId });

    const photos = photosResponse.data.data;

    setImages(photos);

    setHasData(true);

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
  }, []);
  const onChangeDropdown = async (e, data) => {
    const name = data.name;
    const value = data.value;
    let courseResult;

    if (name == "selectedDegreeType") {
      setSelectedDegreeType(value);
      courseResult = await schoolCourse(
        offset,
        limit,
        value,
        selectedInstitution,
        search
      );
    } else if (name == "selectedInstitution") {
      setSelectedInstitution(value);
      courseResult = await schoolCourse(
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

  async function schoolCourse(
    offset,
    limit,
    selectedDegree,
    selectedInstitution,
    search
  ) {
    //const result = await clientService.courseByParams({ facultyId });
    // const courseData = result.data.data;
    // setCourses(courseData);

    const result = await clientService.courseByParams({
      facultyId,
      institutionId: selectedInstitution,
      offset,
      limit,
      degreeTypeId: selectedDegreeType,
      search: search,
    });
    const photosResponse = await clientService.findFacultyPhotos({ facultyId });

    const photos = photosResponse.data.data;

    setImages(photos);
    totalLoad = result.data.data;
    setIsEmpty(totalLoad.length > 0 ? false : true);
    canDisableNext(totalLoad.length);
    setHasData(true);
    canDisablePrevious();
    return result;
  }

  const previous = async () => {
    canDisablePrevious();
    if (offset >= 1) {
      window.scrollTo(500, 0);
      setIsPreviousBtnLoading(true);
      offset -= limit;
      let courseResult = await schoolCourse(
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
    window.scrollTo(500, 0);
    let courseResult = await schoolCourse(
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
  const onChange = async (e) => {
    const value = e.target.value;
    const courseResult = await schoolCourse(
      offset,
      limit,
      selectedDegreeType,
      selectedInstitution,
      value
    );
    setSearch(value);
    setCourses(courseResult.data.data);
  };
  return (
    <>
      <MainMenu />
      <Banner caption={` ${facultyName} Courses`} />

      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={12}>
          <Segment style={{ marginTop: 10 }}>
            <Grid stackable padded columns="equal">
              <Grid.Column width="2">
                <Button fluid size="mini" onClick={reset}>
                  <Icon name="redo alternate" /> Reset
                </Button>
              </Grid.Column>
              <Grid.Column>
                {" "}
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
            </Grid>
          </Segment>

          {!hasData ? (
            <Loading />
          ) : isEmpty ? (
            <NoTableData />
          ) : (
            <>
              <hr />
              <Grid columns={3} stackable padded>
                {courses.map((item) => {
                  let rand = Math.floor(Math.random() * 6 + 0);

                  return (
                    <Grid.Column style={{ paddingBottom: 20 }}>
                      <CourseItem item={item} banner={images[rand].path} />
                    </Grid.Column>
                  );
                })}
              </Grid>
            </>
          )}
          <Table>
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
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
      <Footer />
    </>
  );
}

export default CourseListing;
