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
import Loading from "./loading";

function RelatedCourse(props) {
  const { id, Institution, name, fee } = props.item;
  return (
    <>
      <Link to={`/course/${id}`}>
        <Card raised fluid>
          <Card.Content>
            <Image floated="right" size="mini" src={Institution.logo} />
            <h4
              style={{
                fontFamily: "Comic Sans MS",
                color: "#40444B",
              }}
            >
              {name}
            </h4>
            <Card.Meta>{Institution.City.name}</Card.Meta>
            <Card.Description>{fee}</Card.Description>
          </Card.Content>
        </Card>
        <hr></hr>
      </Link>
    </>
  );
}

export default RelatedCourse;
