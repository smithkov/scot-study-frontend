import React, { useState } from "react";
import InstagramEmbed from "react-instagram-embed";
import {
  Segment,
  Image,
  Grid,
  Container,
  Header,
  List,
  Divider,
  Button,
} from "semantic-ui-react";

function Footer() {
  return (
    <>
      <Segment
        inverted
        vertical
        style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
      >
        <Container textAlign="left">
          <Grid divided inverted stackable>
            <Grid.Column width={7}>
              <p>
                OUR ALL-IN-ONE PLATFORM HELPS YOU MONITOR AND SECURE ADMISSION,
                GUIDES YOU THROUGH VISA PROCESSES AND SETTLES YOUR
                ACCOMMODATION.
              </p>
              <Button inverted color="blue">
                Apply to Prefered Institution
              </Button>
              <hr></hr>
              <h2>Sponsors</h2>
              <Grid columns="equal">
                <Grid.Column>
                  <Segment style={{ height: "100%" }}>
                    <Image src="/sponsors/swie.jpg" />
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment style={{ height: "100%" }}>
                    <Image src="/sponsors/scotia-world.jpg" />
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment style={{ height: "100%" }}>
                    <Image src="/sponsors/ed.jpg" />
                  </Segment>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column width={5}>
              <div style={{ height: "100%" }} class="col-sm-4 links2">
                <a
                  class="twitter-timeline"
                  data-height="100%"
                  href="https://twitter.com/ScotStudy?ref_src=twsrc%5Etfw"
                >
                  Tweets by ScotStudy
                </a>
                <script
                  async
                  src="https://platform.twitter.com/widgets.js"
                  charset="utf-8"
                ></script>
              </div>
            </Grid.Column>

            <Grid.Column width={2}>
              <Header inverted as="h4" content="Quick Link" />
              <List>
                <List.Item as="a">Home</List.Item>
                <List.Item as="a">Institutions</List.Item>
                <List.Item as="a">Courses</List.Item>
                <List.Item as="a">Compare</List.Item>
                <List.Item as="a">Institutions</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">About Us</List.Item>
                <List.Item as="a">Login</List.Item>
                <List.Item as="a">e-Pay</List.Item>
                <List.Item as="a">Forum</List.Item>
              </List>
            </Grid.Column>
          </Grid>
          <Divider inverted section />
          {/* <Image centered size="mini" src="/logo.png" /> */}

          <div style={{ textAlign: "center" }}>
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="#">
                Site Map
              </List.Item>
              <List.Item as="a" href="#">
                Contact Us
              </List.Item>
              <List.Item as="a" href="#">
                Terms and Conditions
              </List.Item>
              <List.Item as="a" href="#">
                Privacy Policy
              </List.Item>
            </List>
          </div>
        </Container>
      </Segment>
    </>
  );
}

export default Footer;
