import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../index";
import clientService from "../../services/clientService";
import Moment from "react-moment";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";
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
} from "semantic-ui-react";
const WidgetsDropdown = lazy(() =>
  import("../../views/widgets/WidgetsDropdown.js")
);

const Dashboard = (props) => {
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [userId, setUserId] = useState("");
  let [hasApplied, setHasApplied] = useState(false);
  let [applications, setApplications] = useState([]);
  let [users, setUsers] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(async () => {
    const getUser = await asyncLocalStorage.getUser();
    const userId = getUser.id;
    setUserId(userId);

    const findApplications = await clientService.allApplications();
    setApplications(findApplications.data.data);

    setHasApplied(findApplications.data.data.length > 0 ? true : false);

    const allUsers = await clientService.allUsers();

    setUsers(allUsers.data.data);
  }, []);

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
              <>
                {/* <WidgetsDropdown /> */}
                <CRow>
                  <WidgetsDropdown
                    title={"Home"}
                    icon={"cil-home"}
                    color="primary"
                  />
                  <WidgetsDropdown
                    title={"Settings"}
                    icon={"cil-settings"}
                    color="success"
                  />
                  <WidgetsDropdown
                    title={"Compose Message"}
                    icon={"cil-envelope-open"}
                    color="primary"
                  />
                  <WidgetsDropdown
                    title={"Inbox"}
                    icon={"cil-inbox"}
                    color="success"
                  />
                </CRow>
                <Segment textAlign="center" color="blue">
                  <h3>Applications</h3>
                </Segment>
                <Table singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>No.</Table.HeaderCell>
                      <Table.HeaderCell>Full Name</Table.HeaderCell>
                      <Table.HeaderCell>Date of Submission</Table.HeaderCell>
                      <Table.HeaderCell>Degree Type</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {applications.map((item) => {
                      return (
                        <Table.Row>
                          <Table.Cell>
                            <h4>{item.refNo}</h4>
                          </Table.Cell>
                          <Table.Cell>
                            <h4>{`${item.User.firstname}  ${item.User.lastname}`}</h4>
                          </Table.Cell>
                          <Table.Cell>
                            <Moment format="DD/MM/YYYY HH:mm">
                              <h4>{item.createdAt}</h4>
                            </Moment>
                          </Table.Cell>
                          <Table.Cell>
                            <h4>{item.DegreeType.name}</h4>
                          </Table.Cell>
                          <Table.Cell>
                            <Button color="blue" size="small">
                              View application
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>

                <hr></hr>
                <Segment textAlign="center" color="blue">
                  <h3>Users</h3>
                </Segment>
                <Table singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Full Name</Table.HeaderCell>
                      <Table.HeaderCell>Date of Registration</Table.HeaderCell>
                      <Table.HeaderCell>Country of Residence</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {users.map((item) => {
                      return (
                        <Table.Row>
                          <Table.Cell>
                            <h4>{item.email}</h4>
                          </Table.Cell>
                          <Table.Cell>
                            <h4>{`${item.firstname}  ${item.lastname}`}</h4>
                          </Table.Cell>
                          <Table.Cell>
                            <Moment format="DD/MM/YYYY HH:mm">
                              <h4>{item.createdAt}</h4>
                            </Moment>
                          </Table.Cell>
                          <Table.Cell>
                            {item.County ? (
                              <h4>
                                <Flag name={item.County.code} />
                                {item.County.name}
                              </h4>
                            ) : (
                              "Not available"
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            {/* <Button color="blue" size="small">
                              View application
                            </Button> */}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
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

export default Dashboard;
