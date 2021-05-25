import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../../index";
import clientService from "../../../services/clientService";
import Moment from "react-moment";
import { imageStyles } from "../../../utility/constants";
import { asyncLocalStorage, TOKEN, USER } from "../../../utility/global";
import Loading from "../../../widgets/loading";
import NoTableData from "../../../widgets/noTableData";

import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

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
  Flag,
  Input,
  TextArea,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
const WidgetsDropdown = lazy(() =>
  import("../../../views/widgets/WidgetsDropdown.js")
);
let offset = 1;
let limit = 10;

const CourseList = (props) => {
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [hasData, setHasData] = useState(false);

  let [userId, setUserId] = useState("");

  let [courses, setCourses] = useState([]);
  let [isDisablePrev, setIsDisablePrev] = useState(true);
  let [isDisableNext, setIsDisableNext] = useState(false);
  let [hasMore, setHasMore] = useState(true);
  let [showModal, setShowModal] = useState(false);
  let [delName, setDelName] = useState("");
  let [hasResult, setHasResult] = useState(true);

  let [id, setId] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(async () => {
    const getUser = await asyncLocalStorage.getUser();
    const userId = getUser.id;
    setUserId(userId);

    const courseResult = await apiCall(offset, search);
    setCourses(courseResult.data.data);
    setHasData(true);
  }, []);
  const apiCall = async (offset, search) => {
    const result = await clientService.allCoursesSearch({
      institutionId: "",
      offset: offset,
      facultyId: "",
      degreeTypeId: "",
      limit: limit,
      search: search,
    });
    if (result.data.data.length > 0) {
      setHasResult(true);
    } else {
      setHasResult(false);
    }
    return result;
  };
  const modalHandler = (item) => {
    setId(item.id);
    setDelName(item.name);
    setShowModal(true);
  };
  const next = async () => {
    if (!isDisableNext) {
      setIsDisablePrev(false);
      offset += limit;

      const searchResult = await apiCall(offset, search);
      const courseData = searchResult.data.data;

      const isMore = courseData.length < limit ? false : true;
      setHasMore(isMore);
      setIsDisableNext(!isMore);
      setCourses(courseData);
    }
  };
  const deleteHandler = async () => {
    const deleteData = await clientService.deleteCourse(id);

    if (!deleteData.data.error) {
      let course = courses.filter((item) => item.id != id);
      setCourses(course);
      setShowModal(false);
    }
  };
  const previous = async () => {
    if (!isDisablePrev) {
      setIsDisableNext(false);
      offset -= limit;

      const searchResult = await apiCall(offset, search);
      const courseData = searchResult.data.data;

      const isMore = courseData.length < limit ? false : true;
      if (offset < limit) {
        setIsDisablePrev(true);
      }
      setCourses(courseData);
    }
  };
  const searchHandler = async (e) => {
    const value = e.target.value;
    setSearch(value);
    const searchResult = await apiCall(offset, value);

    setCourses(searchResult.data.data);
  };
  return (
    <div className="c-app c-default-layout">
      <AdminSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          {/* <TheContent /> */}
          <br />
          <Grid columns="equal">
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={14}>
              <CModal
                show={showModal}
                onClose={() => setShowModal(false)}
                size="sm"
              >
                <CModalHeader closeButton>
                  <CModalTitle>Deletion prompt</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  Are you sure you want to delete <strong>{delName}</strong> ?
                </CModalBody>
                <CModalFooter>
                  <CButton color="danger" onClick={deleteHandler}>
                    Yes
                  </CButton>{" "}
                  <CButton
                    color="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </CButton>
                </CModalFooter>
              </CModal>

              <>
                <CCard accentColor="primary">
                  <CCardHeader>
                    <h4>Course List</h4>
                  </CCardHeader>
                  <CCardBody>
                    {hasData ? (
                      <>
                        <Input
                          onChange={searchHandler}
                          placeholder="Search course"
                          type="text"
                          value={search}
                          name="search"
                        />
                        {hasResult ? (
                          <>
                            <Table fixed unstackable singleLine>
                              <Table.Header>
                                <Table.Row>
                                  <Table.HeaderCell width="6">
                                    Name
                                  </Table.HeaderCell>
                                  <Table.HeaderCell>Fee</Table.HeaderCell>
                                  <Table.HeaderCell>Intake</Table.HeaderCell>
                                  <Table.HeaderCell width="2">
                                    Duration
                                  </Table.HeaderCell>
                                  <Table.HeaderCell width="1"></Table.HeaderCell>
                                  <Table.HeaderCell width="1"></Table.HeaderCell>
                                </Table.Row>
                              </Table.Header>

                              <Table.Body>
                                {courses.map((item) => {
                                  return (
                                    <Table.Row>
                                      <Table.Cell collapsing={false} width="6">
                                        {item.name}
                                      </Table.Cell>
                                      <Table.Cell>{item.fee}</Table.Cell>
                                      <Table.Cell>{item.intake}</Table.Cell>
                                      <Table.Cell>{item.duration}</Table.Cell>
                                      <Table.Cell>
                                        <Link to={`/course_update/${item.id}`}>
                                          <Icon color="blue" name="edit" />
                                        </Link>
                                      </Table.Cell>
                                      <Table.Cell>
                                        <Link
                                          onClick={() => modalHandler(item)}
                                        >
                                          <Icon color="red" name="trash" />
                                        </Link>
                                      </Table.Cell>
                                    </Table.Row>
                                  );
                                })}
                              </Table.Body>
                            </Table>
                            <hr></hr>
                            <Button
                              size="tiny"
                              onClick={previous}
                              disabled={isDisablePrev}
                              icon
                              labelPosition="left"
                              color="blue"
                            >
                              {" "}
                              <Icon name="left arrow" /> Prev
                            </Button>{" "}
                            <Button
                              size="tiny"
                              onClick={next}
                              disabled={isDisableNext}
                              icon
                              labelPosition="right"
                              floated="right"
                              color="blue"
                            >
                              Next <Icon name="right arrow" />
                            </Button>
                          </>
                        ) : (
                          <NoTableData />
                        )}
                      </>
                    ) : (
                      <Loading />
                    )}
                  </CCardBody>
                </CCard>

                <br />
                <br />
              </>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default CourseList;
