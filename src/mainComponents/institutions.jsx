import React, { useState, useEffect } from "react";
import {
  Menu,
  Dropdown,
  Header,
  Button,
  Icon,
  Image,
  Item,
  Segment,
  Grid,
  Search,
  List,
} from "semantic-ui-react";

import clientService from "../services/clientService";
import { primaryColor, imageOpacityStyles } from "../utility/constants";
import PopularList from "../widgets/popularList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import Loading from "../widgets/loading";
import CourseItem from "../widgets/courseItem";
import MainMenu from "../widgets/mainMenu";
import { Link } from "react-router-dom";
import Banner from "../widgets/banner";
import Footer from "../widgets/footer";

function Institutions(props) {
  const [institutions, setInstitutions] = useState({});

  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);

  useEffect(async () => {
    const id = props.match.params.id;

    const result = await clientService.institutions();

    setInstitutions(result.data.data);
    setHasData(true);
  }, []);

  return (
    <div>
      <MainMenu />
      <Banner caption={`Institutions`} />
      <hr />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={12}>
          {hasData ? (
            <Item.Group>
              {institutions.map((item) => {
                return (
                  <Link to={`/institution/${item.id}`}>
                    <Segment raised style={{ marginBottom: 20 }} color="red">
                      <Item>
                        {/* <Item.Image size="tiny" src={item.logo} /> */}

                        <Item.Content>
                          {/* <Item.Header as="h2">{item.name}</Item.Header>
                          <Item.Meta>{item.City.name}</Item.Meta> */}
                          <Item.Description>
                            <div className="bg-image hover-zoom">
                              <Image
                                style={imageOpacityStyles(200)}
                                className="img-fluid hover-shadow"
                                src={`/banners/${item.banner}`}
                              />
                              <div className="mask">
                                <div
                                  style={{ textAlign: "center" }}
                                  overlay="teal-light"
                                  className="d-flex justify-content-center align-items-center h-100"
                                >
                                  <p
                                    style={{
                                      backgroundColor: "black",
                                      opacity: 0.7,
                                      marginLeft: 20,
                                      marginRight: 20,
                                      fontFamily: "Comic Sans MS",
                                    }}
                                    className="text-white mb-0"
                                  >
                                    <h2>{item.name}</h2>
                                    {item.sellingPoint}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    </Segment>
                  </Link>
                );
              })}
            </Item.Group>
          ) : (
            <Loading />
          )}
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
      <Footer />
    </div>
  );
}

export default Institutions;
