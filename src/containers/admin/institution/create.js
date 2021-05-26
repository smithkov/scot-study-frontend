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
  let [hasApplied, setHasApplied] = useState(false);
  let [applications, setApplications] = useState([]);
  let [users, setUsers] = useState([]);
  let [city, setCity] = useState([]);
  let [name, setName] = useState("");
  let [id, setId] = useState("");
  let [about, setAbout] = useState("");
  let [sellingPoint, setSellingPoint] = useState("");
  let [selectedCity, setSelectedCity] = useState("");
  let [logo, setLogo] = useState("");
  let [banner, setBanner] = useState("");
  let [logoPreview, setLogoPreview] = useState("");
  let [bannerPreview, setBannerPreview] = useState("");

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

    const cityResult = await clientService.cities();

    let cityData = cityResult.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        text: item.name,
      };
    });

    setCity(cityData);
  }, []);
  const logoChangedHandler = (event) => {
    try {
      setLogo(event.target.files[0]);

      let reader = new FileReader();

      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditorChange = (e) => {
    setAbout(e.target.getContent());
  };
  const bannerChangedHandler = (event) => {
    setBanner(event.target.files[0]);

    let reader = new FileReader();

    reader.onloadend = () => {
      setBannerPreview(reader.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  };
  const onChangeDropdown = async (e, data) => {
    const name = data.name;
    const value = data.value;

    if (name == "selectedCity") {
      setSelectedCity(value);
    }
  };
  const onChange = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "name") {
      setName(value);
    } else if (name == "about") {
      setAbout(value);
    } else if (name == "sellingPoint") {
      setSellingPoint(value);
    }
  };
  const update = async (e) => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    formData.append("sellingPoint", sellingPoint);
    formData.append("id", id);
    formData.append("cityId", selectedCity);
    formData.append("banner", banner);
    formData.append("logo", logo);

    const save = await clientService.saveInstitution(formData);
    if (!save.data.error) {
      props.history.push("/institution_list");
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
                      placeholder="Institution name"
                      required
                      onChange={onChange}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>City</label>
                    <Dropdown
                      required
                      fluid
                      selection
                      search
                      name="selectedCity"
                      label="City"
                      placeholder={"City"}
                      options={city}
                      onChange={onChangeDropdown}
                    />
                  </Form.Field>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>Logo</label>
                      <input type="file" onChange={logoChangedHandler} />
                    </Form.Field>

                    <Image
                      src={logoPreview}
                      style={imageStyles(100)}
                      size="small"
                    />
                  </Form.Group>
                  <Form.Field>
                    <label>Banner </label>
                    <input type="file" onChange={bannerChangedHandler} />
                  </Form.Field>
                  <br />
                  <Image style={imageStyles(200)} src={bannerPreview} />
                  <Form.Field required>
                    <label>About</label>
                    <Editor
                      apiKey={tinyApiKey}
                      initialValue={about}
                      name="about"
                      init={{
                        plugins: "link image code",
                        toolbar:
                          "undo redo | bold italic | alignleft aligncenter alignright | code",
                      }}
                      onChange={handleEditorChange}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Selling point</label>
                    <TextArea
                      onChange={onChange}
                      name="sellingPoint"
                      placeholder="Selling point"
                      style={{ minHeight: 100 }}
                    />
                  </Form.Field>
                  <hr />

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
