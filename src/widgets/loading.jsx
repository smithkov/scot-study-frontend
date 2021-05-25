import React, { useState } from "react";
import { Segment, Image, Grid } from "semantic-ui-react";

function Loading() {
  return (
    <>
      <Grid padded>
        <Grid.Column width="16">
          {" "}
          <Segment loading>
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Loading;
