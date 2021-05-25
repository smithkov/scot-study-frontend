import React, { lazy } from "react";
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
  Input,
} from "semantic-ui-react";
import CIcon from "@coreui/icons-react";

import MainChartExample from "../charts/MainChartExample.js";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Profile = () => {
  return (
    <>
      {/* <WidgetsDropdown /> */}
      <CRow>
        <WidgetsDropdown title={"Home"} icon={"cil-home"} color="primary" />
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
        <WidgetsDropdown title={"Inbox"} icon={"cil-inbox"} color="success" />
      </CRow>
      <Table unstackable celled striped color="red">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="3">Application Status</Table.HeaderCell>
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
      <Button fluid positive>
        Apply
      </Button>
    </>
  );
};

export default Profile;
