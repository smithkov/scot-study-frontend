import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import {
  Menu,
  Dropdown,
  Card,
  Button,
  Icon,
  Image,
  Item,
  Input,
  Segment,
  Grid,
  Message,
  List,
} from "semantic-ui-react";
import TextLogo from "../widgets/textLogo";
import RelatedCourse from "../widgets/relatedCourse";

import clientService from "../services/clientService";
import { primaryColor, imageStyles } from "../utility/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../widgets/footer";

import Loading from "../widgets/loading";
import MainMenu from "../widgets/mainMenu";
import PopularList from "../widgets/popularList";
import Banner from "../widgets/banner";

function CourseDetail(props) {
  const [course, setCourse] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [images, setImages] = useState([]);
  const [hasData, setHasData] = useState(false);

  const rand = Math.floor(Math.random() * 6 + 0);
  const courseId = props.match.params.id;
  useEffect(async () => {
    const result = await clientService.findCourseById(courseId);
    const courseResponse = result.data.data;

    const relatedCourseResponse = await clientService.relatedCourses({
      facultyId: courseResponse.facultyId,
      institutionId: courseResponse.institutionId,
    });
    const related = relatedCourseResponse.data.data;
    setRelatedCourses(related);

    const photosResponse = await clientService.findFacultyPhotos({
      facultyId: courseResponse.Faculty.id,
    });
    const photos = photosResponse.data.data;

    // alert(JSON.stringify(photos));
    setCourse(courseResponse);
    setImages(photosResponse.data.data);
    setHasData(true);
  }, [courseId]);

  return (
    <div>
      <MainMenu />
      <Banner caption={course.name} />
      <hr />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={4}>
          {course.scholarshipAmount ? (
            <Message color="red" icon>
              <Icon color="red" name="certificate notched" />
              <Message.Content>
                <Message.Header>Scholarship Offer</Message.Header>
                <hr></hr>
                <strong> £{course.scholarshipAmount}</strong> Discount
              </Message.Content>
            </Message>
          ) : (
            ""
          )}
          <h3>Related courses</h3>
          <hr></hr>
          <Item.Group>
            {relatedCourses.map((item) => {
              return <RelatedCourse item={item} />;
            })}
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={10}>
          {hasData ? (
            <>
              <Image
                bordered
                rounded
                fluid
                src={images[rand].path}
                style={imageStyles(200)}
              />
              <hr></hr>
              <Menu>
                <Menu.Item
                  name="editorials"
                  content={
                    <a>
                      <Icon name="money" />
                      {course.fee}
                    </a>
                  }
                />

                <Menu.Item
                  name="reviews"
                  content={
                    <a>
                      <Icon name="time" />
                      {course.duration}
                    </a>
                  }
                />

                <Menu.Item
                  name="upcomingEvents"
                  content={
                    <a>
                      <Icon name="graduation cap" />
                      {course.DegreeType ? course.DegreeType.name : ""}
                    </a>
                  }
                />

                <Menu.Item
                  name="upcomingEvents"
                  content={
                    <Button fluid color="blue">
                      <Icon name="pencil" /> Apply online
                    </Button>
                  }
                />
              </Menu>

              <h2>{course.name}</h2>
              <Card fluid color="red">
                <Card.Content>
                  <Card.Header>
                    <Image circular src={course.Institution.logo} size="mini" />{" "}
                    {course.Institution.name}
                  </Card.Header>
                </Card.Content>
              </Card>

              <hr />
              <div> {parse(`${course.DegreeType.requirements}`)}</div>
            </>
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

export default CourseDetail;
