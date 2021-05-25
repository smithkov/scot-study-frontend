import React, { useState, useEffect } from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from "mdb-react-ui-kit";
import {
  Menu,
  Dropdown,
  Header,
  Button,
  Icon,
  Image,
  Embed,
  Segment,
  Grid,
  Search,
  Card,
  Item,
} from "semantic-ui-react";
import TextLogo from "../widgets/textLogo";
import Footer from "../widgets/footer";
import MainMenu from "../widgets/mainMenu";
import clientService from "../services/clientService";
import { primaryColor, imageStyles } from "../utility/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../widgets/loading";
import { Link, Redirect } from "react-router-dom";
import Institution from "./institution";
const color = "blue";
let counter = 0;
function Index() {
  const [faculties, setFaculties] = useState([]);

  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [hasFaculty, setHasFaculty] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [autoComplete, setAutoComplete] = useState([]);
  useEffect(async () => {
    const result = await clientService.faculties();
    const institutionResponse = await clientService.institutionsLighter();
    setFaculties(result.data.data);

    setInstitutions(institutionResponse.data.data);
    setHasData(true);
  }, []);

  useEffect(async () => {
    const result = await clientService.faculties();
    setFaculties(result.data.data);
    setHasFaculty(true);
  }, [hasFaculty]);

  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleSearchChange = async (e, data) => {
    setAutoComplete([]);
    const autoCompleteResponse = await clientService.searchCourse({
      search: data.value,
    });

    setLoading(false);
    setAutoComplete(autoCompleteResponse.data.data);
  };
  const searchSelect = async (e, data) => {
    //const search = data.result.title;
    //const searchResponse = await clientService.listingSearch({ search });
    // this.setState({
    //   title: searchResponse.data.desc,
    //   stores: searchResponse.data.data,
    // });
  };

  const facultyLogo = (name, imagePath, id) => {
    return (
      <Link to={`/courses/${id}`}>
        <Card color={color} fluid>
          <div className="bg-image hover-zoom">
            <Image
              className="bg-image hover-zoom"
              src={imagePath}
              style={imageStyles(200)}
            />
          </div>
          <Card.Content>
            <Card.Description>{name}</Card.Description>
          </Card.Content>
        </Card>
      </Link>
    );
  };

  return (
    <div>
      <MainMenu />
      <Image
        style={imageStyles(500)}
        className="img-fluid shadow-2-strong mask"
        src="/images/banner.jpg"
      />
      <hr />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={12}>
          <Segment inverted color={color}>
            <Grid stackable>
              <Grid.Column width={5}></Grid.Column>
              <Grid.Column width={6}>
                <Segment inverted color={color}>
                  <Search
                    showNoResults
                    placeholder="Quick course search"
                    name="search"
                    input={{ fluid: true }}
                    loading={loading}
                    onResultSelect={null}
                    results={autoComplete.map((item) => {
                      const { Institution, name, fee } = item;
                      const img = (
                        <Image
                          size="mini"
                          avatar
                          src={Institution ? `${Institution.logo}` : ""}
                        />
                      );

                      return {
                        title: name,
                        image: img,
                        description: fee,
                      };
                    })}
                    onSearchChange={handleSearchChange}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={5}></Grid.Column>
            </Grid>
            <Header style={{ textAlign: "center" }} as="h1">
              SEAMLESS PROCESS
            </Header>
            <hr />
            <Grid relaxed columns={6}>
              <Grid.Column>
                <TextLogo name={"search.png"} text={"Search course"} />
              </Grid.Column>
              <Grid.Column>
                <TextLogo
                  name={"register.png"}
                  text={"Create account & apply"}
                />
              </Grid.Column>
              <Grid.Column>
                <TextLogo
                  name={"binocular.png"}
                  text={"Monitor your application"}
                />
              </Grid.Column>
              <Grid.Column>
                <TextLogo
                  name={"visa.png"}
                  text={"Visa counselling & application"}
                />
              </Grid.Column>
              <Grid.Column>
                <TextLogo name={"departure.png"} text={"Pre-departure"} />
              </Grid.Column>
              <Grid.Column>
                <TextLogo name={"enrolment.png"} text={"Enrolment"} />
              </Grid.Column>
            </Grid>
          </Segment>
          <hr></hr>
          <h2 style={{ textAlign: "center" }}>Popular Search Faculties</h2>

          {!hasFaculty ? (
            <Loading />
          ) : (
            <Grid columns={4} stackable>
              {faculties.map((faculty) => {
                let rand = Math.floor(Math.random() * +1);

                return (
                  <Grid.Column style={{ paddingBottom: 20 }}>
                    {facultyLogo(
                      faculty.name,
                      faculty.FacultyPhotos[rand].path,
                      faculty.id
                    )}
                  </Grid.Column>
                );
              })}
            </Grid>
          )}
          <Item.Group divided>
            <Item
              style={{
                backgroundColor: "silver",
                paddingTop: 10,
                paddingRight: 10,
              }}
            >
              <Item.Image src="/images/phd.png" />

              <Item.Content>
                <div> </div>

                <Item.Description>
                  <h1 style={{ verticalAlign: "middle" }}>
                    Apply For PhD/DBA/PHIL
                  </h1>
                </Item.Description>
                <Item.Extra>
                  <Button primary floated="right">
                    Apply now
                    <Icon name="right chevron" />
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>

          <hr></hr>
          <Grid columns={4} stackable>
            {institutions.map((item) => {
              // let rand = Math.floor(Math.random() * 6 + 0);

              return (
                <Grid.Column style={{ paddingBottom: 20 }}>
                  <div className="card bg-dark text-white bg-image hover-zoom">
                    <img
                      src={`/banners/${item.banner}`}
                      className="card-img  shadow-2-strong"
                      style={imageStyles(200)}
                    />
                    <div
                      class="card-img-overlay mask"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                    >
                      <h5 style={{ textAlign: "center" }} class="card-title">
                        {" "}
                        {item.name}
                      </h5>
                    </div>
                  </div>
                </Grid.Column>
              );
            })}
          </Grid>
          {/* <MDBCarousel showIndicators showControls fade>
            <MDBCarouselInner>
              {institutions.map((item, index) => {
                return (
                  <Link to={`/institution/${item.id}`}>
                    <MDBCarouselItem itemId={index}>
                      <MDBCarouselElement
                        style={imageStyles(300)}
                        src={`/banners/${item.banner}`}
                        alt="..."
                      />
                      <MDBCarouselCaption
                        style={{
                          backgroundColor: "black",
                          opacity: 0.8,
                          padding: 20,
                        }}
                      >
                        <h2>
                          <Image
                            style={imageStyles(80, 80, "contain")}
                            size="small"
                            src={item.logo}
                          />
                          {item.name}
                        </h2>
                        <h4>{item.sellingPoint}</h4>
                      </MDBCarouselCaption>
                    </MDBCarouselItem>
                  </Link>
                );
              })}
            </MDBCarouselInner>
          </MDBCarousel> */}
          <hr></hr>
          <Segment>
            <h1 style={{ textAlign: "center" }}>Testimonials</h1>
            <Grid stackable columns="equal">
              <Grid.Column>
                <Embed
                  id="Tlyz-FOoOL0"
                  placeholder="/images/video_thumbnail_1.png"
                  source="youtube"
                />
              </Grid.Column>
              <Grid.Column>
                <Embed
                  id="OLTBbhdGi-w"
                  placeholder="/images/video_thumbnail_2.png"
                  source="youtube"
                />
              </Grid.Column>
              <Grid.Column>
                <Embed
                  id="dYqEDeP4LYc"
                  placeholder="/images/video_thumbnail_3.png"
                  source="youtube"
                />
              </Grid.Column>
              <Grid.Column>
                <Embed
                  id="LGBxYJsb5-g"
                  placeholder="/images/video_thumbnail_4.png"
                  source="youtube"
                />
              </Grid.Column>
            </Grid>
          </Segment>
          <hr />
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>

      <Footer />
    </div>
  );
}

export default Index;
