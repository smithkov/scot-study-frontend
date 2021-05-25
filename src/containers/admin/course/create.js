import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../../index";
import clientService from "../../../services/clientService";
import Moment from "react-moment";
import { imageStyles, tinyApiKey } from "../../../utility/constants";
import { asyncLocalStorage, TOKEN, USER } from "../../../utility/global";
import { Editor } from "@tinymce/tinymce-react";
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
  Checkbox,
  Grid,
  Form,
  Placeholder,
  Divider,
  List,
  Message,
  Flag,
  TextArea,
} from "semantic-ui-react";
const WidgetsDropdown = lazy(() =>
  import("../../../views/widgets/WidgetsDropdown.js")
);

const InstitutionForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [userId, setUserId] = useState("");

  let [institutions, setInstitutions] = useState([]);
  let [faculties, setFaculties] = useState([]);
  let [degreeTypes, setDegreeTypes] = useState([]);

  let [selectedInstitution, setSelectedInstitution] = useState("");
  let [selectedFaculty, setSelectedFaculty] = useState("");
  let [selectedDegreeType, setSelectedDegreeType] = useState("");

  let [users, setUsers] = useState([]);
  let [name, setName] = useState("");
  let [id, setId] = useState("");
  let [fee, setFee] = useState("");
  let [scholarshipAmount, setScholarshipAmount] = useState("");

  let [isPopular, setIsPopular] = useState(false);
  let [intake, setIntake] = useState("");
  let [duration, setDuration] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(async () => {
    const getUser = await asyncLocalStorage.getUser();
    const userId = getUser.id;
    setUserId(userId);

    const degreeTypeResult = await clientService.degreeTypes();
    let degreeTypeData = degreeTypeResult.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        text: item.name,
      };
    });
    setDegreeTypes(degreeTypeData);

    const institutionResult = await clientService.allInstitutions();
    let institutionData = institutionResult.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        text: item.name,
      };
    });
    setInstitutions(institutionData);

    const facultyResult = await clientService.faculties();
    let facultyData = facultyResult.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        text: item.name,
      };
    });
    setFaculties(facultyData);
  }, []);
  const toggle = () => {
    setIsPopular(!isPopular);
  };
  const onChangeDropdown = async (e, data) => {
    const name = data.name;
    const value = data.value;

    if (name == "selectedInstitution") {
      setSelectedInstitution(value);
    } else if (name == "selectedFaculty") {
      setSelectedFaculty(value);
    } else if (name == "selectedDegreeType") {
      setSelectedDegreeType(value);
    }
  };
  const onChange = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "name") {
      setName(value);
    } else if (name == "fee") {
      setFee(value);
    } else if (name == "scholarshipAmount") {
      setScholarshipAmount(value);
    } else if (name == "intake") {
      setIntake(value);
    } else if (name == "duration") {
      setDuration(value);
    }
  };
  const update = async (e) => {
    const save = await clientService.saveCourse({
      name: name,
      duration: duration,
      intake: intake,
      fee: fee,
      scholarshipAmount: scholarshipAmount,
      institutionId: selectedInstitution,
      facultyId: selectedFaculty,
      degreeTypeId: selectedDegreeType,
      isPopular: isPopular,
    });
    if (!save.data.error) {
      props.history.push("/course_list");
    } else {
      setIsShowMessage(true);
      setErrorMessage("Could not be saved");
    }
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
              <>
                <Form onSubmit={update}>
                  <Form.Field required>
                    <label>Name </label>
                    <input
                      name="name"
                      value={name}
                      placeholder="Course name"
                      required
                      onChange={onChange}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Institution</label>
                    <Dropdown
                      required
                      fluid
                      selection
                      search
                      name="selectedInstitution"
                      label="Institution"
                      placeholder={"Institution"}
                      options={institutions}
                      onChange={onChangeDropdown}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Faculty</label>
                    <Dropdown
                      required
                      fluid
                      selection
                      search
                      name="selectedFaculty"
                      label="Faculty"
                      placeholder={"Faculty"}
                      options={faculties}
                      onChange={onChangeDropdown}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>DegreeType</label>
                    <Dropdown
                      required
                      fluid
                      selection
                      search
                      name="selectedDegreeType"
                      label="DegreeType"
                      placeholder={"DegreeType"}
                      options={degreeTypes}
                      onChange={onChangeDropdown}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Tuition fee </label>
                    <input
                      name="fee"
                      value={fee}
                      placeholder="Tuition fee"
                      required
                      onChange={onChange}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Scholarship amount </label>
                    <input
                      name="scholarshipAmount"
                      placeholder="Scholarship amount"
                      required
                      onChange={onChange}
                    />
                  </Form.Field>

                  <Form.Field required>
                    <label>Intake </label>
                    <input
                      name="intake"
                      placeholder="Intake"
                      required
                      onChange={onChange}
                    />
                  </Form.Field>

                  <Form.Field required>
                    <label>Duration </label>
                    <input
                      name="duration"
                      placeholder="Duration"
                      required
                      onChange={onChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      label="'Check' if popular"
                      checked={isPopular}
                      onChange={toggle}
                    />
                  </Form.Field>
                  <br />

                  <Button loading={loading} color="blue" type="submit">
                    Save
                  </Button>
                  <br />
                  <br />
                </Form>
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

export default InstitutionForm;
