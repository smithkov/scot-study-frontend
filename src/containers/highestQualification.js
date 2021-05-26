import React, { useState, useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import clientService from "../services/clientService";
import { asyncLocalStorage, TOKEN, USER } from "../utility/global";
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

const Qualification = (props) => {
  let [selectedQualification, setSelectedQualification] = useState("");
  let [qualification, setQualification] = useState([]);
  let [hq_completed, setHq_completed] = useState("");
  let [id, setId] = useState("");
  let [userId, setUserId] = useState("");
  let [hq_grade, setHq_grade] = useState("");
  let [hq_schoolName, setHq_schoolName] = useState("");
  let [selectedProgrammeYear, setSelectedProgrammeYear] = useState("");
  let [programmeYear, setProgrammeYear] = useState([]);

  useEffect(async () => {
    const getUser = await asyncLocalStorage.getUser();
    const userId = getUser.id;
    setUserId(userId);

    const qualificationResult = await clientService.qualificationTypes();

    let qualificationTypeData = qualificationResult.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        text: item.name,
      };
    });

    setQualification(qualificationTypeData);

    let yearData = years().map((item) => {
      return {
        key: item,
        value: item,
        text: item,
      };
    });

    setProgrammeYear(yearData);
  }, []);

  return (
    <Grid>
      <Grid.Column width={16}>
        <Divider horizontal>Highest Qualification</Divider>

        <Form onSubmit={props.save}>
          <Form.Field required>
            <label>School Name </label>
            <input
              required
              onChange={props.onChange}
              value={props.schoolName}
              name="hq_schoolName"
              type="text"
              placeholder="School name"
            />
          </Form.Field>
          <Form.Field required>
            <label>Grade</label>
            <input
              value={props.grade}
              onChange={props.onChange}
              name="hq_grade"
              placeholder="Grade"
            />
          </Form.Field>

          <Form.Field required>
            <label>Has completed</label>
            <Dropdown
              selection
              onChange={props.onChangeDropdown}
              name="hq_completed"
              options={[
                { key: 1, text: "Yes", value: "Yes" },
                { key: 2, text: "No", value: "No" },
              ]}
              placeholder={
                props.hasCompleted ? props.hasCompleted : "Choose an option"
              }
            />
          </Form.Field>

          <Form.Field required>
            <label>Programme year</label>
            <Dropdown
              required
              fluid
              selection
              search
              name="selectedProgrammeYear"
              label="Programme year"
              placeholder={
                props.programmeYear ? props.programmeYear : "Select Year"
              }
              options={programmeYear}
              onChange={props.onChangeDropdown}
            />
          </Form.Field>
          <Form.Field required>
            <label>Qualification</label>
            <Dropdown
              required
              fluid
              selection
              search
              name="selectedQualification"
              label={"Qualification"}
              placeholder={
                props.qualification ? props.qualification : "Qualification"
              }
              options={qualification}
              onChange={props.onChangeDropdown}
            />
          </Form.Field>
          <Button
            loading={props.loading}
            //onClick={save}
            color="blue"
            type="submit"
          >
            Save
          </Button>
        </Form>
        <br />

        <br />
        <br />
        {/* previous qualification form below */}
      </Grid.Column>
    </Grid>
  );
};

export default Qualification;
