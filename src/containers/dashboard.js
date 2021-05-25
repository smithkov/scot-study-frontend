import React, { useState, useEffect, lazy } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import clientService from "../services/clientService";

import { asyncLocalStorage, TOKEN, USER } from "../utility/global";
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
} from "semantic-ui-react";
const WidgetsDropdown = lazy(() =>
  import("../views/widgets/WidgetsDropdown.js")
);

const Dashboard = (props) => {
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [userId, setUserId] = useState("");
  let [hasApplied, setHasApplied] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(async () => {
    const getUser = await asyncLocalStorage.getUser();
    const userId = getUser.id;
    setUserId(userId);

    const findApplications = await clientService.findApplicationsByUser({
      userId,
    });

    setHasApplied(findApplications.data.data.length > 0 ? true : false);
  }, []);

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
                <Table unstackable celled striped color="red">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell colSpan="3">
                        Application Status
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell collapsing>
                        <Header as="h4">Form Submission</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <strong>Successful</strong>
                      </Table.Cell>
                      <Table.Cell collapsing textAlign="right">
                        <Icon color="green" name="checkmark" size="large" />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>
                        <Header as="h4">Eligibilty Check</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <strong>Unsuccessful</strong>
                      </Table.Cell>
                      <Table.Cell collapsing textAlign="right">
                        <Icon color="red" name="close" size="large" />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>
                        <Header as="h4">Requirements Provision</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <strong>Pending</strong>
                      </Table.Cell>
                      <Table.Cell collapsing textAlign="right">
                        <Icon loading color="grey" name="sync" size="large" />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>
                        <Header as="h4">Application Submission</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <strong>Successful</strong>
                      </Table.Cell>
                      <Table.Cell collapsing textAlign="right">
                        <Icon color="green" name="checkmark" size="large" />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Button as="a" href="/application" fluid positive>
                  Apply
                </Button>
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
