import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  List,
  Image,
  Card,
  Segment,
  Icon,
  Button,
  Item,
  Grid,
} from "semantic-ui-react";
import { primaryColor, imageStyles } from "../utility/constants";
import clientService from "../services/clientService";
import Loading from "../widgets/loading";

function PopularList(props) {
  const [hasData, setHasData] = useState(false);
  const [courses, setCourses] = useState([]);
  // const [images, setImages] = useState([]);
  // let allImages = [];
  useEffect(async () => {
    const result = await clientService.popularCourses({});
    // const photosResponse = await clientService.findAllPhotos();
    // allImages = photosResponse.data.data;

    setCourses(result.data.data);
    setHasData(true);
  }, []);
  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            {!hasData ? (
              <Loading />
            ) : (
              <Item.Group>
                {courses.map((item) => {
                  return (
                    <Link to={`/course/${item.id}`}>
                      <Card raised fluid>
                        <Card.Content>
                          <Image
                            floated="right"
                            size="mini"
                            src={item.Institution.logo}
                          />
                          <h4
                            style={{
                              fontFamily: "Comic Sans MS",
                              color: "#40444B",
                            }}
                          >
                            {item.name}
                          </h4>
                          <Card.Meta>{item.Institution.City.name}</Card.Meta>
                          <Card.Description>{item.fee}</Card.Description>
                        </Card.Content>
                      </Card>
                      <hr></hr>
                    </Link>
                  );
                })}
              </Item.Group>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default PopularList;
