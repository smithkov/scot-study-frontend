import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, Image, Card, Segment, Icon, Button } from "semantic-ui-react";
import { primaryColor, imageStyles } from "../utility/constants";

function CourseItem(props) {
  const { logo, name, Institution, fee, intake, Faculty, id } = props.item;

  return (
    <>
      {/* <Card color="red" fluid>
        <Image src={props.banner} style={imageStyles(60)} />
        <Card.Content>
          <Card.Description>{name}</Card.Description>
        </Card.Content>
      </Card> */}
      <Card raised color="red" fluid>
        <Card.Content>
          <Image
            circular
            style={imageStyles(50, 50, "scale-down")}
            floated="right"
            size="mini"
            src={Institution.logo}
          />
          <h4
            style={{
              height: 60,
              fontSize: 18,
              color: "#40444B",
            }}
          >
            {name}
          </h4>
          <Image style={imageStyles(100)} src={props.banner} />
          <h5>
            {" "}
            <Link to={`/institution/${Institution.id}`}>
              {" "}
              <strong>{Institution.name} </strong>
            </Link>
          </h5>
          <Card.Meta>{Institution.City.name}</Card.Meta>
          <Card.Description>
            <a>
              <Icon name="money" />
              {fee}
            </a>
            <a style={{ float: "right" }}>
              <Icon name="time" />
              {intake}
            </a>
          </Card.Description>
          <hr></hr>
          <Button as="a" href={`/course/${id}`} fluid color="blue">
            More details
          </Button>
        </Card.Content>
        {/* <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              Approve
            </Button>
            <Button basic color="red">
              Decline
            </Button>
          </div>
        </Card.Content> */}
      </Card>
      {/* <Segment stacked>
        <Grid stackable>
          <Grid.Column width={13}>
            <h3>{name}</h3>
            <List selection verticalAlign="middle">
              <List.Item>
                <Icon color="yellow" size="large" name="building" />

                <List.Content>
                  <List.Header>
                    <Link to={`/institution/${Institution.id}`}>
                      {Institution.name}
                    </Link>
                  </List.Header>
                </List.Content>
              </List.Item>
            </List>
            <Grid columns="equal">
              <Grid.Column>
                <List selection verticalAlign="middle">
                  <List.Item>
                    <Icon
                      size="large"
                      color={primaryColor}
                      name="money bill alternate"
                    />
                    <List.Content>
                      <List.Header>{fee}</List.Header>
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                <List selection verticalAlign="middle">
                  <List.Item>
                    <Icon size="large" color={primaryColor} name="time" />
                    <List.Content>
                      <List.Header>{intake}</List.Header>
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column width={3}>
            <Image
              style={imageStyles(100, 100, "scale-down")}
              src={Institution.logo}
            />
            <br />
            <Button fluid style={{ marginBottom: -30 }} color="blue">
              More Details
            </Button>
            <br />
          </Grid.Column>
        </Grid>
      </Segment> */}
    </>
  );
}

export default CourseItem;
